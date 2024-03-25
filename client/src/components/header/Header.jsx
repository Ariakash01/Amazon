import React from 'react'
import './header.css'
import logo from '../assets/logo.png'

import {SlBasket} from 'react-icons/sl'
import Metadata from '../Metadata'
import Search from '../search/Search'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown,Image } from 'react-bootstrap'
import { getLogout } from '../../action/authAction'

const Header = () => {
  const dispatch= useDispatch()
  const navigate=useNavigate()

const myOrdersHandle=()=>{
  navigate('/user/orders')
}

  const logoutHandle=()=>{
    dispatch(getLogout)
  }

  const {items:cartItems}=useSelector(state=> state.cartState)

  const {authorize,user}=useSelector(state=> state.authState)
  return (
    <div className="header">
      <Metadata title="home"/>
        <div className="logo">
        <Link to={'/'}>
        <img src={logo} alt="amazon logo" className='header_logo'/>
        </Link>
        </div>
        <div className="header_search">
         <Search/>
        </div>
       
        <div className="header_nav">
{
authorize ?
(
  <Dropdown className='d-inline Dropdown'>
    <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
      <figure className='avatar avatar-nav'>
      <Image  src={user.avatar} className='Image'/>
      </figure>
      <span className='user'>{user.name}</span>
    </Dropdown.Toggle>
    <Dropdown.Menu>

<Dropdown.Item 
 onClick={myOrdersHandle} className='text-danger'>
My Orders
</Dropdown.Item>
<Dropdown.Item 
 onClick={()=>{
  navigate('/myprofile')
 }} className='text-danger'>
myprofile
</Dropdown.Item>
<Dropdown.Item 
 onClick={logoutHandle} className='text-danger'>
logout
</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)
            :
  
           <Link to={'/login'} >
           
              
               <p className="log_in">login</p>
         
           </Link>
        
}
            <div className="ors nav_opt">
              {authorize?
               <Link to={'/user/orders'}className="link_rmv  ln2">Previous Orders</Link>
               :
               <Link className="link_rmv  ln2">Make Your Orders By Login</Link>
              }
            </div>
            <div className="pri nav_opt">
                
                <span className=" ln2">Prime</span>
            </div>
          
         
        </div>
            
     <Link to={'/cart'} className='lin_rmv'>
     <div className="cart">
     <SlBasket className='basket'/>
            <span>{cartItems.length}</span>
     </div>
     </Link> 
       
      
    </div>
  )
}

export default Header