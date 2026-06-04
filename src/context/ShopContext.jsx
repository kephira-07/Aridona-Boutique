import { createContext, useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'; // 1. On importe axios

// 1. On crée et on exporte le contexte
export const ShopContext = createContext();

// 2. On crée le Provider
const ShopContextProvider = (props) => {
  // L'adresse de ton API backend
  const backendUrl = "http://localhost:4000"; 

  const monnaie = 'FCFA';
  const delivery_free = 500;
  
  // S'initialise à vide, sera rempli par la base de données
  const [produits, setProduits] = useState([]); 
  
  const [recherche, setRecherche] = useState('');
  const [montreRecherche, setMontreRecherche] = useState(false);
  const [panierProduits, setPanierProduits] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // 2. FONCTION POUR CHARGER LES VRAIS PRODUITS DEPUIS LE BACKEND
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/produit/list`);
      if (response.data.success) {
        // IMPORTANT : Ton backend renvoie "produits" ou "produit". 
        // Si tu as un souci, vérifie la clé renvoyée par ton contrôleur listproduits.
        setProduits(response.data.produits || response.data.produit || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Erreur chargement produits client :", error);
      toast.error("Impossible de charger les créations depuis le serveur");
    }
  };

  // 3. ON LANCE LE CHARGEMENT DES PRODUITS AU DÉMARRAGE DU SITE
  useEffect(() => {
    getProductsData();
  }, []);

  // --- LOGIQUE DES SUGGESTIONS CENTRALISÉE ---
  const suggestions = useMemo(() => {
    if (!recherche.trim()) return [];
    return produits
      .filter(p => p.nom && p.nom.toLowerCase().includes(recherche.toLowerCase())) // Changement p.name -> p.nom car ta bdd utilise 'nom'
      .slice(0, 5); 
  }, [recherche, produits]);

  // Déclenche l'affichage du menu déroulant dès qu'il y a du texte
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
          console.error("Erreur lors du calcul du panier pour l'id:", items, error);
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
      // Recherche sur l'id généré par MongoDB (_id)
      let itemInfo = produits.find((produit) => produit._id === items);
      if (itemInfo) { // On s'assure que le produit existe bien dans notre liste bdd
        for (const item in panierProduits[items]) {
          try {
            if (panierProduits[items][item] > 0) {
              // Attention : p.prix (Bdd) au lieu de p.price (Fichier de test)
              const prixProduit = itemInfo.prix || itemInfo.price;
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