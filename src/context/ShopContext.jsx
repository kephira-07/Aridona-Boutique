import{ createContext, useState } from 'react';
import { produits } from '../assets/image';

// 1. On crée et on exporte le contexte
export const ShopContext = createContext();

// 2. On crée le Provider
const ShopContextProvider = (props) => {
  const monnaie = 'FCFA';
  const delivery_free = 10;
  const [recherche,setRecherche]=useState('');
  const [montreRecherche,setMontreRecherche]=useState(false)

  const value = {
    produits,
    monnaie,
    delivery_free,recherche,setRecherche,montreRecherche,setMontreRecherche
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;