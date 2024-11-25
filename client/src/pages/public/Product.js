import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { apiFetchProductByPage } from 'apis/product'

export const Product = () => {

  const {category} = useParams();

  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    const response = await apiFetchProductByPage(category);
    if(response.success) {
      setProducts(response.productData); 
    }
  }

  useEffect(() => { 
    fetchProduct(); 
  }, [])

  console.log(products);
  
  return (
    <div>Product</div>
  )
}

export default Product;
