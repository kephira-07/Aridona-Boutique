import React, { useContext, useEffect, useState } from 'react';
import Titre from './Titre';
import { ShopContext } from '../context/ShopContext';
import ProduitItem from './ProduitItem';

const ApparenteProduit = ({ categorie, matiere }) => {
  const { produits } = useContext(ShopContext);
  const [apparente, setApparente] = useState([]);

  useEffect(() => {
    if (produits.length > 0) {
      let copieProduit = produits
        .filter((item) => item.categorie === categorie)
        .filter((item) => item.matiere === matiere);

      setApparente(copieProduit.slice(0, 5));
    }
  }, [produits, categorie, matiere]);

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Titre text1={'Produits'} text2={'Similaire'} />
      </div>
      <div className='px-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 gap-y-6'>
        {apparente.map((item, index) => (
          <ProduitItem
            key={index}
            id={item._id}
            img={item.img[0]} 
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ApparenteProduit;
