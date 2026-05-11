import React from 'react'
import { ShopContext } from '../context/ShopContext';
import { produits } from '../assets/image';
import Titre from './Titre';

const DerniereCollection = () => {
    const { produits } = React.useContext(ShopContext);
    const [dernierProduit,setDernierProduit] = React.useState([]);
    useEffect(()=>{
        setDernierProduit(produits.slice(0,10));
    },[])
  return (
    <div className='my-10'>
        <div>
            <Titre text1='Découvrez notre' text2='dernière collection' />
        </div>
    </div>
  )
}

export default DerniereCollection