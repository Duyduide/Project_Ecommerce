import React, { useState, useCallback } from 'react'
import { InputField, Button } from '../../components'
import { apiRegister, apiLogin } from '../../apis/user'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import { register } from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [payLoad, setPayLoad] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: ''
  })
  
  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => {   
    setPayLoad({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: '' 
    })
  } 
  const handleSubmit = useCallback(async () => {
    const {firstname, lastname, mobile, ...data} = payLoad;
    if(isRegister) {
      const response = await apiRegister(payLoad);
      if(response.success) {
        Swal.fire('Tạo tài khoản thành công' , response.mes,'success').then(() => { 
          setIsRegister(false);
          resetPayload();
         })
      }
      else {
        Swal.fire('Tạo tài khoản thất bại' , response.mes,'error')
      }
    }
    else {
      const response = await apiLogin(payLoad);
      console.log(response)
      if(response.success) {
        dispatch(register({
          isLoggedIn: true,
          token: response.accessToken,
          userData: response.userData
        }))
        Navigate(`/${path.HOME}`);
      }
      else {
        Swal.fire('Đăng nhập thất bại' , response.mes,'error');
      }
    }
  }, [payLoad, isRegister])

  return (
    <div className='absolute top-1/2 bottom-1/2 left-1/2 right-1/2 items-center justify-center flex'>
        <div className='p-8 bg-white rounded-md min-w-[500px]  shadow-2xl border-cyan-800'>
          <h1 className='text-[28px] font-semibold flex flex-col items-center mb-8'>{isRegister? 'Đăng ký' : 'Đăng nhập'}</h1>
          {isRegister && <div className='flex items-center gap-2'>
              <InputField
                value={payLoad.lastname}
                setValue={setPayLoad}
                nameKey='lastname'
              />
              <InputField
                value={payLoad.firstname}
                setValue={setPayLoad}
                nameKey='firstname'
              />
            </div>
          }
          <InputField
            value={payLoad.email}
            setValue={setPayLoad}
            nameKey='email'
            type='mail'
          />
          {isRegister && 
            <InputField
              value={payLoad.mobile}
              setValue={setPayLoad}
              nameKey='mobile'
            />
          }
          <InputField
            value={payLoad.password}
            setValue={setPayLoad}
            nameKey='password'
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