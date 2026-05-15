import React from 'react'
import {  Heart,ChevronRight } from 'lucide-react';

import bijou1 from'../assets/bijoux1.jpg';
import bijou2 from'../assets/bijoux2.jpg';
import bijou3 from'../assets/bijoux3.jpg';
import bijou4 from'../assets/bijoux4.jpg';
import DerniereCollection from '../composant/DerniereCollection';
import MeilleurVente from '../composant/MeilleurVente';
import Hero from '../composant/Hero';
export default function Collection() {
  return (
    <div> 
      <Hero/>
      <DerniereCollection/>  
      <MeilleurVente />     
        <FeaturedProducts />
     
     </div>
    )
 }
 
// --- NOUVELLE SECTION : PRODUITS PHARES (Best Sellers) ---
const FeaturedProducts = () => {
  const products = [ { id: 1, name: "Bague Éternité Or & Perle", category: "Bagues", material: "Perle", price: 120, img: bijou1 },
    { id: 2, name: "Collier Minimaliste Goutte", category: "Colliers", material: "Acier Inoxydable", price: 45, img:bijou2 },
    { id: 3, name: "Boucles d'oreilles Célestes", category: "Boucles d'oreilles", material: "Argent", price: 85, img:bijou3},
    { id: 4, name: "Bracelet Jonc Torsadé", category: "Bracelets", material: "Acier Inoxydable", price: 55, img:bijou4 },
  ]
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-serif text-gray-900 mb-2">Pièces Maîtresses</h2>
            <p className="text-gray-500 font-light">Les créations les plus convoitées de notre maison.</p>
          </div>
          <a href="#" className="hidden md:flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors">
            Voir tout <ChevronRight className="w-5 h-5 ml-1" />
          </a>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg bg-[#fffaf5] aspect-[4/5] mb-4">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                {/* Bouton favoris (Cœur) */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 md:flex hidden">
                  <Heart className="w-4 h-4" />
                </button>
                {/* Bouton Ajout rapide (Visible au survol sur PC) */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hidden md:block">
                  <button className="w-full py-3 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium rounded-full hover:bg-amber-500 hover:text-white transition-colors shadow-lg">
                    Ajouter au panier
                  </button>
                </div>
              </div>
              
              {/* Infos Produit */}
              <div className="text-center md:text-left">
                <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1">{product.name}</h3>
                <p className="text-amber-600 font-serif text-sm md:text-base">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bouton Mobile "Voir tout" */}
        <div className="mt-8 text-center md:hidden">
          <button className="w-full py-3 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50">
            Voir toute la collection
          </button>
        </div>
      </div>
    </section>
  );
};




