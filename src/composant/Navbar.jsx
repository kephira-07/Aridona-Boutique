import React, { useState, useEffect,useContext, } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart,ChevronRight, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import BarRecherche from './BarRecherche';




import logo2 from '../assets/logo2.svg';


// --- COMPOSANT HEADER (BARRE DE NAVIGATION) ---

export default function Navbar() {
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [Visible, setVisible] = useState(false);
  const {setMontreRecherche}=useContext(ShopContext);
  

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
       
      <header
        className='fixed top-0 w-full z-50 transition-all duration-300 '>
           {/* --- BANDEAU ANNONCE (Optionnel) --- */}
     
        <div className="relative flex items-center bg-amber-950 text-white text-xs overflow-hidden h-6 w-full">
  <div 
    className="flex whitespace-nowrap"
    style={{
      display: 'flex',
      whiteSpace: 'nowrap',
      animation: 'scroll-loop 20s linear infinite',
    }}
  >
    {/* On définit l'animation directement dans une balise style invisible */}
    <style>{`
      @keyframes scroll-loop {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>

    <span className="px-4">LIVRAISON OFFERTE À PARTIR DE 150 000 FCFA D'ACHAT • </span>
    <span className="px-4">LIVRAISON OFFERTE À PARTIR DE 150 000 FCFA D'ACHAT • </span>
    <span className="px-4">LIVRAISON OFFERTE À PARTIR DE 150 000 FCFA D'ACHAT • </span>
    <span className="px-4">LIVRAISON OFFERTE À PARTIR DE 150 000 FCFA D'ACHAT • </span>
  </div>
</div>

          
          {/* VERSION PC (Cachée sur Mobile) */}
          <div className={`hidden md:flex items-center justify-between px-20  transition-all duration-300  ${
          isScrolled ? '  bg-white/65 h-23  backdrop-blur-md shadow-sm' : 'bg-white h-28 '
        }`} >
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
               <BarRecherche isNavbar={true} />
           

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
         

       
          {/* VERSION MOBILE (Cachée sur PC) */}
              <div className="md:hidden  ">
                <div className={`flex items-center h-15 justify-between border-b-2 border-amber-700  px-10 ${
          isScrolled ? '  bg-white/65  backdrop-blur-md shadow-sm' : 'bg-white  '
        }`} >
                  
                  {/* 1. Menu Burger (Gauche) */}
                  <button 
                    className=" text-black hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => setVisible(true)}
                  >
                    <Menu className="w-6 h-6" />
                  </button>

                  {/* 2. Logo (Centré) */}
                  <div >
                    <Link to='/'>
                      <img 
                        src={logo2} 
                        alt="Logo" 
                        className="h-40 w-auto object-contain" 
                      />
                    </Link>
                  </div>

                  {/* 3. Icônes Actions (Droite) */}
                  <div className="flex items-center gap-4">
                    {/* Recherche */}
                    <button 
                      onClick={() => setMontreRecherche(true)}
                      className=" text-black hover:bg-gray-100 rounded-full"
                    >
                      <Search className="w-5 h-5" />
                    </button>

                    {/* Profil */}
                    <button className=" text-black hover:bg-gray-100 rounded-full">
                      <User className="w-5 h-5" />
                    </button>
                      <button className=" text-black hover:bg-gray-100 rounded-full">
                      <Heart className="w-5 h-5" />
                    </button>

                    {/* Panier avec Badge */}
                    <Link to="/panier" className=" text-black hover:bg-gray-100 rounded-full relative ">
                      <ShoppingCart className="w-5 h-5" />
                      <span className="absolute  right-[-10px] bottom-3 w-4 h-4 bg-amber-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                        2
                      </span>
                    </Link>
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

