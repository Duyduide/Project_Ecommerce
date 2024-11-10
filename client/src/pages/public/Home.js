import React from 'react'
import { Sidebar, Banner } from '../../components/index'
import { useSelector } from 'react-redux'

const Home = () => {
  const { isLoggedIn, current } = useSelector(state => state.user)

  console.log({ isLoggedIn, current })

  return (
    <div className="w-main flex">
      <div className='flex flex-col gap-5 w-[20%] flex-auto'>
        <Sidebar />
        <span>Daily deal</span>
      </div>

      <div className='flex flex-col gap-5 pl-5 w-[80%] flex-auto'>
        <Banner />
        <span>Best seller</span>
      </div>
    </div>
  )
}

export default Home