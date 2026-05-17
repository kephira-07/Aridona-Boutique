import{ createContext, useState,useNavigate } from 'react';
import { produits } from '../assets/image';
  import { toast } from 'react-toastify';

// 1. On crée et on exporte le contexte
export const ShopContext = createContext();

// 2. On crée le Provider
const ShopContextProvider = (props) => {
  const monnaie = 'FCFA';
  const delivery_free = 500;
  const [recherche,setRecherche]=useState('');
  const [montreRecherche,setMontreRecherche]=useState(false)
  const [panierProduits,setPanierProduits]=useState({});
 


  const ajouterPanier = async(produitId,size)=>{

    if(!size){
      toast.error('Veuillez selectionner une taille')
      return;
    }
    let panierData = structuredClone(panierProduits);
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
    setPanierProduits(panierData)
    
  }
   const getPanierCount=()=>{
     let totalCount=0;
     for(const items in panierProduits){
      for(const item in panierProduits[items]){
        try {
          if (panierProduits[items][item]>0) {
            totalCount += panierProduits[items][item];
          }
          
        } catch (error) {
          
        }
      }
      
     }
     return totalCount;
   }
 const updateQuantity= async (produitId,size,quantity)=>{
  let panierData = structuredClone(panierProduits);
  panierData[produitId][size]=quantity;
  setPanierProduits(panierData);

 }

 const getPanierMontant =  () => {
  let totalMontant = 0;
  for (const items in panierProduits) {
    let itemInfo = produits.find((produit) => produit._id === items);
    for (const item in panierProduits[items]) {
      try {
        if (panierProduits[items][item] > 0) {
          totalMontant += itemInfo.price * panierProduits[items][item];
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return totalMontant;
};

  const value = {
    produits,monnaie,delivery_free,recherche,setRecherche,montreRecherche,setMontreRecherche,panierProduits,ajouterPanier,getPanierCount,updateQuantity,getPanierMontant
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;