import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {HelmetProvider} from "react-helmet-async"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/productDetails/ProductDetail';
import ProductBySearch from './components/productBySearch/ProductBySearch';
import Login from './components/user/login/Login';
import Register from './components/user/register/Register';
import ChangePassword from './components/user/changePassword/ChangePassword';
import { getLoad } from './action/authAction';
import  store from './store'
import ProfileCard from './components/profilecard/ProfileCard';
import ProductedRoute from './components/productedRoute/ProductedRoute';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import ForgotPassword from './components/user/forgotPassword/ForgotPassword';
import ResetPassword from './components/user/resetPassword/ResetPassword';
import Cart from './components/cart/Cart';
import Address from './components/address/Address';
import Finall from './components/confirmOrder/Finall';
import axios from 'axios'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Payment from './components/payment/Payment';
import Ordersuccess from './components/orderSuccess/Ordersuccess';
import MyOrders from './components/myOrders/MyOrders';
import ViewYourSingleOrder from './components/viewYourSingleOrder/ViewYourSingleOrder';

function App(){
const[stripeApiKey,setStripeApiKey]=useState("")
  useEffect(()=>{

    //these are another method to dispatchthe function to slice
    store.dispatch(getLoad)

    //get the stripe key from backend ENV file
    async function getStripeApiKey(){
      const{data}=await axios.get('/api/v2/payment/stripe')
setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])

  return (
    <BrowserRouter>
      <div className="App">
        <HelmetProvider>
          <ToastContainer/>
          <Routes>
            <Route path='/' element={<><Header/><Home/></>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/search/:keyword' element={<><Header/><ProductBySearch/></>}/>
            <Route path='/product/:id' element={<><Header/><ProductDetail/></>}/>
            <Route path='/myprofile' element={<ProductedRoute><><Header/><ProfileCard/></></ProductedRoute>}/>
            <Route path='/myprofile/update' element={<ProductedRoute><><Header/><UpdateProfile/></></ProductedRoute>}/>
            <Route path='/myprofile/password/change' element={<ProductedRoute><><Header/><ChangePassword/></></ProductedRoute>}/>
            <Route path='/password/forgot' element={<ForgotPassword/>}/>
            <Route path='/password/reset/:token' element={<ResetPassword/>}/>
            <Route path='/cart' element={<><Header/><Cart/></>}/>
            <Route path='/shipping' element={<><Header/><Address/></>}/>
            <Route path='/order/confirm' element={<><Header/><Finall/></>}/>
            {
            stripeApiKey &&
            <Route path='/payment' element={<ProductedRoute><><Elements stripe={loadStripe(stripeApiKey)}><Header/><Payment /></Elements></></ProductedRoute>}/>
            
            }
             <Route path='/orders' element={<ProductedRoute><><Header/><Ordersuccess/></></ProductedRoute>}/>
             <Route path='/user/orders' element={<ProductedRoute><><Header/><MyOrders/></></ProductedRoute>}/>
             <Route path='/order/:id' element={<ProductedRoute><><Header/><ViewYourSingleOrder/></></ProductedRoute>}/>
          </Routes>
         
          

{
  //   3:11:30
}


{

  // IMG la epdi load agudhunu learn pannanu !!!

}

        </HelmetProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
