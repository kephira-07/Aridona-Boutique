import React from 'react'
import{ ShopContext } from '../context/ShopContext';
import { Search, X } from 'lucide-react';

const BarRecherche = () => {
    const { recherche, setRecherche,montreRecherche,setMontreRecherche } = React.useContext(ShopContext);
  return montreRecherche?(
    <div className=' flex mt-25 mb-5 px-5'>
      <div className='inline-flex items-center justify-center border-2   border-amber-700 border-dashed rounded-full  w-80 overflow-hidden'>
        <input
        type="text"
        className='flex-1 px-2 outline-none bg-inherit'
        placeholder="Rechercher un produit..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        
      />
     <div className='bg-amber-700 w-10 h-10 flex items-center justify-center'>
       <Search className='text-white w-4  ' />
     </div>
      </div>
      <X onClick={() => setMontreRecherche(false)} className='  w-5 h-5 text-amber-700 cursor-pointer' />
    </div>
  ):null
}

export default BarRecherche
