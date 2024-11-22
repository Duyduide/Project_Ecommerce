import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Public, Login, Home, Product, DetailProduct, FinalRegister, ResetPassword, DetailCart } from './pages/public';
import { CheckOut } from './pages/member';
import path from './utils/path';
import { getCategories } from './store/app/asyncActions'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className="min-h-screen font-main">
     <Routes>
        <Route path = {path.PUBLIC} element={<Public />} >
          <Route path = {path.HOME} element={<Home />} />
          <Route path = {path.PRODUCT} element={<Product />} />
          <Route path = {path.DETAIL_PRODUCT} element={<DetailProduct />} />
          <Route path = {path.DETAIL_CART} element={<DetailCart />} />
          {/* <Route path = {path.DETAIL_CART} element={<DetailCart />} /> */}
          <Route path = {path.CHECKOUT} element={<CheckOut />} />
        </Route>
        <Route path = {path.LOGIN} element={<Login />} />
        <Route path = {path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path = {path.RESET_PASSWORD} element={<ResetPassword/>} />
     </Routes>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
