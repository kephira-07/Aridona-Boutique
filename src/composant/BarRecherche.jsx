import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BarRecherche({ isNavbar }) {
  const {
    recherche, setRecherche,
    montreRecherche, setMontreRecherche,
    produits,
  } = useContext(ShopContext);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Suggestions filtrées (max 5)
  const suggestions = useMemo(() => {
    if (!recherche.trim()) return [];
    return produits
      .filter(p => p.name.toLowerCase().includes(recherche.toLowerCase()))
      .slice(0, 5);
  }, [recherche, produits]);

  // Afficher / masquer les suggestions
  useEffect(() => {
    setShowSuggestions(recherche.trim().length > 0);
  }, [recherche]);

  const handleSuggestionClick = (produit) => {
    setRecherche('');               // vide la recherche
    setShowSuggestions(false);      // ferme la liste
    navigate(`/produit/${produit._id}`); // redirige vers la fiche (adapte la route si besoin)
  };

  // Si on n'est pas dans la navbar et que l'overlay est caché, on n'affiche rien
  if (!isNavbar && !montreRecherche) return null;

  return (
    <div className={`flex items-center justify-center ${isNavbar ? 'w-full mx-10' : 'w-full py-5 bg-white border-b'}`}>
      <div className={`relative inline-flex items-center border-2 border-amber-700 border-dashed rounded-full overflow-hidden bg-white ${isNavbar ? 'w-full max-w-md' : 'w-[70%]'}`}>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 px-4 py-2 outline-none bg-transparent text-sm"
          placeholder="Rechercher..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // petit délai pour permettre le clic
        />
        <div className="bg-amber-700 w-10 h-10 flex items-center justify-center">
          <Search className="text-white w-5 h-5" />
        </div>

        {/* Dropdown des suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {suggestions.map(p => (
              <li
                key={p._id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                onMouseDown={(e) => e.preventDefault()} // empêche la perte de focus avant le clic
                onClick={() => handleSuggestionClick(p)}
              >
                <img
                  src={p.img[0]}
                  alt={p.name}
                  className="w-8 h-8 object-cover rounded-full border"
                />
                <span className="text-sm truncate">{p.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bouton X uniquement en mode overlay (mobile) */}
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