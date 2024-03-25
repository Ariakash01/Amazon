import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getcart } from '../../action/cartAction'
import { toast } from 'react-toastify'

const Product = ({product}) => {
  const dispatch=useDispatch()
  const {authorize,user}=useSelector(state=> state.authState)
  const Please_login=()=>{
    toast('Please Login..!!',{
      type:'error',
      position:toast.POSITION.BOTTOM_CENTER
    })
  }
  
  return (

    <div className="product">
      
    <div className="proinfo">
    <Link to={`/product/${product._id}`}>

      <img src={product.images[0].image} alt="product" className='pro_Img'/>


        </Link>
        <p>{product.name}</p>
         
          <p className="pro_price">
              <small>Rs.</small>
              <strong>{product.price}</strong>
          </p>
            <div >
              <div className="rating-outer">
                <div className="rating-inner" style={{width:`${product.rating/50*100}%`}}></div>
                <span id='no_of_reviews'>({product.noOfReviews} reviews)</span>
              </div>
            </div> 
    </div>
    <div className="btn_main">
      {authorize ?
    <button className=' pro_btn bdr_rmv' 
            onClick={()=>dispatch(getcart(product._id,1))}
            >Add To Cart</button>:

            <button className=' pro_btn bdr_rmv' 
            
            onClick={Please_login}
            >Add To Cart</button>
      }
    <Link to={`/product/${product._id}`}>
    <button className='pro_btn bdr_rmv'>View Details</button>
   
    </Link>
    </div>
</div>
  )
}

export default Product