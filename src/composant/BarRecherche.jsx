import React ,{useEffect, useState}from 'react'
import{ ShopContext } from '../context/ShopContext';
import { Search, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';


   
   export default function BarRecherche({ isNavbar }) {
 const { recherche, setRecherche,montreRecherche,setMontreRecherche } = React.useContext(ShopContext);
     const position = useLocation();


  if (!isNavbar && !montreRecherche) return null;

  return (
    <div className={`flex items-center justify-center ${isNavbar ? 'w-full mx-10' : 'w-full py-5 bg-white border-b'}`}>
      <div className={`inline-flex items-center border-2 border-amber-700 border-dashed rounded-full overflow-hidden bg-white ${isNavbar ? 'w-full max-w-md' : 'w-[70%]'}`}>
        <input
          type="text"
          className='flex-1 px-4 py-2 outline-none bg-transparent text-sm'
          placeholder="Rechercher..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <div className='bg-amber-700 w-10 h-10 flex items-center justify-center'>
          <Search className='text-white w-5 h-5' />
        </div>
      </div>
      
      {/* Le X n'apparaît que sur la version mobile (quand ce n'est pas dans la navbar) */}
      {!isNavbar && (
        <X onClick={() => setMontreRecherche(false)} className='ml-3 w-6 h-6 text-amber-700 cursor-pointer' />
      )}
    </div>
  );
}