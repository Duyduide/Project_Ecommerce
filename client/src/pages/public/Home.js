import React from 'react'
import { Sidebar, Banner, RightBanner } from '../../components/index'
import { useSelector } from 'react-redux'

const Home = () => {
  
  const { isLoggedIn, current } = useSelector(state => state.user)

  console.log({ isLoggedIn, current })

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