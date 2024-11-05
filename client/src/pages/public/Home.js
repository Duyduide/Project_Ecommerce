import React from 'react'
import { Sidebar, Banner } from '../../components/index'

const Home = () => {
  return (
    <div className="w-main flex">
      <div className='flex flex-col gap-5 w-[30%] flex-auto border'>
        <Banner />
        <span>Daily deal</span>
      </div>
      <div className='flex flex-col gap-5 pl-5 w-[70%] border'>
        <Sidebar />
        <span>Best seller</span>
      </div>
    </div>
  )
}

export default Home