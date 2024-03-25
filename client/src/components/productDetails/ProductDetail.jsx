import React, { useEffect, useState } from 'react'
import './productDetail.css'

import { useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import { getProduct, postReview } from '../../action/productAction'
import { useSelector } from 'react-redux'
import Loader from '../loader/Loader'
import {Carousel, CarouselItem} from 'react-bootstrap'
import Metadata from '../Metadata'
import { getcart } from '../../action/cartAction'
import {Modal} from 'react-bootstrap'
import { clearError, clearProduct, clearReview } from '../../slices/productSlice'
import { toast } from 'react-toastify'
import ProductReview from '../productReview/ProductReview'
const ProductDetail = () => {

  const {authorize,user}=useSelector(state=> state.authState)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[rating,setRating]=useState(0)
const[comment,setComment]=useState("")
    const{id}=useParams()
    
    const dispatch=useDispatch()
    const[quantity,setQuantity]=useState(1)
    

    const{productt={},loading,isReview,error,noOfReviews}=useSelector((state)=>state.productState)

const increase=()=>{
   const quantity=document.querySelector('.quantity')
   if(productt.stock ===0 || parseInt(quantity.value)>=productt.stock) {
    return
   }
   const qty=parseInt(quantity.value)+1
   setQuantity(qty)
}

const decrease=()=>{
  const quantity=document.querySelector('.quantity')
  if(parseInt(quantity.value)===1) {
   return
  }
  const qty=parseInt(quantity.value)-1
  setQuantity(qty)
}

    useEffect(()=>{
    
      if(isReview){
        handleClose()
        
          toast('Review Submit',{
          position:toast.POSITION.TOP_CENTER,
          type:'success',
          onOpen:()=>{
              dispatch(clearReview())
          }
          })
           
      }
      if(error){
          toast(error,{
          position:toast.POSITION.TOP_CENTER,
          type:'error',
          onOpen:()=>{
              dispatch(clearError())
          }
          })
          return  
      }

      if(!productt._id||isReview){
    dispatch(getProduct(id))
      }
return ()=>{
  dispatch(clearProduct())
}
    },[ dispatch,id,isReview,error])

const reviewHandler=()=>{
  const formdata=new FormData()
  formdata.append('rating',rating)
  formdata.append('comment',comment)
  formdata.append('productId',id)
  dispatch(postReview(formdata))
}

const Please_login=()=>{
  toast('Please Login..!!',{
    type:'error',
    position:toast.POSITION.BOTTOM_CENTER
  })
}

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
              <h3>Rs:</h3>
              <strong>{productt.price}</strong>
            </div>
          </p>
         
          <div >
              <div className="rating-outer">
                <div className="rating-inner" style={{width:`${productt.rating/50*100}%`}}></div>
                <span id='no_of_reviews'>({productt.noOfReviews} reviews)</span>
              </div>
            </div> 
          
           <div className="count">
         
            <button readOnly className='decBtn' onClick={decrease}>-</button>
            <p className='quantity'  readOnly >{quantity}</p>
            <button readOnly className='incBtn' onClick={increase}>+</button>
            {authorize ?
            <button className='cartBtn  bdr_rmv' disabled={productt.stock?false:true}
            onClick={()=>dispatch(getcart(productt._id,quantity))}
            >Add To Cart</button> :
            
            <button className='cartBtn bdr_rmv' 
            
            onClick={Please_login}
            >Add To Cart</button>

            }
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
            {user?
          <button className='det_pro_btn' onClick={handleShow}>Review</button>:
          <div className="alert alert-danger"> please login to review</div>
            }
          </div>
          <div className="row mt-2 mb-5">
            <div className="rating w-50">
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul className="stars">
          {
            [1,2,3,4,5].map(star=>(
<li 
value={star}
onClick={()=>setRating(star)}
className={`star ${star<=rating?'orange':''}`}
onMouseOver={(e)=>e.target.classList.add('yellow')}
onMouseOut={(e)=>e.target.classList.remove('yellow')}
><i className="fa fa-star"></i></li>
            ))
          }
          
        </ul>
        <textarea onChange={(e)=>setComment(e.target.value)} name="review" id="review"  className="form-control mt-3"></textarea>
        <button disabled={loading} onClick={reviewHandler} aria-label='close' className="btn my-3 float-right review-btn px-4 text-white">Submit</button>
        </Modal.Body>
      </Modal>
            </div>
          </div>
        
    </div>
    
</div>
}
{
            productt.reviews && productt.reviews.length>0?
            <ProductReview reviews={productt.reviews}/>:null
          }
</div>
  )
}

export default ProductDetail
