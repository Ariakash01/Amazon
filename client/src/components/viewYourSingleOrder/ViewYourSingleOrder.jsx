import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getSingleOrder } from '../../action/ordersAction'
import './viewYourSingleOrder.css'


const ViewYourSingleOrder = () => {

  const {orderDetail,loading}=useSelector(state=> state.orderedState)
  const{shippingInfo={},user={},
  orderStatus="processing",orderItems=[],
  totalPrice=0,}=orderDetail//paymentInfo={} kudukkanu
  //const paid=paymentInfo && paymentInfo.status==="succedded"?true:false
  const dispatch=useDispatch()
  const {id}=useParams()


  useEffect(()=>{
dispatch(getSingleOrder(id))
  },[id])
  return (
    <><>
   
    <div className='final'>
      <div>
    <h3>Order ID: {orderDetail._id}</h3>
        <div className='fin_dtl'>
        <div className="fin_addr">
            <p>name: {user.name}</p>
            <p className='wrap'>address: {shippingInfo.address},{shippingInfo.city},
            ,{shippingInfo.state},{shippingInfo.country}</p>
            <p>email: {user.email}</p>
            <p>phone: {shippingInfo.phoneNo}</p>
            <p>Amount: {totalPrice}</p>
        </div>
        <div className="fin_pro_detail">
          <h4 className='fin_info'>Payment Details</h4>
          <p className='fin_ttl'>PAID</p>
          <p className={orderStatus&&orderStatus.includes('delivered')?'greencolor':'redcolor' }>{orderStatus}</p>
          <p className='fin_ttl'>Order Items:</p>
       
        </div>
        </div>
        <div className='cart_pro'>
      <div className='cart_items'>
      {orderItems.map(item=>(
      
          <div className="cart_left">
          <img src={item.image} alt="cart_product_img" className='cart_img'/>
          <div className="about">
              <Link to={`/product/${item.product}`}>
                  <p>
                      {item.name}
                  </p>
                  </Link>
          </div>
          <strong>RS: {item.price}</strong>
          <div>
        <p>{item.quantity} piece(s)</p>
       </div>
          </div>
      
      ))}
     </div>
    </div>
       
        {
          //inga
        }

    </div>
    </div>
    </>
    </>
  )
}

export default ViewYourSingleOrder