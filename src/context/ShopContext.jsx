import React from 'react'
const ShopContext = React.createContext();
import { produits } from '../assets/image';
const ShopContextProvider = (props) => {
  const monnaie='FCFA';
  const delivery_free=10;
  const value={
    produits,monnaie,delivery_free
  }
  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export { ShopContextProvider};