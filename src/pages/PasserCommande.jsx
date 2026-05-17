import React from 'react'
import { ShopContext } from '../context/ShopContext'
import Titre from '../composant/Titre'
import PanierTotal from '../composant/PanierTotal'
import { useContext, useState } from 'react';


const PasserCommande = () => {
  const { navigate, monnaie } = useContext(ShopContext);
    const [methode, setMethode] = useState('cod'); // 'cod' pour Cash on Delivery

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 lg:px-50 sm:pt-14 min-h-[60vh] border-t mt-20 mx-10'>
            
            {/* ---------- PARTIE GAUCHE : INFOS DE LIVRAISON ---------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Titre text1={'Informations'} text2={'DE Livaison'} />
                </div>
                <div className='flex gap-3'>
                    <input className='border border-amber-500 py-1.5 px-3.5 w-full' type="text" placeholder='Prénom' />
                    <input className='border border-amber-500 py-1.5 px-3.5 w-full' type="text" placeholder='Nom' />
                </div>
                <input className='border border-amber-500 py-1.5 px-3.5 w-full' type="email" placeholder='Adresse email' />
                <input className='border border-amber-500 py-1.5 px-3.5 w-full' type="text" placeholder='Rue / Quartier' />
                <div className='flex gap-3'>
                    <input className='border border-amber-500 py-1.5 px-3.5 w-full' type="text" placeholder='Ville' />
                    <input className='border border-amber-500 py-1.5 px-3.5 w-full' type="text" placeholder='Pays' />
                </div>
                <input className='border border-amber-500 py-1.5 px-3.5 w-full' type="number" placeholder='Téléphone' />
            </div>

            {/* ---------- PARTIE DROITE : TOTAL & PAIEMENT ---------- */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <PanierTotal />
                </div>

                <div className='mt-12'>
                    <Titre text1={'Mode'} text2={'de Paiement'} />
                    
                    {/* SELECTION DU MODE DE PAIEMENT */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        {/* Option Mobile Money (exemple) */}
                        <div onClick={() => setMethode('momo')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${methode === 'momo' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4 uppercase'>Mobile Money</p>
                        </div>

                        {/* Option Cash on Delivery */}
                        <div onClick={() => setMethode('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${methode === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4 uppercase'>Paiement à la livraison</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button 
                            onClick={() => navigate('/mes-commandes')} 
                            className='bg-black text-white px-16 py-3 text-sm active:bg-gray-700 transition-all uppercase'
                        >
                            Finaliser la commande
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasserCommande