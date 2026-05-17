import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Titre from '../composant/Titre';
import { Trash, ShoppingBag } from 'lucide-react'; // Import ShoppingBag pour le design vide
import { useNavigate } from 'react-router-dom';
import PanierTotal from '../composant/PanierTotal';


const Panier = () => {
  const { produits, monnaie, panierProduits, updateQuantity } = useContext(ShopContext);
  const [panierData, setPanierData] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const tempData = [];
    for (const items in panierProduits) {
      for (const item in panierProduits[items]) {
        if (panierProduits[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: panierProduits[items][item]
          });
        }
      }
    }
    setPanierData(tempData);
  }, [panierProduits]);

  return (
    <div className='border-t pt-14 mt-20'> 
      
      <div className='text-2xl mb-6'>
        <Titre text1={'Votre'} text2={'Panier'} />
      </div>

      <div>
        {/* Vérification si le panier est vide */}
        {panierData.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-gray-500'>
            <ShoppingBag size={80} strokeWidth={1} className='mb-4 text-gray-300' />
            <p className='text-xl font-light'>Votre panier est actuellement vide.</p>
            <p className='text-sm mt-2'>Ajoutez des articles pour commencer vos achats.</p>
          </div>
        ) : (
          panierData.map((item, index) => {
            const produitsData = produits.find((produit) => produit._id === item._id);

            // Sécurité : si le produit n'est pas trouvé dans la base
            if (!produitsData) return null;

            return (
              <div 
                key={index} 
                className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4'
              >
                <div className='flex items-start gap-6'>
                  <img 
                    src={produitsData.img[0]} 
                    className='w-16 sm:w-20' 
                    alt={produitsData.name} 
                  />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{produitsData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p className='font-semibold'>{produitsData.price} {monnaie}</p>
                      <p className='px-2 sm:px-3 bg-slate-100 border text-xs sm:text-sm'>{item.size}</p>
                    </div>
                  </div>
                </div>

                {/* Input quantité avec correction de l'event */}
                <input 
                  type="number" 
                  onChange={(e) => 
                    e.target.value === '' || e.target.value === '0' 
                    ? null 
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                  } 
                  min={1} 
                  className='border max-w-12 px-1 py-1 text-center' 
                  defaultValue={item.quantity} 
                />

                <Trash 
                  onClick={() => updateQuantity(item._id, item.size, 0)} 
                  className='w-5 text-red-400 hover:text-red-600 transition-colors cursor-pointer'
                />
              </div>
            );
          })
        )}
      </div>

       <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <PanierTotal />
          <div className='w-full text-end'>
             <button 
               onClick={() => navigate('/passer-commande')} 
               className='bg-black text-white text-sm my-8 px-8 py-3 active:bg-gray-700 transition-all uppercase'
             >
               Passer à la caisse
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;