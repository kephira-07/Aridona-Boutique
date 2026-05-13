
import React, { useState, useEffect } from "react";
import { ShopContext } from '../context/ShopContext';
import { ChevronRight } from "lucide-react";
import Titre from '../composant/Titre';
import ProduitItem from "../composant/ProduitItem";

const Collection = () => {
    const { produits } = React.useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filtreProduits, setFiltreProduits] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [matiere, setMatiere] = useState([]);
    const [sortType,setSortType]= useState('reveler')

    const toggleCategorie = (e) => {
        const value = e.target.value;
        if (categorie.includes(value)) {
            setCategorie(prev => prev.filter(item => item !== value));
        } else {
            setCategorie(prev => [...prev, value]);
        }
    };

    const toggleMatiere = (e) => {
        
        if (matiere.includes(e.target.value)) {
            setMatiere(prev => prev.filter(item => item !== e.target.value));
        } else {
            setMatiere(prev => [...prev, e.target.value]);
        }
    };
  
     
    const appliquerFiltre=() =>{
        let copieproduit= produits.slice();
        if (categorie.length > 0) {
            copieproduit = copieproduit.filter(item => categorie.includes(item.categorie));
            
        }
        if (matiere.length > 0) {
            copieproduit=copieproduit.filter(item=> matiere.includes(item.material))
            
        }
        setFiltreProduits(copieproduit)

    }
    const sortProduit=()=>{
        let fpCopy=filtreProduits.slice()
        switch(sortType){
            case 'price-asc':
                setFiltreProduits(fpCopy.sort((a,b)=>(a.price-b.price)));
                break;
            case 'price-desc':
                setFiltreProduits(fpCopy.sort((a,b)=>(b.price-a.price)));
                break;  
            default:
                appliquerFiltre();
                break;      
        }

    }
   
    useEffect(()=>{
        appliquerFiltre();

    },categorie,matiere)

 
    
    useEffect(() => {
        // Ici tu peux filtrer selon categorie/matiere
        let filtered = produits.filter(p => {
            return (
                (categorie.length === 0 || categorie.includes(p.category)) &&
                (matiere.length === 0 || matiere.includes(p.material))
            );
        });
        setFiltreProduits(filtered);
    }, [categorie, matiere, produits]);

    useEffect(()=>{
      sortProduit()  

    },[sortType])
    return (
       <div>
     
               {/* En tete */}
                 <div className="bg-[#ffffffd3] mt-35 py-2 px-4 text-center">
                    <h2 className="text-4xl font-stretch-50% text-[#d14f09] mb-2">Notre Boutique</h2>
                    <p className="text-gray-800 font-semibold max-w-2xl mx-auto">
                    Decouvrez nos bijoux uniques adaptés à vos besoin
                    </p>
                </div>
              <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            
            {/* Colonne gauche */}
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 uppercase'>
                    Filtres
                    <ChevronRight className={`h-4 w-4 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`} />
                </p>

                {/* Catégories */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATÉGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <label><input type="checkbox" value="Bagues" onChange={toggleCategorie}/> Bagues</label>
                        <label><input type="checkbox" value="Collier" onChange={toggleCategorie}/> Colliers</label>
                        <label><input type="checkbox" value="Boucle d’oreille" onChange={toggleCategorie}/> Boucles d'oreilles</label>
                        <label><input type="checkbox" value="Bracelet" onChange={toggleCategorie}/> Bracelets</label>
                    </div>
                </div>

                {/* Matière */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">Matière: Acier inoxydable</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <label><input type="checkbox" value="Argenter" onChange={toggleMatiere}/> Argenté</label>
                        <label><input type="checkbox" value="Dore" onChange={toggleMatiere}/> Doré</label>
                        <label><input type="checkbox" value="Perle" onChange={toggleMatiere}/> Perle</label>
                    </div>
                </div>
            </div>

            {/* Colonne droite */}
            <div className='flex-1'>
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Titre text1={'Toute'} text2={'la collection'} />
                    <select onChange={(e)=>setSortType(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                        <option value="">Trier par</option>
                        <option value="price-asc">Prix : du moins cher au plus cher</option>
                        <option value="price-desc">Prix : du plus cher au moins cher</option>
                    </select>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-6'>
                    {filtreProduits.map((item, index) => (
                        <ProduitItem key={index} name={item.name} price={item.price} img={item.img} />
                    ))}
                </div>
            </div>
        </div>
       </div>
    );
};

export default Collection;
