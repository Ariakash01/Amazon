import React, { useEffect, useState } from 'react'
import './login.css'
import logo from '../../assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, getlogin } from '../../../action/authAction'
import { toast } from 'react-toastify'

const Login = () => {

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
const {loading,error,authorize}=useSelector(state=> state.authState)

const location=useLocation()
const redirect=location.search?'/'+location.search.split('=')[1]:'/'
 const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogin=(e)=>{
     e.preventDefault()
     dispatch(getlogin(email,password))
  }
 
useEffect(()=>{
if(authorize)
{
 navigate(redirect)
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
},[error,authorize,dispatch])

  return (
    <div className='login'>
      
       
        <img src={logo} alt="logo" className='login_logo'/>
    
        <div className="con_log">
            <h2>SIGN IN</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input type="email" name='email' className='log_input'
                   
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input type="password" name='password'  className='log_input'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
               
                <button type='submit'
                disabled={loading}
                >SIGN IN</button>
               
            </form>
            <div className='agree'>
            <input type="checkbox" className='chk_box'/>
            <p>please agree the condition to continue
            </p>
            </div>
            <Link to={'/password/forgot'}>
        <p>Forgot Password?</p>
        </Link>
        <Link to={'/register'}>
            <button >Create new account</button>
        </Link>
          
        </div>
    </div>
  )
}

export default Login