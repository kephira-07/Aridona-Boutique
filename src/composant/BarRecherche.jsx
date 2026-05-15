import React ,{useEffect, useState}from 'react'
import{ ShopContext } from '../context/ShopContext';
import { Search, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const BarRecherche = () => {
    const { recherche, setRecherche,montreRecherche,setMontreRecherche } = React.useContext(ShopContext);
     const position = useLocation();
   
  return montreRecherche?(
    <div className='flex items-center justify-center mt-25 mb-5 px-5 gap-3'>
  {/* Barre de recherche */}
  <div className='inline-flex items-center border-2 border-amber-700 border-dashed rounded-full w-80 overflow-hidden bg-white'>
    <input
      type="text"
      className='flex-1 px-4 py-2 outline-none bg-transparent text-sm text-gray-700 focus:ring-0'
      placeholder="Rechercher un produit..."
      value={recherche}
      onChange={(e) => setRecherche(e.target.value)}
    />
    
    {/* Conteneur de l'icône Loupe */}
    <div className='bg-amber-700 w-10 h-10 flex items-center justify-center flex-shrink-0'>
      <Search className='text-white w-5 h-5' />
    </div>
  </div>

  {/* Bouton de fermeture */}
  <X 
    onClick={() => setMontreRecherche(false)} 
    className='w-6 h-6 text-amber-700 cursor-pointer hover:scale-110 transition-transform' 
  />
</div>
  ):null
}

export default BarRecherche
