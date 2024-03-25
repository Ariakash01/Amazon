import React, { useEffect, useState } from 'react'
import './changePassword.css'

import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, getUpdatePass } from '../../../action/authAction'
import { toast } from 'react-toastify'

const ChangePassword = () => {

    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const {loading,error,update}=useSelector(state=> state.authState)

 const dispatch=useDispatch()
  
 const changePasshandler=(e)=>{
    e.preventDefault()
        const formData=new FormData()
        formData.append('OldPassword',oldPassword)
        formData.append('NewPassword',newPassword)
        dispatch(getUpdatePass(formData))
 }

 useEffect(()=>{
    if(update){
        toast('Password Updated Successfully',{
        position:toast.POSITION.TOP_CENTER,
        type:'success'})
setOldPassword("")
setNewPassword("")
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
        },[error, dispatch,update])
    
  return (
    <div className='login'>
      
        <div className="con_log">
            <h2>Change Password</h2>
            <form onSubmit={changePasshandler}>
                <label htmlFor="oldPass">OldPassword:</label>
                <input type="password" name='oldPass' className='log_input'
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                   
                />
                <label htmlFor="newPassword">Password:</label>
                <input type="password" name='newPassword'  className='log_input'
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                />
               
                <button type='submit'
                disabled={loading}
                >Change Password</button>
               
            </form>
        
          
        </div>
    </div>
  )
}

export default ChangePassword