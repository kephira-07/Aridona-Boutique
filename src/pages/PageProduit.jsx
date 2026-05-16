import { useContext,useEffect,useState } from 'react'
import React  from 'react'
import { useParams } from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'
import { Star ,X} from 'lucide-react'
import ApparenteProduit from '../composant/ApparenteProduit'

const PageProduit = () => {
  const {produitId}=useParams();
  const {produits,monnaie,ajouterPanier}= useContext(ShopContext);
  const [produitData,setProduitData]=useState(false);
  const [image,setImage]=useState('');
 
  const [size,setSize]=useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchProduitData= async ()=>{
    produits.map((item)=>{
      if(item._id === produitId){
        setProduitData(item);
        setImage(item.img[0]);
     
        return null
      } 
    })
  }
  useEffect(()=>{
    fetchProduitData();
  },[produitId,produits])
  return produitData ? (
  <div className='border-t-2 mt-20 md:mt-32 pt-10 transition-opacity ease-in duration-500 opacity-100'>
  {/* --- Conteneur Principal --- */}
  <div className='flex gap-8 lg:gap-16 flex-col md:flex-row px-4 md:px-10 lg:px-20'>
    
    {/* --- SECTION IMAGES --- */}
    <div className='flex-1 flex flex-col-reverse gap-3 md:flex-row'>
      
      {/* Liste des miniatures */}
      <div className='flex md:flex-col overflow-x-auto md:overflow-y-auto justify-start gap-3 md:w-[20%] w-full no-scrollbar'>
        {produitData.img.map((item, index) => (
          <div 
            key={index}
            onClick={() => setImage(item)}
            className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-full aspect-square cursor-pointer border-2 transition-all duration-300 rounded-md overflow-hidden
              ${image === item ? 'border-amber-600 shadow-sm' : 'border-transparent hover:border-amber-200'}`}
          >
            <img 
              src={item} 
              className='w-full h-full object-cover'
              alt={`Miniature ${index}`}
            />
          </div>
        ))}
      </div>

      {/* Image Principale */}
   {/* --- Image Principale avec clic pour agrandir --- */}
<div className='w-full md:w-[80%]'>
  <div 
    onClick={() => setShowModal(true)} // Ouvre la modal au clic
    className='aspect-square w-full overflow-hidden rounded-xl bg-stone-50 border border-stone-100 cursor-zoom-in group relative'
  >
    <img 
      src={image} 
      alt={produitData.name} 
      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
    />
    {/* Petit indicateur visuel au survol */}
    <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
       <span className='bg-white/80 px-4 py-2 rounded-full text-xs font-medium text-stone-800 backdrop-blur-sm'>
         Cliquez pour agrandir
       </span>
    </div>
  </div>
</div>

{/* --- MODAL PLEIN ÉCRAN (À placer juste avant la fermeture de la div principale) --- */}
{showModal && (
  <div 
    className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4 md:p-10 transition-all duration-300"
    onClick={() => setShowModal(false)} // Ferme la modal en cliquant n'importe où
  >
    {/* Bouton Fermer */}
    <button 
      className="absolute top-5 right-5 text-white hover:text-amber-500 transition-colors"
      onClick={() => setShowModal(false)}
    >
      <X size={40} strokeWidth={1.5} />
    </button>

    {/* Image en taille réelle */}
    <img 
      src={image} 
      alt="Plein écran" 
      className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
      onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique sur l'image elle-même
    />
  </div>
)}

    </div>

    {/* --- INFOS PRODUIT --- */}
    <div className='flex-1'>
      <h1 className='font-serif text-3xl md:text-4xl text-stone-800 tracking-tight'>{produitData.name}</h1>
      
      {/* Avis */}
      <div className='flex items-center gap-1 mt-3'>
        {[...Array(4)].map((_, i) => (
          <Star key={i} className='w-4 h-4 fill-amber-500 text-amber-500' />
        ))}
        <Star className='w-4 h-4 text-stone-300' />
        <p className='pl-2 text-sm text-stone-500 font-medium'>(12 avis clients)</p>
      </div>

      <p className='mt-6 text-3xl font-light text-amber-900'>
        {produitData.price.toLocaleString()} {monnaie}
      </p>
      
      <p className='mt-6 text-stone-600 leading-relaxed font-alice text-lg md:w-11/12'>
        {produitData.description}
      </p>

      {/* Sélection de Taille */}
      <div className='flex flex-col gap-4 my-10'>
          <p className='font-medium text-stone-800'>Sélectionner une taille :</p>
          <div className='flex flex-wrap gap-3'>
            {produitData.size.map((item, index) => (
              <button 
                key={index} 
                onClick={() => setSize(item)}
                className={`min-w-[3rem] h-12 flex items-center justify-center border-2 transition-all duration-200 font-medium
                  ${item === size 
                    ? 'border-amber-800 bg-amber-900 text-white shadow-md' 
                    : 'border-stone-200 bg-white text-stone-600 hover:border-amber-400'}`}
              >
                {item}
              </button>
            ))}
          </div>
      </div>
      
      {/* Bouton d'action */}
      <button 
        onClick={() => ajouterPanier(produitData._id, size)} 
        className='w-full md:w-auto mt-2 bg-stone-900 text-white px-12 py-4 text-sm font-bold tracking-[0.2em] hover:bg-amber-950 active:bg-stone-700 transition-all rounded-sm shadow-lg'
      >
        AJOUTER AU PANIER
      </button>

      <hr className='mt-10 border-stone-200 md:w-11/12'/>
      
      <div className='text-xs sm:text-sm text-stone-500 mt-6 flex flex-col gap-2 font-medium'>
        <div className='flex items-center gap-2 italic'>
          <span className='w-1 h-1 bg-amber-600 rounded-full'></span>
          <p>100% Satisfaction Garantie</p>
        </div>
        <div className='flex items-center gap-2 italic'>
          <span className='w-1 h-1 bg-amber-600 rounded-full'></span>
          <p>Livraison Gratuite à partir de 150 000 FCFA</p>
        </div>
        <div className='flex items-center gap-2 italic'>
          <span className='w-1 h-1 bg-amber-600 rounded-full'></span>
          <p>Échange et retour sous 30 jours</p>
        </div>
      </div>
    </div>
  </div>

  {/* --- SECTION DESCRIPTION & REVIEWS --- */}
  <div className='mt-24 px-4 md:px-10 lg:px-20'>
    <div className='flex'>
      <button className='border-b-2 border-stone-900 px-8 py-4 text-sm font-bold'>Description</button>
      <button className='border-b-2 border-transparent text-stone-400 px-8 py-4 text-sm hover:text-stone-600 transition-all'>Avis (122)</button>
    </div>
    <div className='flex flex-col gap-6 border border-stone-100 px-8 py-10 text-sm md:text-base text-stone-600 leading-loose bg-stone-50/30'>
      <p>{produitData.fullDescription || "Détails raffinés et finitions artisanales caractérisent cette pièce unique de notre collection Arilona."}</p>
      <p>Chaque pièce est soigneusement sélectionnée pour garantir une brillance durable et un confort optimal au quotidien.</p>
    </div>
  </div>

  {/* Produits Similaires */}
  <div className='mt-20'>
    <ApparenteProduit />
  </div>
</div>
  ): <div className='opacity-0'></div>
}

export default PageProduit
