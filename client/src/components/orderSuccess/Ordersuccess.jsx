import React from 'react'
import { Link } from 'react-router-dom'

const Ordersuccess = () => {
  return (
    <div className='success'>
        <p>order Success</p>
        <Link to={'/user/orders'}>
        <p>My Orders</p>
        </Link>
    </div>
  )
}

export default Ordersuccess