import React, { useContext, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Search, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BarRecherche({ isNavbar }) {
  const {
    recherche, setRecherche,
    montreRecherche, setMontreRecherche,
    showSuggestions, setShowSuggestions,
    suggestions // Récupéré directement du Contexte !
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setRecherche(e.target.value);
    // Si l'utilisateur tape du texte et qu'il n'est pas sur la page collection, on l'y redirige
    if (e.target.value.trim() && location.pathname !== '/collection') {
      navigate('/collection');
    }
  };

  const handleSuggestionClick = (produit) => {
    setRecherche('');               // Vide le texte
    setShowSuggestions(false);      // Ferme le menu de suggestions
    setMontreRecherche(false);      // Ferme l'overlay mobile si ouvert
    navigate(`/produit/${produit._id}`); // Redirige vers la fiche du bijou
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      setMontreRecherche(false);
      inputRef.current?.blur(); // Enlève le focus de l'input
    }
  };

  // Condition d'affichage pour le mobile
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
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 250)} // Laisse le temps au clic de s'exécuter
        />
        
        <div className="bg-amber-700 w-10 h-10 flex items-center justify-center">
          <Search className="text-white w-5 h-5" />
        </div>

        {/* Liste des suggestions issue du Context */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute top-[110%] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999] max-h-60 overflow-y-auto p-1">
            {suggestions.map(p => (
              <li
                key={p._id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-amber-50/70 rounded-md cursor-pointer transition-colors"
                onMouseDown={(e) => e.preventDefault()} // Évite la fermeture prématurée via onBlur
                onClick={() => handleSuggestionClick(p)}
              >
                <img
                  src={p.img && p.img[0] ? p.img[0] : 'https://placehold.co/600x600?text=Bijou'}
                  alt={p.name}
                  className="w-10 h-10 object-cover rounded-md border border-amber-700/20 flex-shrink-0"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-medium text-gray-800 truncate">{p.name}</span>
                  <span className="text-xs text-amber-700 font-semibold">{p.price} FCFA</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bouton de fermeture X (uniquement visible sur l'overlay mobile) */}
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