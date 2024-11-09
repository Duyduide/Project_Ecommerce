//import { CloudSnow, Divide } from 'lucide-react'
import React, { useState, useCallback } from 'react'
import { InputField, Button } from '../../components'
import { apiRegister } from '../../apis/user'

const Login = () => {

  const [payLoad, setPayLoad] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  })
  
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = useCallback( async () => {
    const {firstname, lastname, ...data} = payLoad;
    if(isRegister) {
      const response = await apiRegister(payLoad);
      console.log(response);
    }
    else {
      console.log(data);
    }
    console.log(payLoad);
  }, [payLoad])

  return (
    <div className='absolute top-1/2 bottom-1/2 left-1/2 right-1/2 items-center justify-center flex'>
        <div className='p-8 bg-white rounded-md min-w-[500px]  shadow-2xl border-cyan-800'>
          <h1 className='text-[28px] font-semibold flex flex-col items-center mb-8'>{isRegister? 'Đăng ký' : 'Đăng nhập'}</h1>
          {isRegister && <div className='flex items-center gap-2'>
              <InputField
                value={payLoad.lastname}
                setValue={setPayLoad}
                nameKey='Họ'
              />
              <InputField
                value={payLoad.firstname}
                setValue={setPayLoad}
                nameKey='Tên'
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
            handleOnClick={handleSubmit}
            fw
          />

          <div className='flex flex-row items-center justify-between my-2 w-full text-sm'>
            {!isRegister && <span className='text-blue-500 hover:underline cursor-pointer'>Quên mật khẩu?</span>}
            {!isRegister && <span 
              className='text-blue-500 hover:underline cursor-pointer' onClick={() => setIsRegister(true)}
              >Đăng ký tài khoản</span>}
            {isRegister && <span 
              className='text-blue-500 hover:underline cursor-pointer w-full text-center' 
              onClick={() => setIsRegister(false)}
              >Đăng nhập ngay</span>}
          </div>
        </div>
      </div>
  )
}

export default Login