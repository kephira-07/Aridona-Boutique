import React from 'react'

const Footer = () => {
  return (
    <div>
         <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          
          {/* Colonne 1 : Marque & Newsletter */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-3xl tracking-widest text-amber-500 mb-6">ARILONA</h2>
            <p className="text-gray-400 font-light mb-6 max-w-sm mx-auto md:mx-0">
              Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives et découvrir nos nouvelles collections en avant-première.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto md:mx-0">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="flex-1 bg-gray-800 border border-gray-700 rounded-full py-3 px-6 text-white focus:outline-none focus:border-amber-500"
              />
              <button className="bg-amber-500 text-white px-8 py-3 rounded-full hover:bg-amber-600 transition-colors font-medium">
                S'inscrire
              </button>
            </div>
          </div>

          {/* Colonne 2 : Liens utiles */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-gray-300">Boutique</h3>
            <ul className="space-y-4 font-light text-gray-400">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Toutes les collections</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Bagues de fiançailles</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Idées Cadeaux</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Prendre rendez-vous</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Service Client */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-gray-300">Service Client</h3>
            <ul className="space-y-4 font-light text-gray-400">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contactez-nous</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Livraison & Retours</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Guide des tailles</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Entretien des bijoux</a></li>
            </ul>
          </div>
        </div>

        {/* Ligne du bas : Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 font-light gap-4">
          <p>&copy; {new Date().getFullYear()} Arilona Joaillerie. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer