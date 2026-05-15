import { useContext , useState ,useEffect} from 'react';
import { ShopContext } from '../context/ShopContext';
import Titre from './Titre';
import ProduitItem from './ProduitItem';

const DerniereCollection = () => {
  const { produits } = useContext(ShopContext);
  
   const [dernierProduit, setDernierProduit] = useState([]);
   useEffect(() => {
    setDernierProduit(produits.slice(0,10)); // On prend les 10 derniers produits

   }, []);

  return (
    <div className=''>
      <div className='pb-10 px-10 text-3xl'>
        <Titre text1='Découvrez notre' text2='Dernière collection' />
        <p className='w-3/4  text-xs sm:text-sm md:text-base font-averia text-gray-600'>
        Voici nos nouvelles collections parfaites pour vous
        </p>
      </div>

      <div className=' px-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 gap-y-6'>
        {
          dernierProduit.map((item, index) => (
            <ProduitItem 
              key={index} 
              id={item.id} 
              img={item.img} 
              name={item.name} 
              price={item.price} 
            />
          ))
        }
      </div>
    </div>
  );
};

export default DerniereCollection;