import React from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import './cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { decreaseCartQty, increaseCartQty, removeItemFromCart } from '../../slices/cartSlice'
const Cart = () => {
    const {items}=useSelector(state=> state.cartState)
const dispatch=useDispatch()
const navigate=useNavigate()

const checkoutHandle=()=>{
    navigate('/login?redirects=shipping')
}

  return (
    <div className='cart_home ch'>
   
     {
      !items.length?<h3>You have No Cart Items</h3>:
   
   
    <div className='cart_pro'>
        <div className='cart_items cl'>
        {items.map(item=>(
        
            <div className="cart_left cl clc">
            <img src={item.image} alt="cart_product_img" className='cart_img'/>
            <div className="about">
                <Link to={`/product/${item.product}`} className='about'>
                    <p className='pn'>
                        {item.name}
                    </p>
                    </Link>
            </div>
            <strong>RS: {item.price}</strong>
            <div className="count_cart cc">
                    <button className='decBtn_cart' onClick={()=>dispatch(decreaseCartQty(item.product))}>-</button>
                    <input className='quantity_cart' readOnly value={item.quantity}/>
                    <button className='incBtn_cart'onClick={()=>dispatch(increaseCartQty(item.product))} >+</button>
                    
            </div>
            
            <button className='del_btn' onClick={()=>dispatch(removeItemFromCart(item.product))}><AiOutlineDelete/></button>
            </div>
         
        ))}
           </div>

        <div className="cart_right">
          <h2>Order Summary</h2>
          <div className="details">
            <div className="quantity">
                <p>Quantity</p>
                <p>{items.reduce((acc,item)=>(acc+item.quantity),0)}(unit)</p>
            </div>
            <div className="total">
                <p>Ext.price</p>
                <p>RS: {items.reduce((acc,item)=>(acc+item.quantity*item.price),0)}</p>
            </div>
          </div>
          <button className='checkout_btn' onClick={checkoutHandle}>Checkout</button>
        </div>
        
      
    </div>
}
     </div>
  )
}

export default Cart