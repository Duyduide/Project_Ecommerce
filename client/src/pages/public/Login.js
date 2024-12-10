import React, { useState, useCallback, useEffect } from 'react'
import { InputField, Button } from 'components'
import { apiRegister, apiLogin, apiForgotPassword, apiFinalRegister, apiGetCredentialsFromAccessToken, apiLoginWithGoogle } from 'apis/user'
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom'
import path from 'utils/path'
import { login } from 'store/user/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { validate } from 'utils/helper'
import { useGoogleLogin } from '@react-oauth/google'

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
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false)
  const [invalidFields, setInvalidFields] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const resetPayload = () => {   
    setPayLoad({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: '' 
    })
  } 
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const handleForgotPassword = async () => { 
    const response = await apiForgotPassword({email});
    if(response.success) {
      toast.success(response.mes);
    }
    else {
      toast.info(response.mes);
    }
  }
  useEffect(() => { 
    resetPayload();
  }, [isRegister])
  const handleSigninGoogle = useGoogleLogin({
    onSuccess: async(tokenResponse) => {
      const response = await apiGetCredentialsFromAccessToken(tokenResponse.access_token);
      if(response) {
      const googleLoginResponse = await apiLoginWithGoogle(response);
        if(googleLoginResponse) {
          dispatch(login({
            isLoggedIn: true,
            token: googleLoginResponse.accessToken,
            current: googleLoginResponse.userData
          }));
          toast.success('Đăng nhập thành công!');
          // Redirect to home page
          Navigate(`/${path.HOME}`);
        }
        else {
          toast.error(googleLoginResponse.mes || 'Đăng nhập thất bại');
        }
      }
    },
    onFailure: error => (console.log(error)),
  }
)
  
  const handleSubmit = useCallback(async () => {
    const {firstname, lastname, mobile, ...data} = payLoad;
    const invalids = isRegister ? validate(payLoad, setInvalidFields) : validate(data, setInvalidFields);
    if(invalids === 0) {
      if(isRegister) {
        const response = await apiRegister(payLoad);       
        if(response.success) {
          setIsVerifiedEmail(true)
        }
        else {
          Swal.fire('Tạo tài khoản thất bại' , response.mes,'error')
        }
      }
      else {
        const response = await apiLogin(data);
        if(response.success) {
          dispatch(login({
            isLoggedIn: true,
            token: response.accessToken,
            current: response.userData
          }))
          Navigate(`/${path.HOME}`);
        }
        else {
          Swal.fire('Đăng nhập thất bại' , response.mes, 'error');
        }
      }
    }
  }, [payLoad, isRegister])
  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if(response.success) {
      Swal.fire('Chúc mừng', response.mes, 'success').then(() => { 
        setIsRegister(false);
        resetPayload();
      })
    }
    else {
      Swal.fire('Oops!', response.mes, 'error')
    }
    setIsVerifiedEmail(false);
    setToken('');
  }
  return (
    <div className='relative w-screen h-screen'>
      {isVerifiedEmail && 
        <div className='absolute top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center bg-overlay'>
          <div className='bg-white w-[500px] rounded-md p-8'>
            <h4>Chúng tôi đã gửi mã xác thực tài khoản qua email của bạn. Vui lòng kiểm tra email và nhập mã: </h4>
            <input 
              value={token}
              onChange={e => setToken(e.target.value)}
              className='p-2 border-2 rounded-md outline-none'
            />
            <button 
              type='button'
              className='px-4 py-2 ml-4 font-semibold text-white bg-blue-500 rounded-md'
              onClick={finalRegister}
            > 
              Xác nhận
            </button>
          </div>
        </div>
      }
      {isForgotPassword && 
        <div className='absolute top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center py-8 bg-white'>
          <div className='flex flex-col gap-4'>
              <label htmlFor='email'>Vui lòng nhập email:</label>
              <input 
                id='email'
                className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
                placeholder='VD: email@gmail.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <div className='flex items-center justify-end w-full gap-4'>
                <Button 
                  name='Trở về'
                  handleOnClick={() => setIsForgotPassword(false)}
                  style='px-4 py-2 rounded-md text-white bg-main my-2 text-semibold'
                />
                <Button 
                  name='Gửi mã '
                  handleOnClick={handleForgotPassword}
                />
              </div>
          </div>
        </div>
      }
      <div className='absolute flex items-center justify-center top-1/2 bottom-1/2 left-1/2 right-1/2'>
        <div className='p-8 bg-white rounded-md min-w-[500px]  shadow-2xl border border-cyan-800'>
          <h1 className='text-[28px] font-semibold flex flex-col items-center mb-8'>{isRegister? 'Đăng ký' : 'Đăng nhập'}</h1>
          {isRegister && <div className='flex flex-col gap-2'>
            <InputField
                value={payLoad.firstname}
                setValue={setPayLoad}
                nameKey='firstname'
                placeholder='Tên'
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputField
                value={payLoad.lastname}
                setValue={setPayLoad}
                nameKey='lastname'
                placeholder='Họ'
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
          }
          <InputField
            value={payLoad.email}
            setValue={setPayLoad}
            nameKey='email'
            placeholder='Email'
            type='mail'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          {isRegister && 
            <InputField
              value={payLoad.mobile}
              setValue={setPayLoad}
              nameKey='mobile'
              placeholder='Số điện thoại'
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          }
          <InputField
            value={payLoad.password}
            setValue={setPayLoad}
            nameKey='password'
            type='password'
            placeholder='Mật khẩu'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />

          <Button 
            name={isRegister ? 'Đăng ký' : 'Đăng nhập'}
            handleOnClick={handleSubmit}
            fw
          />
          <div className="flex items-center my-4">
            <div className="flex-grow border border-t border-gray-300"></div>
            <span className="mx-4 font-semibold text-gray-500">
              hoặc
            </span>
            <div className="flex-grow border border-t border-gray-300"></div>
          </div>
          <button
            className="flex items-center justify-center w-full px-4 py-2 mb-4 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
            onClick={handleSigninGoogle}
          >
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' alt='Google' className="w-5 h-5 mr-2" />
            Đăng nhập bằng Google
          </button>
          <div className='flex flex-row items-center justify-between w-full my-2 text-sm'>
            {!isRegister && <span onClick={() => setIsForgotPassword(true)} className='text-blue-500 cursor-pointer hover:underline'>Quên mật khẩu?</span>}
            {!isRegister && <span 
              className='text-blue-500 cursor-pointer hover:underline' onClick={() => setIsRegister(true)}
              >Đăng ký tài khoản</span>}
            {isRegister && <span 
              className='w-full text-center text-blue-500 cursor-pointer hover:underline' 
              onClick={() => setIsRegister(false)}
              >Đăng nhập ngay</span>}
          </div>
          <Link className='flex flex-col items-center text-sm text-blue-500 cursor-pointer hover:underline' to={`/${path.HOME}`}>Trở về trang chủ</Link>
        </div>
      </div>
    </div>
  )
}

export default Login