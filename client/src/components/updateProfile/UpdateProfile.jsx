import React, { useEffect, useState } from 'react'
import './updateProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import {clearAuthError,getUpdate} from '../../action/authAction'
import { toast } from 'react-toastify'
import { clearUpdateRequest } from '../../slices/authSlice'

const UpdateProfile = () => {
    const {loading,error,user,update}=useSelector(state=> state.authState)
    const dispatch=useDispatch()

const onChangeAvatar=(e)=>{
    const reader=new FileReader()
    reader.onload=()=>{
        if(reader.readyState===2){
            setCurrentImg(reader.result)
            setAvatar(e.target.files[0])
        }
    }
    reader.readAsDataURL(e.target.files[0])
}

const[currentImg,setCurrentImg]=useState("/images/products/1.jpg")
const [avatar,setAvatar]=useState("")
const [name,setName]=useState("")
const [email,setEmail]=useState("")

const updHandler=(e)=>{
    e.preventDefault()
    const formData=new FormData()
    formData.append('name',name)
    formData.append('email',email)
 
    formData.append('avatar',avatar)
    dispatch(getUpdate(formData))

}

useEffect(()=>{
    if(user){
  setName(user.name)
  setEmail(user.email)
   if(avatar){
    setCurrentImg(user.avatar)
   }
 }
 if(update){
    toast('Profile Updated Successfully',{
    position:toast.POSITION.TOP_CENTER,
    type:'success',
    onOpen:()=>{
        dispatch(clearUpdateRequest())
    }})
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
    },[error, dispatch,user,update,avatar])



  return (
    <div className='login'>
        <div className="con_log">
            <h2>PROFILE UPDATE</h2>
            <form onSubmit={updHandler}>
            <label htmlFor="name">Name:</label>
                <input type="text" name='name'  className='log_input'
                 value={name}
                  onChange={(e)=>{setName(e.target.value)}}  
                />
                    <label htmlFor="email">Email:</label>
                <input type="email" 
                  
                 name='email' 
                 className='log_input'
                 value={email}
                 onChange={(e)=>{setEmail(e.target.value)}}  
            
                />
               
              <label htmlFor="avatar">Avatar:</label>
              <img src={currentImg} alt="profile_img" className='db'/>
                <input type="file"  name='avatar'  className='log_input'
                  onChange={onChangeAvatar}
                 />
                
                <button type='submit'
           disabled={loading}
                >Update</button>
               
            </form>
                      
        </div>
    </div>
  )
}

export default UpdateProfile