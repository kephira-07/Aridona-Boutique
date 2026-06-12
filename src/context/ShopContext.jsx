import { createContext, useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'; 
// 1. On réimporte tes produits de test (Mock Data) pour le secours
import { produits as produitsMock } from '../assets/image';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendUrl = "http://localhost:4000"; 

  const monnaie = 'FCFA';
  const delivery_free = 500;
  
  // 2. PAR DÉFAUT : On initialise le state avec tes données de test (produitsMock)
  // Comme ça, le site n'est JAMAIS vide au démarrage !
  const [produits, setProduits] = useState(produitsMock); 
  
  const [recherche, setRecherche] = useState('');
  const [montreRecherche, setMontreRecherche] = useState(false);
  const [panierProduits, setPanierProduits] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // 3. LA REQUÊTE TENTE DE CHANGER LES MOCKS PAR LES VRAIES DONNÉES
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/produit/list`);
      if (response.data.success) {
        const donneesServeur = response.data.produits || response.data.produit;
        
        // Si le serveur renvoie bien des produits, on remplace les mocks
        if (donneesServeur && donneesServeur.length > 0) {
          setProduits(donneesServeur);
        }
      }
    } catch (error) {
      // Le serveur ne répond pas ? Pas de panique ! 
      // On ne crash pas le site, on laisse discrètement les produitsMock actifs
      console.warn("Mode Secours : Le serveur ne répond pas. Affichage des données mockées.");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);


// --- LOGIQUE DES SUGGESTIONS  ---
const suggestions = useMemo(() => {
  if (!recherche.trim()) return [];
  
  return produits
    .filter(p => {
      // Syntaxe unique : uniquement "nom"
      const nomProduit = p.nom || "";
      return nomProduit.toLowerCase().includes(recherche.toLowerCase());
    })
    .slice(0, 5); // Limite à 5 suggestions pour le design
}, [recherche, produits]);

  useEffect(() => {
    if (recherche.trim().length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [recherche]);

  const ajouterPanier = async (produitId, sizes) => {
    if (!sizes) {
      toast.error('Veuillez sélectionner une taille');
      return;
    }
    let panierData = structuredClone(panierProduits);
    if (panierData[produitId]) {
      if (panierData[produitId][sizes]) {
        panierData[produitId][sizes] += 1;
      } else {
        panierData[produitId][sizes] = 1;
      }
    } else {
      panierData[produitId] = {};
      panierData[produitId][sizes] = 1;
    }
    setPanierProduits(panierData);
    
    toast.success('Article ajouté au panier !', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
  };

  const getPanierCount = () => {
    let totalCount = 0;
    for (const items in panierProduits) {
      for (const item in panierProduits[items]) {
        try {
          if (panierProduits[items][item] > 0) {
            totalCount += panierProduits[items][item];
          }
        } catch (error) {
          console.error("Erreur panier ID :", items, error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (produitId, sizes, quantity) => {
    let panierData = structuredClone(panierProduits);
    panierData[produitId][sizes] = quantity;
    setPanierProduits(panierData);
  };

  const getPanierMontant = () => {
    let totalMontant = 0;
    for (const items in panierProduits) {
      let itemInfo = produits.find((produit) => (produit._id === items || produit.id === items));
      if (itemInfo) { 
        for (const item in panierProduits[items]) {
          try {
            if (panierProduits[items][item] > 0) {
              // S'adapte au mock (price) ou à la bdd (prix)
              const prixProduit = itemInfo.prix || itemInfo.price || 0;
              totalMontant += prixProduit * panierProduits[items][item];
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    return totalMontant;
  };

  const value = {
    produits, monnaie, delivery_free, recherche, setRecherche, montreRecherche, 
    setMontreRecherche, panierProduits, ajouterPanier, getPanierCount, 
    updateQuantity, getPanierMontant, showSuggestions, setShowSuggestions,
    suggestions, backendUrl, token, setToken
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;