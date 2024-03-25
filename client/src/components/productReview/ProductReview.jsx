import React from 'react'
import './productreview.css'
const ProductReview = ({reviews}) => {
  return (
    <div className='reviews w-75'>
        <h2>Other's Reviews</h2>
            <hr/>
            {reviews && reviews.map(review=>(
        <div key={review._id} className="review-card my-3">
            <div className="rating-outer">
                <div className="rating-inner" style={{width:`${review.rating/5*100}%`}}></div>
            </div>
            <p className="review_user">{review.user.name}</p>
            <p className="user_comment">{review.comment}</p>
            <hr/>
        </div>
        ))}
    </div>
  )
}

export default ProductReview