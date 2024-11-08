import { CloudSnow, Divide } from 'lucide-react'
import React, { useState, useCallback } from 'react'
import { InputField, Button } from '../../components'

const Login = () => {

  const [payLoad, setPayLoad] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })
  const [isRegister, setIsRegister] = useState(false)
  const handlleSubmit = useCallback(() => {
    console.log(payLoad);
  }, [payLoad])
  return (
    <div className='absolute top-1/2 bottom-1/2 left-1/2 right-1/2 items-center justify-center flex'>
        <div className='p-8 bg-white rounded-md min-w-[500px] border-4 border-cyan-800'>
          <h1 className='text-[28px] font-semibold flex flex-col items-center mb-8'>{isRegister? 'Đăng ký' : 'Đăng nhập'}</h1>
          {isRegister && 
            <div>
              <InputField
                value={payLoad.firstName}
                setValue={setPayLoad}
                nameKey='Tên'
              />
              <InputField
                value={payLoad.lastName}
                setValue={setPayLoad}
                nameKey='Họ'
              />
            </div>
          }
          <InputField
            value={payLoad.email}
            setValue={setPayLoad}
            nameKey='Email'
            type='mail'
          />
          <InputField
            value={payLoad.password}
            setValue={setPayLoad}
            nameKey='Mật khẩu'
            type='password'
          />
          <Button 
            name={isRegister ? 'Đăng ký' : 'Đăng nhập'}
            handleOnClick={handlleSubmit}
            fw
          />
          <div className='flex flex-row items-center justify-between my-2 w-full text-sm'>
            {!isRegister && <span className='text-blue-500 hover:underline cursor-pointer'>Quên mật khẩu?</span>}
            {!isRegister && <span 
              className='text-blue-500 hover:underline cursor-pointer' onClick={() => setIsRegister(true)}
              >Đăng ký</span>}
            {isRegister && <span 
              className='text-blue-500 hover:underline cursor-pointer w-full text-center' onClick={() => setIsRegister(false)}
              >Go login</span>}
          </div>
        </div>
      </div>
    
  )
}

export default Login