import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart,ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';


import logo2 from '../assets/logo2.svg';

// --- COMPOSANT HEADER (BARRE DE NAVIGATION) ---

export default function Navbar() {
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [Visible, setVisible] = useState(false);
  

  // Gestion du scroll ultra-légère
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (Visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [Visible]);

  return (
    <div className=''>
         {/* --- BANDEAU ANNONCE (Optionnel) --- */}
        <div className="fixed top-0 z-50  bg-amber-950 text-white text-xs text-center py-2 h-8 w-full font-light tracking-widest ">
          LIVRAISON OFFERTE À PARTIR DE 150fcf D'ACHAT
        </div>
      
      <header
        className={`fixed top-8 w-full z-50 transition-all px-5 duration-300 ${
          isScrolled ? '  bg-white/95 h-25  backdrop-blur-md shadow-sm' : 'bg-white h-30 '
        }`}
      >
    
      

       
        <div className="max-w-15xl mx-auto px-5 m-1 sm:px-2 lg:px-3">
          
          {/* VERSION PC (Cachée sur Mobile) */}
          <div className="hidden md:flex items-center justify-between h-24 transition-all duration-300 ">
            {/* Logo Arilona (Texte stylisé pour l'exemple, à remplacer par ton img) */}
            <div className={`font-serif tracking-widest text-amber-600 transition-all mt-5 duration-500 ${isScrolled ? 'scale-90' : 'scale-130'}`}>
             <div className="flex items-center justify-self-start cursor-pointer h-50 w-50">
                       <img 
                         src={logo2} 
                         alt="Logo" 
                         className={`transition-all duration-1000 ease-in-out object-contain overflow-hidden `}
                       />
                     </div>
            </div>

            {/* Barre de recherche  */}
            <div className={`flex-1 max-w-2xl mx-12 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Rechercher un bijou, une collection..."
                  className="w-full h-11 bg-gray-50 rounded-full py-2 pl-12 pr-4  border-2 border-dashed  border-amber-700  focus:ring-2 focus:ring-amber-700 focus:border-transparent transition-all outline-none text-sm"
                />
                <Search className="absolute left-4 top-3 text-gray-600 w-5 h-5 transition-colors group-hover:text-amber-500" />
              </div>
            </div>

           {/* Icônes */}
<div className="flex items-center gap-6">
  <div className='group relative'>
    <button className="text-gray-800 hover:text-amber-500 transition-colors cursor-pointer">
      <User className="w-6 h-6" />
    </button>
    <div className='group-hover:block hidden absolute w-50 border-2 border-amber-700 dropdown-menu right-0 bg-white rounded-md shadow-lg'>
      <div>
        <a href="#" className='block px-4 py-2 text-xl bg-amber-50 hover:text-amber-700 font-caveat text-black hover:bg-gray-100'>Mon Compte</a>
        <a href="#" className='block px-4 py-2 text-xl bg-amber-50 hover:text-amber-700 font-caveat text-black hover:bg-gray-100'>Mes Commandes</a>
        <a href="#" className='block px-4 py-2 text-xl bg-amber-50 hover:text-amber-700 font-caveat text-black hover:bg-gray-100'>Déconnexion</a>
      </div>
    </div>
  </div>

  <button className="text-gray-800 hover:text-amber-500 transition-colors cursor-pointer">
    <Heart className="w-6 h-6" />
  </button>

  <Link to="/panier">
    <button className="text-gray-800 hover:text-amber-500 transition-colors relative">
    <ShoppingCart className="w-6 h-6" />
    <span className="absolute -top-1 -right-2 w-4 h-4 bg-amber-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">2</span>
  </button>
  </Link>
</div>

          </div>
         

          {/* VERSION MOBILE (Cachée sur PC) - Basée sur ton design Grid 2x5 */}
          <div className="md:hidden w-full  ">
            <div className="grid grid-rows-[50px_2fr_75px] grid-cols-5  items-center">
              
              {/* Ligne 1 : Logo (Col 1-2) et Icônes (Col 3-5) */}
              <div className="col-span-2 font-serif text-xl tracking-widest text-amber-600 truncate px-1">
                  <img 
                               src={logo2} 
                               alt="Logo" 
                               className="object-contain overflow-hidden h-50 w-50 col-span-2"
                             />
                        
              </div>
              <button className="col-span-1 flex justify-center p-2 text-gray-700 hover:bg-gray-100 rounded-full relative transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-0 right-1 w-4 h-4 bg-amber-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">2</span>
              </button>
              <button className="col-span-1 flex justify-center p-2 text-black hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="col-span-1 flex justify-center p-2 text-black hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </button>

              {/* Ligne 2 : Menu Burger (Col 1) et Recherche (Col 2-5) */}
              <button 
                className="col-span-1 flex justify-center p-2 text-black hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setVisible(!Visible)}
              >
                {Visible ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="col-span-4 relative w-full pr-1">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="w-full h-10 bg-gray-50 border-dashed border-2 border-amber-500 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-amber-500 transition-all outline-none text-sm"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>

            </div>
          </div>
        </div>
       
      </header>

       

      {/* --- MENU TIROIR MOBILE (DRAWER) --- */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300 md:hidden ${Visible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setVisible(false)}
      >
        <div 
          className={`absolute top-0 left-0 w-4/5 max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${Visible ? 'translate-x-0' : '-translate-x-full'}`}
        
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div > <img 
                               src={logo2} 
                               alt="Logo" 
                               className="object-contain overflow-hidden h-50 w-50 col-span-2"
                             /></div>
            <button onClick={() => setVisible(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col py-4 overflow-y-auto">
            {['Nouveautés', 'Bagues', 'Colliers', 'Bracelets', 'Mariage', 'Mon Compte'].map((item) => (
              <a key={item} href="#" className="flex items-center justify-between px-6 py-4 text-gray-800 border-b border-gray-50 hover:bg-gray-50 hover:text-amber-500 transition-colors">
                <span className="font-medium">{item}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

