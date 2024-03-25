import React, { useEffect } from 'react'

import {CardCvcElement, CardExpiryElement, CardNumberElement,
   useElements, useStripe} from '@stripe/react-stripe-js'

import{useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { ValidateAddress } from '../address/Address'
import './payment.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { orderComplete } from '../../slices/cartSlice'
import Loader from '../loader/Loader'
import { authRequest } from '../../slices/authSlice'
import { clearOrderError } from '../../slices/ordersSlice'
import { getOrder } from '../../action/ordersAction'
const Payment = () => {

  const stripe=useStripe()
  const elements=useElements()
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const orderInfo=JSON.parse(sessionStorage.getItem('orderPriceInfo'))

  const {user}=useSelector(state=> state.authState)

  const {items:cartItems,shippingInfo}=useSelector(state=> state.cartState)
  const {error:orderError}=useSelector(state=> state.orderedState)

const paymentData={
 
  amount:Math.round(orderInfo.totalPrice*100),
  shipping:{
    name:user.name,
    address:{
    city:shippingInfo.city,
    postal_code:shippingInfo.postalCode,
    country:shippingInfo.country,
    state:shippingInfo.state,
    line1:shippingInfo.address
    
},
phone:shippingInfo.phoneNo
  
}
 
}

const order={
  orderItems:cartItems,
  shippingInfo
}

if(orderInfo){
  order.itemsPrice=orderInfo.itemsPrice
  order.shippingPrice=orderInfo.shippingPrice
  order.taxPrice=orderInfo.taxPrice
  order.totalPrice=orderInfo.totalPrice
}

useEffect(()=>{
  ValidateAddress(shippingInfo,navigate)
  if(orderError){
    toast(orderError,{
    position:toast.POSITION.TOP_CENTER,
    type:'error',
    onOpen:()=>{
        dispatch(clearOrderError())
    }
    })
    return
   }
},[])

const paymentHandle=async(e)=>{
  e.preventDefault()
  toast('Please Wait Some Time...',{
    type:'success',
    position:toast.POSITION.BOTTOM_CENTER
  })
  document.querySelector("#pay_btn").disabled=true
  try {
    const {data} =await axios.post('/api/v2/payment/process',paymentData)
    const clientSecret=data.client_secret
    const result=stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:elements.getElement(CardNumberElement),
        billing_details:{
          name:user.name,
          email:user.email
        }
      }
    })
    if(result.error){
      toast(result.error.message,{
        type:'error',
        position:toast.POSITION.BOTTOM_CENTER
      })
      document.querySelector("#pay_btn").disabled=false 
     
    }
    else{

      if((await result).paymentIntent.status==='succeeded'){
       
        
        toast('payment success !',{
          type:'success',
          position:toast.POSITION.BOTTOM_CENTER
        })
        
       //paymentInfo inga varum in PAYMENT MODELa   3:28:43
       dispatch(getOrder(order))
       dispatch(orderComplete())
      
        navigate('/')
       
      
        
      }
      else{
        toast('please try again',{
          type:'warning',
          position:toast.POSITION.BOTTOM_CENTER
        })
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}

  return (

    <div className="mai_addr">
      {
      orderInfo.totalPrice!==null ?(
    <form onSubmit={paymentHandle} className="form_addr">
      <div className="addrr">
       <h2>Payment Details</h2>
       
    <div className='inp inp2'>
       <label htmlFor="addr">Card No:</label>
       <CardNumberElement name="addr" className='input'
       required
     
     />
     </div>
     <div className='inp inp1'>
       <label htmlFor="city">Month:</label>
       <CardExpiryElement type="text" className='input'
       required
       name="city"
      
       />
     </div>
     <div className='inp inp1'>
       <label htmlFor="city">Cvc:</label>
       <CardCvcElement type="text" className='input'
       required
       name="city"
       
       />
     </div>
     <button type='submit' className='submit clr_ch' id='pay_btn'>Pay - {`$${orderInfo.totalPrice}`}</button>
     

     </div>
     </form>
      )


:<p>You Have No Cart To Buy</p>
}
     </div>

  )

}
export default Payment