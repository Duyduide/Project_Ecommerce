import React, { useEffect, useState } from 'react'
import { Sidebar, Banner, RightBanner } from '../../components/index'
import { useSelector, useDispatch } from 'react-redux'
//import {getProduct} from '../../store/product/asyncActions'
import {apiGetPhone, apiGetProduct} from '../../apis'

const Home = () => {

  //api gọi toàn bộ sản phẩm
  // const [products, setProducts] = useState(null);
  // const fetchProducts = async () => {
  //   const response = await apiGetProduct()
  //   if(response.success) setProducts(response);
  // }
  // useEffect(() => {
  //   fetchProducts()
  // }, [])
  // console.log(products)
  // hết api gọi sản phẩm 
  // const { newProducts } = useSelector(state => state.products)
  // console.log({newProducts})
  // api lấy toàn bộ sản phẩm
  return (
    <div className="w-main flex flex-r ">
      <div className='flex flex-col gap-5 w-[20%] flex-auto'>
        <Sidebar />
      </div>
      <div className='flex flex-col pl-5 w-[50%] flex-auto'>
        <Banner />
        <div className='w-full h-full flex flex-row items-center justify-between border-x rounded-b-md shadow-xl'>
          <span>Ưu đãi 1</span>
          <span>Ưu đãi 2</span>
          <span>Ưu đãi 3</span>
          <span>Ưu đãi 4</span>
        </div>
      </div>
      <div className='flex flex-col gap-5 pl-5 w-[30%] flex-auto'>
        <RightBanner />
      </div>
    </div>
  )
}

export default Home