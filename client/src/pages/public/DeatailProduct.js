import React from 'react'

const DeatailProduct = () => {
  return (
    <div>DeatailProduct</div>
  )
}

// const DeatailProduct = () => {
//   const [product, setProduct] = useState([]);
//   const { id } = useParams();
  
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await apiFetchProductById(id);
//         setProduct(response.data);
//       } catch (error) {
//         console.log('Failed to fetch product: ', error);
//       }
//     }
//     fetchProduct();
//   }, [id]);

//   return (
//     <div> DetailProduct </div>
//   )
// }

export default DeatailProduct