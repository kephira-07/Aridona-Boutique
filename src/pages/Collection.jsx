import React, { useState, useEffect } from "react";
import { ShopContext } from '../context/ShopContext';
import { ChevronRight } from "lucide-react";
import Titre from '../composant/Titre';
import ProduitItem from "../composant/ProduitItem";

const Collection = () => {
    const { produits,recherche,montreRecherche } = React.useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filtreProduits, setFiltreProduits] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [matiere, setMatiere] = useState([]);
    const [sortType,setSortType]= useState('reveler')

    const toggleCategorie = (e) => {
     
        const value = e.target.value;
        if (categorie.includes(value)) {
            setCategorie(prev => prev.filter(item => item !== value));
        } else {
            setCategorie(prev => [...prev, value]);
        }
    };

    const toggleMatiere = (e) => {
        
        if (matiere.includes(e.target.value)) {
            setMatiere(prev => prev.filter(item => item !== e.target.value));
        } else {
            setMatiere(prev => [...prev, e.target.value]);
        }
    };
  
     
    const appliquerFiltre=() =>{
        let copieproduit= produits.slice();
        if (categorie.length > 0) {
            copieproduit = copieproduit.filter(item => categorie.includes(item.category));
            
        }
        if (montreRecherche && recherche) {
            copieproduit=copieproduit.filter(item=> item.name.toLowerCase().includes(recherche.toLowerCase())) 
        }
        if (matiere.length > 0) {
            copieproduit=copieproduit.filter(item=> matiere.includes(item.material))
            
        }
        setFiltreProduits(copieproduit)

    }
    const sortProduit=()=>{
        let fpCopy=filtreProduits.slice()
        switch(sortType){
            case 'price-asc':
                setFiltreProduits(fpCopy.sort((a,b)=>(a.price-b.price)));
                break;
            case 'price-desc':
                setFiltreProduits(fpCopy.sort((a,b)=>(b.price-a.price)));
                break;  
            default:
                appliquerFiltre();
                break;      
        }

    }
   
    
    useEffect(() => {
        // Ici tu peux filtrer selon categorie/matiere
        let filtered = produits.filter(p => {
            return (
                (categorie.length === 0 || categorie.includes(p.category)) &&
                (matiere.length === 0 || matiere.includes(p.material))
            );
        });
        setFiltreProduits(filtered);
    }, [categorie, matiere, produits]);

    useEffect(()=>{
        appliquerFiltre();

    },[categorie,matiere,recherche,montreRecherche])

    useEffect(()=>{
      sortProduit()  

    },[sortType])
    return (
  <div>
  {/* En tete */}

  <div className="bg-[#ffffffd3] mt-20 md:mt-35 py-6 px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-stretch-50% text-[#d14f09] mb-2 uppercase tracking-widest">
      Éclat & Élégance
    </h2>
    <p className="text-gray-600 italic text-sm md:text-base max-w-2xl mx-auto">
      L'art de sublimer votre quotidien avec des pièces d'exception.
    </p>
  </div>

  {/* Conteneur principal : flex-col par défaut (mobile), row sur tablette/desktop (sm) */}
  <div className='flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 md:px-5 border-t border-gray-100'>
    
    {/* Colonne gauche (Filtres) */}
    <div className='min-w-full sm:min-w-60 px-4 sm:px-0'>
      <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-lg md:text-xl flex items-center justify-between sm:justify-start cursor-pointer gap-2 uppercase font-medium text-gray-800'>
        Filtres
        <ChevronRight className={`h-4 w-4 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`} />
      </p>

      {/* Catégories */}
      <div className={`border border-gray-200 rounded-sm pl-5 py-3 mt-4 ${showFilter ? 'block' : 'hidden'} sm:block transition-all`}>
        <p className="mb-3 text-xs font-bold text-[#d14f09]">CATÉGORIES</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Bagues" onChange={toggleCategorie}/> Bagues</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Collier" onChange={toggleCategorie}/> Colliers</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Boucleoreille" onChange={toggleCategorie}/> Boucles d'oreilles</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Bracelet" onChange={toggleCategorie}/> Bracelets</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Chainelunettes" onChange={toggleCategorie}/> Chaines de lunettes</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Ensemble" onChange={toggleCategorie}/> Ensemble</label>
        </div>
      </div>

      {/* Matière */}
      <div className={`border border-gray-200 rounded-sm pl-5 py-3 mt-4 ${showFilter ? 'block' : 'hidden'} sm:block transition-all`}>
        <p className="mb-3 text-xs font-bold text-[#d14f09]">MATIÈRE</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Argenter" onChange={toggleMatiere}/> Argenté</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Dore" onChange={toggleMatiere}/> Doré</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#d14f09]" value="Perle" onChange={toggleMatiere}/> Perle</label>
        </div>
      </div>
    </div>

    {/* Colonne droite (Produits) */}
    <div className='flex-1 px-4 sm:px-0'>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <Titre text1={'Toute'} text2={'la collection'} />
        
        {/* Select plus large sur mobile pour faciliter le clic */}
        <select onChange={(e)=>setSortType(e.target.value)} className="w-full md:w-auto border border-gray-300 rounded-sm px-3 py-2 text-sm bg-white focus:ring-1 focus:ring-[#d14f09] outline-none">
          <option value="">Trier par : Pertinence</option>
          <option value="price-asc">Prix : Croissant</option>
          <option value="price-desc">Prix : Décroissant</option>
        </select>
      </div>

      {/* Grille : 2 colonnes sur mobile, 3 sur tablette, 4/5 sur desktop */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 gap-y-8'>
        {filtreProduits.map((item, index) => (
          <ProduitItem key={index} name={item.name} price={item.price} img={item.img} />
        ))}
      </div>
    </div>
  </div>
</div>
    );
};

export default Collection;
