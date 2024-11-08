import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Public, Login, Home, Product, DeatailProduct } from './pages/public';
import path from './utils/path';
import { getCategories } from './store/asyncActions'
import { useDispatch } from 'react-redux'

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
          <Route path = {path.DEATAIL_PRODUCT} element={<DeatailProduct />} />
        </Route>
        <Route path = {path.LOGIN} element={<Login />} />
     </Routes>
    </div>
  );
}

export default App;
