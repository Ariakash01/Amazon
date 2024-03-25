import React, { useEffect, useState } from 'react'
import './home.css'
import Metadata from '../Metadata'
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
import { orderComplete } from '../../slices/cartSlice'




const Home = () => {
    const {items,shippingInfo}=useSelector(state=> state.cartState)

  const {authorize,user}=useSelector(state=> state.authState)
  const dispatch=useDispatch()
  const{products,productCount,resPerPage,loading}=useSelector((state)=>state.productsState)
const[currentPage,setCurrentPage]=useState(1)
console.log(currentPage)
const setCurrentPageNo=(page)=>{
  setCurrentPage(page)
}
//second page load agala!!!!!
  useEffect(()=>{
  
 

    dispatch(getProducts(null,currentPage))
  },[dispatch,currentPage,authorize])

  return (
    <div className='home'>
        <Metadata title={`${currentPage}-page aks_cart`}/>
        <div className="swip">
        <Swiper  
            modules={[Pagination]}
            spaceBetween={8}
            slidesPerView={4}
        
          
            pagination={{ clickable: true }}>
            
                <SwiperSlide >
                  <div className="testImg" >
                    <img src={s1} alt="avatar" className='sli'/>
                  </div>
                </SwiperSlide>
        
             
              <SwiperSlide>
              <div className="testImg">
                <img src={s2} alt="avatar" className='sli'/>
              </div>
              </SwiperSlide>

              <SwiperSlide>
              <div className="testImg">
                <img src={s3} alt="avatar" className='sli'/>
              </div>
              </SwiperSlide>
              
              <SwiperSlide>
              <div className="testImg">
                <img src={s4} alt="avatar" className='sli'/>
              </div>
              </SwiperSlide>
              
              <SwiperSlide>
              <div className="testImg">
                <img src={s5} alt="avatar" className='sli'/>
              </div>
              </SwiperSlide>
              
              <SwiperSlide>
              <div className="testImg">
                <img src={s6} alt="avatar" className='sli'/>
              </div>
              </SwiperSlide>
              
         </Swiper>
         </div>
        
   <>

      {loading?<Loader/>:
        <div className="pro mn_con">
            {products && products.map((product)=>(
              <Product
              key={product._id}
              product={product}/>
            ))}
        </div>}

   </>
   {productCount>0 && productCount >=resPerPage?
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

export default Home