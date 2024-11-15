import React, { useEffect, useState } from 'react'
import { Sidebar, Banner, RightBanner, ProductPhone, ProductTablet, ProductHeadphone, ProductLaptop} from '../../components/index'
import { useSelector, useDispatch } from 'react-redux'
import {getProduct} from '../../store/product/asyncActions'
import {apiGetProduct, apiGetPhone } from '../../apis'

const Home = () => {
  return (
    <>
      <div className="w-main flex flex-row ">
        {/* Sidebar */}
        <div className='flex flex-col gap-5 w-[20%] flex-auto p-4'>
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className='flex flex-col pl-5 w-[50%] flex-auto p-4'>
          <Banner />
          <div className='w-full h-full flex flex-row items-center justify-between border-x rounded-b-md shadow-xl p-4'>
            <span>Ưu đãi 1</span>
            <span>Ưu đãi 2</span>
            <span>Ưu đãi 3</span>
            <span>Ưu đãi 4</span>
          </div>
        </div>
        {/* Right Banner */}
        <div className='flex flex-col gap-5 pl-5 w-[30%] flex-auto p-4'>
          <RightBanner />
        </div>
      </div>
      <div className='w-main flex flex-col py-10'>
        <ProductPhone />
        <ProductLaptop />
        <ProductTablet />
        <ProductHeadphone />
      </div>
    </>
  )
}

export default Home