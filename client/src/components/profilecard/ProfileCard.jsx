import React from 'react'

import './profileCard.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = () => {
    const {authorize,user}=useSelector(state=> state.authState)
  return (
    <div className="profilecard">
          
        <img src={user.avatar} alt="" className="proImg_cover"/>
        <div className="profilenm">
            <span>My profile</span>
            <span></span>
        </div>
       
        <div className="followstatus">
          <hr />
          <div>
            <div className="follow">
              <span>Name</span>
              <span>{user.name}</span>
             </div>
             <div className="follow">
              <span>Email</span>
              <span>{user.email}</span>
            </div>
            
       
            <div className="follow">
              <span>Joined At</span>
              <span>{String(user.createdAt).substring(0,10)}</span>
            </div>
            </div>
          <hr />
        </div>
        <div className="mycart">
        <Link to={'/myprofile/update'} style={{textDecoration: 'none'}}>
          <button className='pro_Btn'>
          Edit profile
          </button>
     
        </Link>
        </div>
        <div className="mycart">
        <Link to={'/user/orders'} style={{textDecoration: 'none'}}>
          <button className='pro_Btn'>
         My Orders
          </button>
     
        </Link>
        </div>
        <div className="mycart">
          <Link to={'/myprofile/password/change'}>
          <button className='pro_Btn chg_pass_btn' >
           change Password
          </button>
          </Link>
        </div>
    </div>
    
  )
}

export default ProfileCard