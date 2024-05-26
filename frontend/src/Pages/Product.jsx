import React, { useContext }from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/shopContext'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';

const Product = () => {
  const {all_product}  = useContext(ShopContext);
  const {productId} = useParams();
  const Product = all_product.find(product => product.id === Number(productId));

  
  return ( 
    <div>
      <ProductDisplay Product={Product} />
      
    </div>
  )
}

export default Product