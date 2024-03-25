import React, { useEffect, useState } from 'react'
import './productBySearch.css'

import s1 from '../assets/s1.jpg'
import s2 from '../assets/s2.jpg'
import s3 from '../assets/s3.jpg'
import s4 from '../assets/s4.jpg'
import s5 from '../assets/s5.jpg'
import s6 from '../assets/s6.jpg'
import Page from 'react-js-pagination'
import {Pagination} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useSelector } from 'react-redux'
import '../product/product.css'
import { useDispatch } from 'react-redux'
import { getProducts } from '../../action/productsAction'
import Loader from '../loader/Loader'
import Product from '../product/Product'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom'




const ProductBySearch = () => {
  
  const dispatch=useDispatch()
  const{products,productCount,resPerPage,loading}=useSelector((state)=>state.productsState)
const[currentPage,setCurrentPage]=useState(1)
console.log(currentPage)
const setCurrentPageNo=(pageNo)=>{
  setCurrentPage(pageNo)
}
const{keyword}=useParams()
//second page load agala!!!!!



//search sariya vela seyyala
  useEffect(()=>{
    dispatch(getProducts(keyword,currentPage))
  },[dispatch,keyword,currentPage])

  return (
    <div className='home'>
       
    
        
   <>
      {loading?<Loader/>:
        <div className="pro">
            {products && products.map((product)=>(
              <Product
              key={product._id}
              product={product}
              />
            ))}
        </div>}
   </>
   {productCount > 0 && productCount >=resPerPage?
      <div className="pagination">
        
       
        <Page
           activePage={currentPage}
           onChange={setCurrentPageNo}
           totalItemsCount={productCount}
           itemsCountPerPage={resPerPage}
           firstPageText={'First'}
           nextPageText={'Next'}
           lastPageText={'Last'}
           itemClass={'page-item'}
           linkClass={'page-link'}
        />
      </div> :null
}
    </div>
  )
}

export default ProductBySearch
