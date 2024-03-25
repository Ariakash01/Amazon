import React, { useEffect, useState } from 'react'
import './register.css'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {clearAuthError, getRegister} from '../../../action/authAction'
import { toast } from 'react-toastify'

const Register = () => {
    const {loading,error,authorize}=useSelector(state=> state.authState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        if(authorize){
         navigate('/')
         return
     }
           if(error){
            toast(error,{
            position:toast.POSITION.TOP_CENTER,
            type:'error',
            onOpen:()=>{
                dispatch(clearAuthError)
            }
            })
            return
           }
        },[error, dispatch,authorize])


    const handleregister=(e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append('name',userdata.name)
        formData.append('email',userdata.email)
        formData.append('password',userdata.password)
        formData.append('avatar',avatar)
        dispatch(getRegister(formData))
    
    }

const[currentImg,setCurrentImg]=useState("/images/products/1.jpg")
const [avatar,setAvatar]=useState("")

    const [userdata,setUserdata]=useState({
        name:"",
        email:"",
        password:""
    })
const onChange=(e)=>{
    if(e.target.name==='avatar'){
        const reader=new FileReader
        reader.onload=()=>{
            if(reader.readyState===2){
                setCurrentImg(reader.result)
                setAvatar(e.target.files[0])
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }else{
    setUserdata({...userdata,[e.target.name]:[e.target.value]})
}}


  return (
    <div className='login'>
      
       
        <img src={logo} alt="logo" className='login_logo'/>
    
        <div className="con_log">
            <h2>REGISTER</h2>
            <form onSubmit={handleregister}>
            <label htmlFor="name">Name:</label>
                <input type="text" name='name'  className='log_input'
                 
                    onChange={onChange}
                />
                    <label htmlFor="email">Email:</label>
                <input type="email" 
                 onChange={onChange} 
                 name='email' 
                 className='log_input'
               
            
                />
                <label htmlFor="password">Password:</label>
                <input type="password"  onChange={onChange }name='password'  className='log_input'
                  
                 />
              <label htmlFor="avatar">Avatar:</label>
              <img src={currentImg} alt="profile_img" className='db'/>
                <input type="file" onChange={onChange} name='avatar'  className='log_input'
                  
                 />
                
                <button type='submit'
           disabled={loading}
                >Register</button>
               
            </form>
            
        <Link to={'/login'}>
            <button >LogIn</button>
            </Link>
        </div>
    </div>
  )
}

export default Register