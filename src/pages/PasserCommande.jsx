import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Titre from '../composant/Titre';
import PanierTotal from '../composant/PanierTotal';
import axios from 'axios';

const PasserCommande = () => {
    const { navigate, backendUrl, token, cartItems, produits, getCartAmount, viderPanier } = useContext(ShopContext);
    const [methode, setMethode] = useState('cod'); // 'cod' ou 'momo'
    const [loading, setLoading] = useState(false);

    // 1. Regroupement de toutes les infos de livraison dans un seul state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        zipcode: '0000', // Valeur par défaut si non nécessaire localement
        phone: ''
    });

    // Mise à jour dynamique du formulaire à chaque frappe du client
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 2. Gestion de la soumission de la commande
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        if (!token) {
            alert("Veuillez vous connecter pour passer une commande.");
            return navigate('/login');
        }

        try {
            setLoading(true);
            let orderItems = [];

            // On boucle sur le panier pour structurer les données et inclure l'image
            for (const itemsId in cartItems) {
                for (const size in cartItems[itemsId]) {
                    if (cartItems[itemsId][size] > 0) {
                        // On cherche le bijou complet dans notre liste globale pour extraire son nom, prix et images Cloudinary
                        const itemInfo = produits.find(product => product._id === itemsId);
                        if (itemInfo) {
                            orderItems.push({
                                _id: itemInfo._id,
                                nom: itemInfo.nom,
                                prix: itemInfo.prix,
                                size: size,
                                quantity: cartItems[itemsId][size],
                                image: itemInfo.image // 📷 L'image Cloudinary accompagne la commande !
                            });
                        }
                    }
                }
            }

            // Calcul du montant total final
            const totalAmount = getCartAmount();

            if (orderItems.length === 0) {
                alert("Votre panier est vide.");
                return;
            }

            // Préparation du payload pour l'API
            const orderData = {
                address: formData,
                items: orderItems,
                amount: totalAmount,
                paymentMethod: methode === 'cod' ? 'Paiement à la livraison' : 'Mobile Money'
            };

            // Envoi synchrone vers le backend sécurisé par le token utilisateur
            const response = await axios.post(
                `${backendUrl}/api/order/place`, 
                orderData, 
                { headers: { token } }
            );

            if (response.data.success) {
                alert(response.data.message || "Commande validée avec succès ! ✨");
                viderPanier(); // Pense à coder cette fonction dans ton ShopContext pour vider le state et localStorage
                navigate('/mes-commandes'); // Redirection vers son historique d'achats client
            } else {
                alert(response.data.message);
            }

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Une erreur est survenue lors de la commande");
        } finally {
            setLoading(false);
        }
    };

    return (
        // Remplacement de la simple div par une balise <form> pour gérer nativement la validation HTML5
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-6 pt-5 lg:px-24 sm:pt-14 min-h-[60vh] border-t mt-20 mx-6 md:mx-10'>
            
            {/* ---------- PARTIE GAUCHE : INFOS DE LIVRAISON ---------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Titre text1={'Informations'} text2={'DE Livraison'} />
                </div>
                <div className='flex gap-3'>
                    <input required name='firstName' onChange={onChangeHandler} value={formData.firstName} className='border border-gray-300 rounded-lg py-2 px-3.5 w-full outline-none focus:border-black transition-all' type="text" placeholder='Prénom' />
                    <input required name='lastName' onChange={onChangeHandler} value={formData.lastName} className='border border-gray-300 rounded-lg py-2 px-3.5 w-full outline-none focus:border-black transition-all' type="text" placeholder='Nom' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={formData.email} className='border border-gray-300 rounded-lg py-2 px-3.5 w-full outline-none focus:border-black transition-all' type="email" placeholder='Adresse email' />
                <input required name='street' onChange={onChangeHandler} value={formData.street} className='border border-gray-300 rounded-lg py-2 px-3.5 w-full outline-none focus:border-black transition-all' type="text" placeholder='Rue / Quartier / Ville' />
                
                {/* On garde les champs masqués ou optionnels si tu regroupes tout dans "street" pour le marché local */}
                <div className='flex gap-3'>
                    <input required name='city' onChange={onChangeHandler} value={formData.city} className='border border-gray-300 rounded-lg py-2 px-3.5 w-full outline-none focus:border-black transition-all' type="text" placeholder='Ville (ex: Lomé)' />
                    <input required name='zipcode' onChange={onChangeHandler} value={formData.zipcode} className='border border-gray-300 rounded-lg py-2 px-3.5 w-full outline-none focus:border-black transition-all' type="text" placeholder='Code Postal / Zone' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={formData.phone} className='border border-gray-300 rounded-lg py-2 px-3.5 w-full outline-none focus:border-black transition-all' type="text" placeholder='Téléphone (ex: 90000000)' />
            </div>

            {/* ---------- PARTIE DROITE : TOTAL & PAIEMENT ---------- */}
            <div className='mt-8 w-full sm:max-w-[450px]'>
                <div className='min-w-full md:min-w-80'>
                    <PanierTotal />
                </div>

                <div className='mt-12'>
                    <div className='mb-4'>
                        <Titre text1={'Mode'} text2={'de Paiement'} />
                    </div>
                    
                    {/* SELECTION DU MODE DE PAIEMENT */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        {/* Option Mobile Money */}
                        <div onClick={() => setMethode('momo')} className='flex items-center gap-3 border border-gray-200 p-3 px-4 rounded-xl cursor-pointer w-full hover:bg-slate-50 transition-colors'>
                            <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full flex items-center justify-center ${methode === 'momo' ? 'border-black' : ''}`}>
                                {methode === 'momo' && <span className='w-2 h-2 bg-black rounded-full'></span>}
                            </p>
                            <p className='text-gray-700 text-xs font-semibold uppercase tracking-wider'>Mobile Money</p>
                        </div>

                        {/* Option Cash on Delivery */}
                        <div onClick={() => setMethode('cod')} className='flex items-center gap-3 border border-gray-200 p-3 px-4 rounded-xl cursor-pointer w-full hover:bg-slate-50 transition-colors'>
                            <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full flex items-center justify-center ${methode === 'cod' ? 'border-black' : ''}`}>
                                {methode === 'cod' && <span className='w-2 h-2 bg-black rounded-full'></span>}
                            </p>
                            <p className='text-gray-700 text-xs font-semibold uppercase tracking-wider'>Livraison</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button 
                            type="submit"
                            disabled={loading}
                            className='w-full sm:w-auto bg-slate-950 text-white font-medium px-12 py-3.5 text-sm rounded-xl active:bg-gray-800 transition-all uppercase tracking-wider disabled:bg-slate-400'
                        >
                            {loading ? 'Traitement...' : 'Finaliser la commande'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PasserCommande;