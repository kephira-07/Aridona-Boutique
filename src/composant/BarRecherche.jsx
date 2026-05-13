import React from 'react'
import{ ShopContext } from '../context/ShopContext';
import { X, Search } from 'lucide-react';

const BarRecherche = () => {
    const { recherche, setRecherche,montreRecherche,setMontreRecherche } = React.useContext(ShopContext);
  return montreRecherche?(
    <div className='border-b border-t bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 rounded-full w-2/3 sm:w-1/2 '>
        <input
        type="text"
        className='flex-1 outline-none bg-inherit'
        placeholder="Rechercher un produit..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        
      />
      <Search className='text-gray-500 w-4' />
      </div>
      <X onClick={() => setMontreRecherche(false)} className='absolute top-4 right-4 w-5 h-5 text-gray-500 cursor-pointer' />
    </div>
  ):null
}

export default BarRecherche
