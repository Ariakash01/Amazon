import React, { useState } from 'react'
import './address.css'
import {countries} from 'countries-list'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { shippingInfoDetails } from '../../slices/cartSlice'
import Checkouts from '../checkouts/Checkouts'
import {toast} from 'react-toastify'

export const ValidateAddress=(shippingInfo,navigate)=>{
  
  if(
    !shippingInfo.address||
    !shippingInfo.city||
    !shippingInfo.phoneNo||
    !shippingInfo.country||
    !shippingInfo.postalCode
  ){
    toast.error('please fill all the field')
    navigate('/shipping')
  }
}

const Address = () => {

  const {shippingInfo={},items:items}=useSelector(state=> state.cartState)

  const [city,setCity]=useState(shippingInfo.city)
  const [state,setState]=useState(shippingInfo.state)

  const [address,setAddress]=useState(shippingInfo.address)
  const [phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo)
  const [postalCode,setPostalCode]=useState(shippingInfo.postalCode)
  const [country,setCountry]=useState(shippingInfo.country)
const countryList=Object.values(countries)
const dispatch= useDispatch()
const navigate=useNavigate()


const itemsPrice=parseInt(items.reduce((acc,item)=>(acc+item.price*item.quantity),0))
const AllQuantity=items.reduce((acc,item)=>(acc+item.quantity),0)
const shippingPrice=parseInt(itemsPrice>500?0:40)
const taxPrice=parseInt(Number(0.05*itemsPrice).toFixed(2))
const totalPrice=Number(itemsPrice+shippingPrice+taxPrice).toFixed(2)


const addressHandle=(e)=>{
  e.preventDefault()
dispatch(shippingInfoDetails({city,address,phoneNo,postalCode,country,state}))
navigate('/order/confirm')
}
 
  return (
    <>
    <Checkouts
    shipping
    />
    <div className="mainn_addr addr_home">
       <form onSubmit={addressHandle} className="formm_addr">
         <div className="addr">
          <p>Confirm Your Address To Continue</p>
          
       <div className='inp inp2'>
          <label htmlFor="addr">Address:</label>
          <input name="addr" 
          required
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
        />
        </div>
        <div className='inp inp1'>
          <label htmlFor="city">City:</label>
          <input type="text" 
          required
          name="city"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          />
        </div>
        <div className='inp inp1'>
          <label htmlFor="city">State:</label>
          <input type="text" 
          required
          name="city"
          value={state}
          onChange={(e)=>setState(e.target.value)}
          />
        </div>
        <div className='inp inp3'>
          <label htmlFor="email">Postal Code:</label>
          <input type="text" name="email"
          required
          value={postalCode}
          onChange={(e)=>setPostalCode(e.target.value)}
          />
         </div>
         <div className='inp '>
          <label htmlFor="num">Phone:</label>
          <input type="phone" name="num"
          required
          value={phoneNo}
          onChange={(e)=>setPhoneNo(e.target.value)}
          />
         </div>
         <div className='inp inp4'>
          <label htmlFor="country">Country:</label>
          <select className='country'
          required
          value={country}
          onChange={(e)=>setCountry(e.target.value)}>
            {countryList.map(country=>(<option value={country.name}>{country.name}</option>))}
            
          </select>
         </div>
         <button type="submit" className="submit">continue</button>
        </div>
        
        </form>
        <div className="proo_detail">
          <h3 className='info'>Product Pricing Details</h3>
          <p className='fin_ttl'>Total Product(quantity):{AllQuantity} </p>
          <p className='fin_ttl'>Item price: {itemsPrice}</p>
          <p className='fin_ttl'>Tax price: {taxPrice}</p>
          <p className='fin_ttl'>Shipping price: {shippingPrice}</p>
          <p className='fin_ttl'>Total price: {totalPrice}</p>
        </div>
    </div>
    </>
  )
}
export default Address