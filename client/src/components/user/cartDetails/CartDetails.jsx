import React, { useEffect, useState } from 'react'
import './productDetail.css'
import { useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import { getProduct } from '../../action/productAction'
import { useSelector } from 'react-redux'
import Loader from '../loader/Loader'
import {Carousel, CarouselItem} from 'react-bootstrap'
import Metadata from '../Metadata'

const ProductDetail = () => {
    const{id}=useParams()
   
    const dispatch=useDispatch()
    const[quantity,setQuantity]=useState(1)
    const{productt,loading}=useSelector((state)=>state.productState)


  return (
    <div className='productDetail'>
     
      {loading?<Loader/>:
    <div className="det_product">
     <div className="det_Imgs">
      <Carousel pause="hover">
        {productt.images&& productt.images.map (image=>
          <CarouselItem key={image._id}>
             <img src={image.image} alt={productt.name} className='det_Img'/>
          </CarouselItem>
          )}

      </Carousel>

     </div>
   
    <div className="prodInfo">
    <Metadata title={productt.name}/>
        <h2>{productt.name}</h2>
        <p>
          <small>product id_{productt._id}</small>
        </p>
          
          <p className="pro_price">
            <div className='rs'>
              <h3>Rs: </h3>
              <strong>{productt.price}</strong>
            </div>
          </p>
         
          <div >
              <div className="rating-outer">
                <div className="rating-inner" style={{width:`${productt.rating/5*100}%`}}></div>
                <span id='no_of_reviews'>({productt.noOfReviews} reviews)</span>
              </div>
            </div> 
          
           <div className="count">
            <button className='decBtn' onClick={decrease}>-</button>
            <input className='quantity'  readOnly value={quantity}/>
            <button className='incBtn' onClick={increase}>+</button>
            <button className='cartBtn' disabled={productt.stock?false:true}>Add To Cart</button>
           </div>
            
            <p >STATUS:<span className={productt.stock>0?'green':'red'}> {productt.stock>0?productt.stock:'Out Of'} Stock Available</span> </p>
         
          <div className="description">
            <h2>Description:</h2>
            <p>
            {productt.description}
          </p>
          </div>
          <p>Product Sold By: <strong>{productt.seller}</strong></p>
          <div className="buy">
          <button className='det_pro_btn'>Buy Now</button>
          </div>

    </div>
</div>
}
</div>
  )
}

export default ProductDetail
