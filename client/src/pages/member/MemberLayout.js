import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import path from 'utils/path'
import { useSelector } from 'react-redux'
import { MemberSidebar, Navigation } from 'components'

const MemberLayout = () => {
  const { isLoggedIn, current } = useSelector(state => state.user);
  if(!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true} />

  return (
    <div className='flex flex-col'> 
      <div className='relative flex w-full min-h-screen text-gray-900 bg-gray-100'>
        <div className='w-[327px] top-0 bottom-0 flex-none fixed'>
          <MemberSidebar/>
        </div>
        <div className='w-[327px]'></div>
        <div className='flex-auto'>
          <Outlet />
        </div>
      </div>
    </div>
    
  )
}

export default MemberLayout