import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; 
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from "lucide-react"; 

const ProduitItem = ({ id, slug, image, nom, prix }) => {
    // 🛠️ On récupère favoris et toggleFavori depuis le contexte global
    const { monnaie, ajouterPanier, favoris, toggleFavori } = useContext(ShopContext);

    // 🛠️ On vérifie dynamiquement si CE produit est dans la liste globale des favoris
    const isFavorite = favoris ? favoris.includes(id) : false;

    const handleFavoriteClick = (e) => {
        e.preventDefault(); // Empêche d'ouvrir la page produit au clic sur le cœur
        if (toggleFavori) {
            toggleFavori(id); // Met à jour le contexte global
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        if (ajouterPanier) {
            ajouterPanier(id, "Standard"); 
            alert(`✨ ${nom} a été ajouté à votre panier !`);
        }
    };

    return (
        <Link 
            className='text-gray-700 cursor-pointer group flex flex-col h-full bg-white rounded-2xl p-2 border border-transparent hover:border-stone-100 hover:shadow-xl transition-all duration-500' 
            to={`/produit/${slug || id}`}
        >
            <div className='relative overflow-hidden rounded-xl aspect-square bg-stone-50 border border-stone-100/60'> 
                <img 
                    className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105' 
                    src={Array.isArray(image) ? image[0] : image} 
                    alt={nom} 
                />
                
                {/* Bouton Favoris connecté au contexte */}
                <button 
                    onClick={handleFavoriteClick} 
                    className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 shadow-sm border focus:outline-none backdrop-blur-md
                        ${isFavorite 
                            ? 'bg-red-50/90 border-red-200 text-red-500 scale-110' 
                            : 'bg-white/80 border-stone-100 text-stone-400 hover:text-red-500 hover:bg-white md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0'
                        }`}
                >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
                </button>

                <div className="absolute inset-x-0 bottom-0 p-4 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <button 
                        onClick={handleAddToCart} 
                        className="w-full py-3 bg-white/95 backdrop-blur-md text-stone-900 text-xs font-semibold rounded-xl hover:bg-amber-900 hover:text-white transition-all duration-300 uppercase tracking-widest shadow-md flex items-center justify-center gap-2"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Ajouter
                    </button>
                </div>
            </div>
            
            <div className="flex flex-col flex-1 pt-3 pb-1 px-1 justify-between">
                <div>
                    <p className='text-sm font-medium text-stone-800 font-serif tracking-tight line-clamp-1 group-hover:text-amber-700 transition-colors duration-300'>
                        {nom || "Création unique"}
                    </p>
                    <p className='text-xs text-stone-400 mt-0.5 font-light italic'>Arilona Luxury</p>
                </div>
                <p className='text-sm font-semibold text-amber-700 mt-2 font-mono'>
                    {prix?.toLocaleString()} {monnaie}
                </p>
            </div>
        </Link>
    );
};

export default ProduitItem;