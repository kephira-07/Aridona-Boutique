import React from 'react'
import { ShopContext } from '../context/ShopContext';
import { useState , useEffect} from 'react';
import Titre from './Titre';
import ProduitItem from './ProduitItem';

const MeilleurVente = () => {
    const { produits } = React.useContext(ShopContext);
    const [meilleurVente, setMeilleurVente] = useState([]);

     useEffect(() => {
            const meilleurProduit = produits.filter(produit => produit.meilleurVente); 
            setMeilleurVente(meilleurProduit.slice(0,5));
        }, []);

  return (
    <div>
        <div className='text-center text-3xl py-8'><Titre text1='Découvrez notre' text2='meilleure vente' />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit...
        </p>
        </div>
        
      <div className='px-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-6'>
        {
          meilleurVente.map((item, index) => (
            <ProduitItem 
              key={index} 
              id={item.id} 
              image={item.image[0]} 
              name={item.name} 
              price={item.price} 
            />
          ))
        }
      </div>

    </div>
  )
}

export default MeilleurVente