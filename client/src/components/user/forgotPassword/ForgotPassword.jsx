import React, { useEffect, useState } from 'react'
import './forgotPassword.css'
import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, getForgotPass} from '../../../action/authAction'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

    const [email,setEmail]=useState("")

const {loading,error,message}=useSelector(state=> state.authState)

 const dispatch=useDispatch()

  const handleForgot=(e)=>{
    e.preventDefault()
    const formData=new FormData()
 
    formData.append('email',email)
 
    dispatch(getForgotPass(formData))

}

useEffect(()=>{
    if(message){
        toast('Email Send Successfully to your Registered Email',{
        position:toast.POSITION.TOP_CENTER,
        type:'success'})
setEmail("")

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
        },[error, dispatch,message])


  return (
    <div className='login'>
      
       
        <img src={logo} alt="logo" className='login_logo'/>
    
        <div className="con_log">
            <h2>FORGOT PASSWORD</h2>
            <form onSubmit={handleForgot}>
                <label htmlFor="email">Email:</label>
                <input type="email" name='email' className='log_input'
                   
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                
               
                <button type='submit'
                disabled={loading}
                >CONFIRM</button>
               
            </form>
           
        
            
          
        </div>
    </div>
  )
}

export default ForgotPassword