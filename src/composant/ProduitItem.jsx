import React from 'react';
import { ShopContext } from '../context/ShopContext'; 
import { Link } from 'react-router-dom';
import { Heart } from "lucide-react"; 

// 1. On remplace "name" par "nom" pour s'aligner sur ta base de données MongoDB
const ProduitItem = ({ id, image, nom, prix }) => {
    const { monnaie } = React.useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer group' to={`/produit/${id}`}>
            
            <div className='relative overflow-hidden rounded-xl aspect-square bg-slate-50'> 
                
                {/* 2. SECURITÉ IMAGE : Comme image est maintenant un tableau venant du backend, 
                   on prend la première image image[0], ou une image par défaut si c'est vide */}
                <img 
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
                    src={Array.isArray(image) ? image[0] : image} 
                    alt={nom} 
                />
                
                {/* Bouton Favoris */}
                <button 
                    onClick={(e) => {
                        e.preventDefault(); // Empêche d'ouvrir la page produit au clic
                        // Ajoute ta logique favoris ici plus tard si besoin
                    }} 
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                >
                    <Heart className="w-4 h-4" />
                </button>

                {/* Bouton d'Ajout rapide au Panier */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button 
                        onClick={(e) => {
                            e.preventDefault(); // Empêche d'ouvrir la page produit
                            // Idéalement, ici tu appelleras ta fonction ajouterPanier(id, "Unique")
                        }} 
                        className="w-full py-2 bg-black/85 text-white text-xs font-medium rounded-lg backdrop-blur-sm hover:bg-black transition-colors uppercase tracking-wider"
                    >
                        Ajouter au panier
                    </button>
                </div>
            </div>
            
            {/* 3. CORRECTION ICI : On affiche le NOM du bijou et pas l'adresse de l'image */}
            <p className='pt-3 pb-1 text-sm font-medium text-slate-800 group-hover:text-amber-800 transition-colors'>
                {nom || "Création unique"}
            </p>
            
            <p className='text-sm font-semibold text-amber-700'>{prix} {monnaie}</p>
        </Link>
    );
};

export default ProduitItem;