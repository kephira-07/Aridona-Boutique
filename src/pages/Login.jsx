import React,{useState} from 'react'

const Login = () => {
const [etatactuel, setEtatactuel] = useState('Connexion'); // 'Connexion' ou 'Inscription' ou 'Oubli'

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#fdfdfd] px-4 py-10">
      <div className="w-full max-w-[450px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 rounded-2xl p-8 md:p-10">
        
        {/* Titre Dynamique avec Alice */}
        <div className="text-center mb-8">
          <h1 className="font-alice text-3xl text-gray-800 tracking-widest transition-all">
            {etatactuel === 'Connexion' ? 'Bienvenue' : etatactuel === 'Inscription' ? 'Créer un Compte' : 'Récupération'}
          </h1>
          <p className="font-alice text-xs text-amber-600 uppercase tracking-[0.2em] mt-2">
            Arilona Joaillerie
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          {/* Champ Nom (Uniquement pour l'Inscription) */}
          {etatactuel === 'Inscription' && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Nom Complet</label>
              <input 
                type="text" 
                className="w-full border-b border-gray-200 py-2 outline-none focus:border-amber-600 font-alice text-gray-700 transition-colors bg-transparent"
                placeholder="Ex: Sophie Arilona"
                required
              />
            </div>
          )}

          {/* Champ Email */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Adresse Email</label>
            <input 
              type="email" 
              className="w-full border-b border-gray-200 py-2 outline-none focus:border-amber-600 font-alice text-gray-700 transition-colors bg-transparent"
              placeholder="votre@email.com"
              required
            />
          </div>

          {/* Champ Mot de Passe (Caché si Oubli) */}
          {etatactuel !== 'Oubli' && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Mot de passe</label>
              <input 
                type="password" 
                className="w-full border-b border-gray-200 py-2 outline-none focus:border-amber-600 font-alice text-gray-700 transition-colors bg-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {/* Mot de passe oublié (Uniquement en mode Connexion) */}
          {etatactuel === 'Connexion' && (
            <div className="text-right">
              <button 
                onClick={() => setEtatactuel('Oubli')}
                className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-amber-700 transition-colors"
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}

          {/* Bouton Principal avec ton effet de mouvement */}
          <button className="w-full bg-black text-white py-4 mt-4 rounded-sm font-alice text-sm tracking-[0.2em] uppercase transition-all active:scale-95 hover:bg-zinc-800 shadow-lg">
            {etatactuel === 'Connexion' ? 'Se Connecter' : etatactuel === 'Inscription' ? 'Rejoindre Arilona' : 'Envoyer le lien'}
          </button>
        </form>

        {/* Pied de page de la carte : Switch entre les états */}
        <div className="mt-8 text-center border-t border-gray-50 pt-6">
          {etatactuel === 'Connexion' ? (
            <p className="text-xs text-gray-500 font-alice italic">
              Pas encore de compte ?{' '}
              <button 
                onClick={() => setEtatactuel('Inscription')}
                className="text-amber-700 not-italic font-bold uppercase tracking-widest ml-1 hover:underline"
              >
                Créer un compte
              </button>
            </p>
          ) : (
            <p className="text-xs text-gray-500 font-alice italic">
              Déjà membre ?{' '}
              <button 
                onClick={() => setEtatactuel('Connexion')}
                className="text-amber-700 not-italic font-bold uppercase tracking-widest ml-1 hover:underline"
              >
                Se connecter
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}; 
export default Login;