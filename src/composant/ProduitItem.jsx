import React from 'react';
import { ShopContext } from '../context/ShopContext'; 
import { Link } from 'react-router-dom';
import { Heart } from "lucide-react"; // N'oublie pas d'installer lucide-react

const ProduitItem = ({ id, img, name, price }) => {
    const { monnaie } = React.useContext(ShopContext);

    return (
        
        <Link className='text-gray-700 cursor-pointer group' to={`/produit/${id}`}>
            
           
            <div className='relative overflow-hidden rounded-xl aspect-square'> 
                
               
                <img 
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
                    src={img} 
                    alt={name} 
                />

               
                <button 
                    onClick={(e) => e.preventDefault()} // Empêche d'ouvrir la page produit au clic
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                >
                    <Heart className="w-4 h-4" />
                </button>

               
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button 
                        onClick={(e) => e.preventDefault()} // Empêche d'ouvrir la page produit
                        className="w-full py-2 bg-black/80 text-white text-xs font-medium rounded-lg backdrop-blur-sm hover:bg-black transition-colors"
                    >
                        Ajouter au panier
                    </button>
                </div>
            </div>
            
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{price} {monnaie}</p>
        </Link>
    );
};

export default ProduitItem;