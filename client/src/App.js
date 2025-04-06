import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Public, Login, Home, Product, DetailProduct, FinalRegister, ResetPassword, DetailCart, PaymentResult  } from './pages/public';
import { ManageOrders, ManageUsers, Dashboard, CreateProducts, ManageProducts, AdminLayout } from './pages/admin';
import { CheckOut, Personal, MemberLayout, OrderHistory, OrderHistoryDetail } from './pages/member';
import path from './utils/path';
import { ToastContainer } from 'react-toastify';
import SearchResult from './components/ProductName'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="relative font-main">
     <Routes>
        <Route path = {path.PUBLIC} element={<Public />} >
          <Route path = {path.HOME} element={<Home />} />
          <Route path = {path.PRODUCT} element={<Product />} />
          <Route path = {path.DETAIL_PRODUCT} element={<DetailProduct />} />
          <Route path = {path.DETAIL_CART} element={<DetailCart />} />
          <Route path = {path.CHECKOUT} element={<CheckOut />} />
          <Route path = {path.ALL} element={<Home/>} />
          <Route path = "/searchResult" element={<SearchResult />} />
        </Route>
        <Route path = {path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard/>} />
          <Route path={path.MANAGE_ORDERS} element={<ManageOrders/>} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts/>} />
          <Route path={path.MANAGE_USERS} element={<ManageUsers/>} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProducts/>} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />}/>
          <Route path={path.ORDER_HISTORY} element={<OrderHistory />}/>
          <Route path={path.ORDER_HISTORY_DETAIL} element={<OrderHistoryDetail />}/>
        </Route>
        <Route path = {path.LOGIN} element={<Login />} />
        <Route path = {path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path = {path.RESET_PASSWORD} element={<ResetPassword/>} />
        <Route path = {path.PAYMENT_RESULT} element={<PaymentResult />} />
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
