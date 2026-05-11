import React, { useState ,useParams} from 'react';
import { Search, ShoppingCart, User, Menu, Heart, ChevronRight, MessageCircle, Truck, ShieldCheck, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';



export default function PageProduit() {
 const [mainImage, setMainImage] = useState(PRODUCT.images[0]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isCareOpen, setIsCareOpen] = useState(false);

  // --- LOGIQUE WHATSAPP ---
  const handleWhatsAppOrder = () => {
    const {id} = useParams();
    // Numéro de téléphone au format international (sans le +), ex pour le Togo : 228...
    const phoneNumber = "22890000000"; 
    const message = `Bonjour Arilona ✨,\n\nJe souhaite commander :\n*${PRODUCT.name}*\nMatière : ${PRODUCT.material}\nPrix : ${PRODUCT.price} F\n\nPouvez-vous m'indiquer les modalités de paiement et de livraison ? Merci !`;
    
    // Encodage du message pour l'URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Ouvre WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
  };

 
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
     <BandeAnnonce/>
     <Header/>
     
     

      {/* --- FIL D'ARIANE (Breadcrumb) --- */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex items-center text-xs text-gray-400 uppercase tracking-wider font-light">
        
          <a href="#" className="hover:text-[#7B5C46] transition-colors">{PRODUCT.category}</a>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#7B5C46]">{PRODUCT.name}</span>
        </nav>
      </div>

      {/* --- SECTION PRODUIT PRINCIPALE --- */}
      <main className="max-w-7xl mx-auto px-4 pb-20 flex flex-col md:flex-row gap-10 lg:gap-16">
        
        {/* Colonne Gauche : Galerie d'images */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {/* Image Principale */}
          <div className="w-full aspect-[4/5] bg-[#FAF6F0] rounded-2xl overflow-hidden relative">
            <img 
              src={mainImage} 
              alt={PRODUCT.name} 
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
          
          {/* Miniatures */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {PRODUCT.images.map((img, index) => (
              <button 
                key={index} 
                onClick={() => setMainImage(img)}
                className={`w-20 md:w-24 aspect-square rounded-lg overflow-hidden shrink-0 border-2 transition-all ${mainImage === img ? 'border-[#7B5C46] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`Miniature ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Colonne Droite : Infos Produit */}
        <div className="w-full md:w-1/2 flex flex-col pt-4 md:pt-10">
          <span className="text-xs text-[#7B5C46] uppercase tracking-widest font-bold mb-2">{PRODUCT.material}</span>
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">{PRODUCT.name}</h1>
          <p className="text-2xl font-serif text-[#7B5C46] mb-8">{PRODUCT.price} F</p>
          
          <p className="text-gray-600 font-light leading-relaxed mb-8">
            {PRODUCT.description}
          </p>

          {/* Bouton de Commande WhatsApp */}
          <button 
            onClick={handleWhatsAppOrder}
            className="w-full md:w-4/5 py-4 px-6 bg-[#7B5C46] text-white rounded-full flex items-center justify-center gap-3 hover:bg-[#5A4333] transition-colors shadow-lg shadow-[#7B5C46]/20 mb-10 group"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium tracking-wide">Commander sur WhatsApp</span>
          </button>

          {/* Réassurance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-[#EAE0D5] mb-8">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-6 h-6 text-[#7B5C46]" />
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Livraison Rapide</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Sparkles className="w-6 h-6 text-[#7B5C46]" />
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Fait main</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#7B5C46]" />
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Garantie 1 an</span>
            </div>
          </div>

          {/* Accordéons d'informations */}
          <div className="flex flex-col">
            {/* Détails du produit */}
            <div className="border-b border-[#EAE0D5]">
              <button 
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="w-full py-4 flex items-center justify-between text-left text-gray-900 font-medium hover:text-[#7B5C46] transition-colors"
              >
                Caractéristiques
                {isDetailsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isDetailsOpen ? 'max-h-48 pb-4' : 'max-h-0'}`}>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 font-light">
                  {PRODUCT.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Entretien */}
            <div className="border-b border-[#EAE0D5]">
              <button 
                onClick={() => setIsCareOpen(!isCareOpen)}
                className="w-full py-4 flex items-center justify-between text-left text-gray-900 font-medium hover:text-[#7B5C46] transition-colors"
              >
                Conseils d'entretien
                {isCareOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isCareOpen ? 'max-h-48 pb-4' : 'max-h-0'}`}>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  Pour préserver l'éclat de votre bijou, évitez le contact avec le parfum et les produits cosmétiques. Rangez-le dans son pochon Arilona lorsque vous ne le portez pas.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* --- SECTION PRODUITS SIMILAIRES --- */}
      <section className="bg-[#FAF6F0] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-[#7B5C46] text-center mb-10">Vous aimerez aussi</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {RELATED_PRODUCTS.map(product => (
              <div key={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative overflow-hidden bg-white rounded-xl aspect-[4/5] mb-4">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col text-center">
                  <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-[#7B5C46] font-serif text-sm md:text-base">{product.price} F</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// --- DONNÉES SIMULÉES DU PRODUIT ---
const PRODUCT = {
  id: 2,
  name: "Collier Minimaliste Goutte",
  category: "Colliers",
  material: "Acier Inoxydable",
  price: 45,
  description: "D'une élégance rare, ce collier met en valeur une délicate goutte polie. Conçu pour épouser parfaitement la ligne de votre cou, il capte la lumière à chaque mouvement. Un bijou intemporel qui se porte aussi bien en journée qu'en soirée.",
  details: [
    "Longueur de la chaîne : 40 cm + 5 cm d'extension",
    "Taille du pendentif : 1.2 cm",
    "Résistant à l'eau et hypoallergénique",
    "Livré dans son écrin signature Arilona"
  ],
  images: [
    "https://images.unsplash.com/photo-1599643478514-4a11011c289e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800"
  ]
};

// --- AUTRES PRODUITS (Pour la section "Vous aimerez aussi") ---
const RELATED_PRODUCTS = [
  { id: 3, name: "Boucles d'oreilles Célestes", material: "Argent", price: 85, img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Bracelet Jonc Torsadé", material: "Acier Inoxydable", price: 55, img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600" },
  { id: 1, name: "Bague Éternité Or", material: "Acier", price: 120, img: "https://images.unsplash.com/photo-1605100804763-247f67b6348e?auto=format&fit=crop&q=80&w=600" },
];

