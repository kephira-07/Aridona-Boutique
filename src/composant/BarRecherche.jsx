import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Search, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BarRecherche({ isNavbar }) {
  const {
    recherche, setRecherche,
    montreRecherche, setMontreRecherche,
    produits,
  } = useContext(ShopContext);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // On récupère la route actuelle
  const inputRef = useRef(null);

  // Suggestions filtrées (max 5)
  const suggestions = useMemo(() => {
    if (!recherche.trim()) return [];
    return produits
      .filter(p => p.name.toLowerCase().includes(recherche.toLowerCase()))
      .slice(0, 5);
  }, [recherche, produits]);

  // Si on tape du texte et qu'on n'est pas sur la page collection, on y va automatiquement
  useEffect(() => {
    if (recherche.trim().length > 0) {
      setShowSuggestions(true);
      if (location.pathname !== '/collection') {
        navigate('/collection');
      }
    } else {
      setShowSuggestions(false);
    }
  }, [recherche, location.pathname, navigate]);

  const handleSuggestionClick = (produit) => {
    setRecherche('');               // vide la recherche
    setShowSuggestions(false);      // ferme la liste
    setMontreRecherche(false);      // Ferme l'overlay mobile si ouvert
    navigate(`/produit/${produit._id}`); 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Entrée' || e.key === 'Enter') {
      setShowSuggestions(false);
      setMontreRecherche(false);
      inputRef.current?.blur(); // Enlève le focus du clavier
    }
  };

  // Si on est sur mobile (!isNavbar) et que l'overlay est masqué, on ne rend rien
  if (!isNavbar && !montreRecherche) return null;

  return (
    <div className={`flex items-center justify-center ${isNavbar ? 'w-full mx-10' : 'w-full py-5 bg-white border-b'}`}>
      <div className={`relative inline-flex items-center border-2 border-amber-700 border-dashed rounded-full overflow-hidden bg-white ${isNavbar ? 'w-full max-w-md' : 'w-[70%]'}`}>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 px-4 py-2 outline-none bg-transparent text-sm"
          placeholder="Rechercher un bijou..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Augmenté à 200ms pour assurer le clic mobile
        />
        <div className="bg-amber-700 w-10 h-10 flex items-center justify-center cursor-pointer">
          <Search className="text-white w-5 h-5" />
        </div>

        {/* Dropdown des suggestions miniatures */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute top-[105%] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-2xl z-[999] max-h-60 overflow-y-auto p-1">
            {suggestions.map(p => (
              <li
                key={p._id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-amber-50/50 rounded-md cursor-pointer transition-colors"
                onMouseDown={(e) => e.preventDefault()} // Crucial : empêche le onBlur de fermer la liste avant le clic !
                onClick={() => handleSuggestionClick(p)}
              >
                <img
                  src={p.img[0]}
                  alt={p.name}
                  className="w-10 h-10 object-cover rounded-md border border-amber-700/20"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-gray-800 truncate">{p.name}</span>
                  <span className="text-xs text-amber-700 font-semibold">{p.price} FCFA</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bouton X de fermeture (Overlay Mobile) */}
      {!isNavbar && (
        <X
          onClick={() => {
            setMontreRecherche(false);
            setRecherche('');
            setShowSuggestions(false);
          }}
          className="ml-3 w-6 h-6 text-amber-700 cursor-pointer"
        />
      )}
    </div>
  );
}