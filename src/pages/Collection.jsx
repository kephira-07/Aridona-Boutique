import React, { useState, useEffect } from "react";
import { ShopContext } from '../context/ShopContext';
import { ChevronRight } from "lucide-react";
import Titre from '../composant/Titre';
import ProduitItem from "../composant/ProduitItem";

const Collection = () => {
    // Récupération sécurisée du contexte
    const { produits, recherche } = React.useContext(ShopContext);
    
    const [showFilter, setShowFilter] = useState(false);
    const [filtreProduits, setFiltreProduits] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [matiere, setMatiere] = useState([]);
    const [sortType, setSortType] = useState('reveler'); // 'reveler' ou '' par défaut

    const toggleCategorie = (e) => {
        const value = e.target.value;
        if (categorie.includes(value)) {
            setCategorie(prev => prev.filter(item => item !== value));
        } else {
            setCategorie(prev => [...prev, value]);
        }
    };

    const toggleMatiere = (e) => {
        const value = e.target.value;
        if (matiere.includes(value)) {
            setMatiere(prev => prev.filter(item => item !== value));
        } else {
            setMatiere(prev => [...prev, value]);
        }
    };

    // --- TOUTE LA LOGIQUE COMBINÉE (FILTRE + TRI) ---
    useEffect(() => {
        if (!produits) return;

        let copieproduit = produits.slice();

        // 1. Filtrage par texte recherché
        if (recherche.trim()) {
            copieproduit = copieproduit.filter(item => 
                item.name.toLowerCase().includes(recherche.toLowerCase())
            );
        }

        // 2. Filtrage par Catégorie
        if (categorie.length > 0) {
            copieproduit = copieproduit.filter(item => categorie.includes(item.category));
        }

        // 3. Filtrage par Matière
        if (matiere.length > 0) {
            copieproduit = copieproduit.filter(item => matiere.includes(item.material));
        }

        // 4. Application du Tri directement sur les résultats filtrés
        switch (sortType) {
            case 'prix-asc':
                copieproduit.sort((a, b) => a.prix - b.prix);
                break;
            case 'prix-desc':
                copieproduit.sort((a, b) => b.prix - a.prix);
                break;
            default:
                // 'reveler' ou Pertinence -> Aucun tri, conserve l'ordre initial du fichier image.js
                break;
        }

        // On met à jour l'affichage une seule fois !
        setFiltreProduits(copieproduit);

    }, [categorie, matiere, recherche, sortType, produits]); // S'exécute dès qu'un élément change

    return (
        <div>
            {/* En tête */}
            <div className="bg-[#ffffffd3] mt-20 md:mt-35 py-6 px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-stretch-50% text-[#d14f09] mb-2 uppercase tracking-widest">
                    Éclat & Élégance
                </h2>
                <p className="text-gray-600 italic text-sm md:text-base max-w-2xl mx-auto">
                    L'art de sublimer votre quotidien avec des pièces d'exception.
                </p>
            </div>

            {/* Conteneur principal */}
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 md:px-5 border-t border-gray-100'>
                
                {/* Colonne gauche (Filtres) */}
                <div className='min-w-full sm:min-w-60 px-4 sm:px-0'>
                    <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-lg md:text-xl flex items-center justify-between sm:justify-start cursor-pointer gap-2 uppercase font-medium text-gray-800'>
                        Filtres
                        <ChevronRight className={`h-4 w-4 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`} />
                    </p>

                    {/* Catégories */}
                    <div className={`border border-gray-200 rounded-sm pl-5 py-3 mt-4 ${showFilter ? 'block' : 'hidden'} sm:block transition-all`}>
                        <p className="mb-3 text-xs font-bold text-[#d14f09]">CATÉGORIES</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Bagues" onChange={toggleCategorie}/> Bagues</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Collier" onChange={toggleCategorie}/> Colliers</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Boucleoreille" onChange={toggleCategorie}/> Boucles d'oreilles</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Bracelet" onChange={toggleCategorie}/> Bracelets</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Chainelunettes" onChange={toggleCategorie}/> Chaines de lunettes</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Ensemble" onChange={toggleCategorie}/> Ensemble</label>
                        </div>
                    </div>

                    {/* Matière */}
                    <div className={`border border-gray-200 rounded-sm pl-5 py-3 mt-4 ${showFilter ? 'block' : 'hidden'} sm:block transition-all`}>
                        <p className="mb-3 text-xs font-bold text-[#d14f09]">MATIÈRE</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Argenter" onChange={toggleMatiere}/> Argenté</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Dore" onChange={toggleMatiere}/> Doré</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Perle" onChange={toggleMatiere}/> Perle</label>
                        </div>
                    </div>
                </div>

                {/* Colonne droite (Produits) */}
                <div className='flex-1 px-4 sm:px-0'>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <Titre text1={'Toute'} text2={'la collection'} />
                        
                        {/* Select de Tri */}
                        <select onChange={(e) => setSortType(e.target.value)} className="w-full md:w-auto border border-gray-300 rounded-sm px-3 py-2 text-sm bg-white focus:ring-1 focus:ring-[#d14f09] outline-none">
                            <option value="reveler">Trier par : Pertinence</option>
                            <option value="prix-asc">Prix : Croissant</option>
                            <option value="prix-desc">Prix : Décroissant</option>
                        </select>
                    </div>

                    {/* Grille des produits */}
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 gap-y-8'>
                        {filtreProduits.map((item, index) => (
                            <ProduitItem 
                                key={index} 
                                nom={item.nom} 
                                prix={item.prix} 
                                id={item._id} 
                                image={item.image && item.image[0] ? item.image[0] : 'https://placehold.co/600x600?text=Bijou'} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collection;