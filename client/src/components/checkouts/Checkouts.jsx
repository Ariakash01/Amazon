import React from 'react'
import './checkouts.css'
import { Link } from 'react-router-dom'

const Checkouts = ({shipping,confirm,payment}) => {
  return (
    <div className="steps">
        {shipping?
         <Link to={'/shipping'} className='circle complete li_rmv'>
            
         <p>Shipping</p>
 
      </Link>
            :
            <Link to={'/shipping'} className='circle li_rmv'>
            
                <p>Shipping</p>
        
             </Link>

}

<>
        {confirm?
         <Link to={'/order/confirm'} className='circle complete li_rmv'>
            
         <p>Confirm</p>
 
      </Link>
            :
            <Link to={'/order/confirm'} className='circle li_rmv'>
            
                <p>Confirm</p>
        
             </Link>

}
</>
<>
        {payment?
         <Link to={'/payment'} className='circle complete li_rmv'>
            
         <p>Payment</p>
 
      </Link>
            :
            <Link to={'/payment'} className='circle li_rmv'>
            
                <p>Payment</p>
        
             </Link>

}
         
</>
   </div>
  )
}

export default Checkouts