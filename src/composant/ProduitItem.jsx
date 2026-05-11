import React from 'react'
import { ShopContext } from '../context/ShopContext';   
import { Link } from 'react-router-dom';

const ProduitItem = ({id,image,name,price}) => {
    const{monaie}= React.useContext(ShopContext);
  return (
   <Link className='text-gray-700 cursor-pointer' to={'/produit/${id}'}>
    <div className='overflow-hidden'>
        <img src="{image[0]}" alt="" />
    </div>
    <p></p>
   </Link>
  )
}

export default ProduitItem