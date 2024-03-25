import React, { useEffect } from 'react'
import './final.css'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ValidateAddress } from '../address/Address'
import Checkouts from '../checkouts/Checkouts'
const Finall = () => {

  const navigate=useNavigate()
  const {user}=useSelector(state=> state.authState)
  const {items,shippingInfo}=useSelector(state=> state.cartState)

  const processPayment=()=>{
    const data={
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    }
    sessionStorage.setItem('orderPriceInfo',JSON.stringify(data))
    navigate('/payment')
  }

  useEffect(()=>{
    ValidateAddress(shippingInfo,navigate)
  },[])

const itemsPrice=parseInt(items.reduce((acc,item)=>(acc+item.price*item.quantity),0))
const AllQuantity=items.reduce((acc,item)=>(acc+item.quantity),0)
const shippingPrice=parseInt(itemsPrice>500?0:40)
const taxPrice=parseInt(Number(0.05*itemsPrice).toFixed(2))
const totalPrice=Number(itemsPrice+shippingPrice+taxPrice).toFixed(2)

  return (
    <>
    <Checkouts shipping confirm/>
    
   
    <div className='finall'>
        <div className='fin_dtl'>
        <div className="finn_addr">
            <p>name: {user.name}</p>
            <p className='wrap'>address: {shippingInfo.address}</p>
            <p>email: {user.email}</p>
            <p>phone: {shippingInfo.phoneNo}</p>
            <button  className="fin_submit" onClick={processPayment}>Place Order</button>
        </div>
        <div className="finn_pro_detail">
          <p className='fin_info'>Product Pricing Details</p>
          <p className='finn_ttl'>Total Product(quantity):{AllQuantity} </p>
          <p className='finn_ttl'>Item price: {itemsPrice}</p>
          <p className='finn_ttl'>Tax price: {taxPrice}</p>
          <p className='finn_ttl'>Shipping price: {shippingPrice}</p>
          <p className='finn_ttl'>Total price: {totalPrice}</p>
        </div>
        
        </div>
       
    
  
   {
    !items.length?<h3>You have No Cart Items</h3>:
 
 
  <div className='cart_pro brd'>
      <div className='cart_items pro_cnf'>
      {items.map(item=>(
      
          <div className="cart_left ">
          <img src={item.image} alt="cart_product_img" className='cart_img'/>
          <div className="about ">
              <Link to={`/product/${item.product}`} className='linkk_rmv'>
                  <p>
                      {item.name}
                  </p>
                  </Link>
          </div>
          <strong>RS: {item.price}</strong>
          </div>
       
      ))}
     </div>
    </div>
}
    </div>
    </>
  )
}

export default Finall