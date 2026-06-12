import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../config';

export default function Categorybar({ selectedCategories = [], toggleCategorie, clearCategories }) {
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  // 1. Charger les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/categorie`);
        if (response.data.success) setCategories(response.data.data);
      } catch (error) {
        console.error("Erreur chargement catégories barre:", error.message);
      }
    };
    fetchCategories();
  }, []);

  // 2. Gestion exclusive du scroll pour la Page d'accueil (Home)
  useEffect(() => {
    if (!isHomePage) return; // Désactivé complètement sur la page Collection

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Devient collante dès qu'on passe sous le Hero de la Home (~450px)
      setIsSticky(currentScrollY > 450);

      // Système de masquage : cache quand on descend vite, montre quand on remonte
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHomePage]);

  const handleCategoryClick = (id) => {
    if (isHomePage) {
      navigate('/collection', { state: { initialCategory: id } });
    } else {
      toggleCategorie(id);
    }
  };

  const handleViewAllClick = () => {
    if (isHomePage) {
      navigate('/collection');
    } else {
      clearCategories();
    }
  };

  // Condition de taille : Grosse uniquement sur Home si on n'a pas défilé
  const isLarge = isHomePage && !isSticky;

  return (
    <div 
      className={`w-full bg-white border-b border-gray-100 left-0 transition-all duration-300 ${
        !isHomePage 
          ? 'fixed shadow-xs z-30' // Collection : Toujours bloquée en haut sous la navbar
          : isSticky 
            ? 'fixed shadow-md animate-slide-in z-30' // Home au scroll : Devient petite et collante
            : 'relative z-10' // Home par défaut : Reste statique sous le Hero en taille XXL
      } ${
        isHomePage && isSticky && !isVisible ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
      // Calcul mathématique précis basé sur les classes de ta Navbar (Bandeau 24px + Hauteurs variables)
      style={{ 
        top: !isHomePage 
          ? 'calc(24px + 7rem)' // Sur collection par défaut, se cale sous la Navbar haute (24px + h-28)
          : isSticky 
            ? 'calc(24px + 5.75rem)' // Au scroll (Home & Collection), se cale sous la Navbar réduite (24px + h-23)
            : '0px'
      }}
    >
      {/* Conteneur interne : ajuste le padding vertical selon le mode de taille */}
      <div className={`w-full max-w-7xl mx-auto px-4 transition-all duration-300 ${isLarge ? 'py-4' : 'py-2.5'}`}>
        <div className="flex items-center gap-5 overflow-x-auto scrollbar-hide snap-x py-1">
          
          {/* Bouton "Tout voir" */}
          <button
            onClick={handleViewAllClick}
            className="flex flex-col items-center flex-shrink-0 snap-center focus:outline-none group"
          >
            <div className={`rounded-full flex items-center justify-center border transition-all duration-300 ${
              isLarge 
                ? 'w-30 h-30 md:w-45 md:h-45 border-amber-500 bg-amber-50/50' 
                : 'w-10 h-10 md:w-11 md:h-11 border-slate-900 bg-slate-900'
            } ${(!isLarge && selectedCategories.length === 0) ? 'ring-2 ring-amber-500 ring-offset-2' : ''}`}>
              <span className={`font-bold transition-all ${isLarge ? 'text-lg text-amber-600' : 'text-xs text-white'}`}>✨</span>
            </div>
            <span className={`text-slate-800 tracking-wide font-medium mt-1.5 transition-all ${isLarge ? 'text-xs font-semibold' : 'text-[10px]'}`}>
              Tout voir
            </span>
          </button>

          {/* Liste dynamique avec visuels ronds */}
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat._id);
            
            return (
              <button
                key={cat._id}
                onClick={() => handleCategoryClick(cat._id)}
                className="flex flex-col items-center flex-shrink-0 snap-center focus:outline-none"
              >
                {/* Bulle d'image de la catégorie */}
                <div className={`rounded-full overflow-hidden border border-gray-100 shadow-xs transition-all duration-300 ${
                  isLarge 
                    ? 'w-30 h-30 md:w-45 md:h-45 hover:scale-105' 
                    : 'w-10 h-10 md:w-11 md:h-11'
                } ${(!isLarge && isChecked) ? 'ring-2 ring-amber-500 ring-offset-2' : ''}`}>
                  <img src={cat.image} alt={cat.nom} className="w-full h-full object-cover" />
                </div>

                {/* Texte descriptif */}
                <span className={`text-slate-700 tracking-wide font-medium mt-1.5 transition-all ${
                  isLarge ? 'text-xs' : 'text-[10px]'
                } ${(!isLarge && isChecked) ? 'text-amber-600 font-bold' : ''}`}>
                  {cat.nom}
                </span>
              </button>
            );
          })}

        </div>
      </div>
    </div>
  );
}