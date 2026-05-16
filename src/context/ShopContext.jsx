import{ createContext, useEffect, useState } from 'react';
import { produits } from '../assets/image';
  import { ToastContainer, toast } from 'react-toastify';

// 1. On crée et on exporte le contexte
export const ShopContext = createContext();

// 2. On crée le Provider
const ShopContextProvider = (props) => {
  const monnaie = 'FCFA';
  const delivery_free = 10;
  const [recherche,setRecherche]=useState('');
  const [montreRecherche,setMontreRecherche]=useState(false)
  const [panierProduit,setPanierProduit]=useState({});


  const ajouterPanier = async(produitId,size)=>{

    if(!size){
      toast.error('Veuillez selectionner une taille')
      return;
    }
    let panierData = structuredClone(panierProduit);
    if(panierData[produitId]){
      if (panierData[produitId][size]) {
       panierData[produitId][size]+=1
        
      }else{
        panierData[produitId][size]=1
      }
    }else{
      panierData[produitId]={};
      panierData[produitId][size] =1
    }
    setPanierProduit(panierData)
    
  }
   const obtenirPanierCount=()=>{
     let totalCount=0;
     for(const produits in panierProduit){
      for(const produit in panierProduit[produits]){
        try {
          if (panierProduit[produits][produit]>0) {
            totalCount += panierProduit[produits][produit];
          }
          
        } catch (error) {
          
        }
      }
      
     }
     return totalCount;
   }


  const value = {
    produits,
    monnaie,
    delivery_free,recherche,setRecherche,montreRecherche,setMontreRecherche,panierProduit,ajouterPanier,obtenirPanierCount
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;