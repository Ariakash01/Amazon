import React, { useEffect, useState } from 'react'
import './resetPassword.css'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, getResetPass} from '../../../action/authAction'
import { toast } from 'react-toastify'

const ResetPassword = () => {

    const [password,setPassword]=useState("")
    const [cfrmPassword,setCfrmPassword]=useState("")
const {loading,error,authorize}=useSelector(state=> state.authState)
const{token}=useParams()
 
  const navigate=useNavigate()

  const dispatch=useDispatch()
  

 const resetPasshandler=(e)=>{
    e.preventDefault()
        const formData=new FormData()
        formData.append('password',password)
        formData.append('cfrmPassword',cfrmPassword)
        dispatch(getResetPass(formData,token))
 }

 useEffect(()=>{
    if(authorize){
        toast('Password Reset Successfully',{
        position:toast.POSITION.TOP_CENTER,
        type:'success'})
setPassword("")
setCfrmPassword("")
navigate('/')
    return
    }
           if(error){
            toast(error,{
            position:toast.POSITION.TOP_CENTER,
            type:'error',
            onOpen:()=>{
                dispatch(clearAuthError())
            }
            })
            return
           }
        },[error, dispatch,authorize,navigate])
    
  return (
    <div className='login'>
        <div className="con_log">
            <h2>Reset Your Password</h2>
            <form onSubmit={resetPasshandler}>
                <label htmlFor="Password">Password:</label>
                <input type="password" name='Password' className='log_input'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                   
                />
                <label htmlFor="cfrmPassword">Confirm Password:</label>
                <input type="password" name='cfrmPassword'  className='log_input'
                    value={cfrmPassword}
                    onChange={(e)=>setCfrmPassword(e.target.value)}
                />
               
                <button type='submit'
                disabled={loading}
                >Set Password</button>
               
            </form>
        
          
        </div>
    </div>
  )
}

export default ResetPassword