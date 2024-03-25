import { authFail, authRequest, authSuccess,  
    authRegisterFail,authRegisterRequest,authRegisterSuccess,
    authLoadFail,authLoadRequest,authLoadSuccess,
    authLogoutSuccess,authLogoutFail,
    authUpdFail,authUpdRequest,authUpdSuccess,
    updatePassRequest,updatePassSuccess,updatePassFail,
    forgotPassRequest,forgotPassSuccess,forgotPassFail,
    resetPassRequest,resetPassSuccess,resetPassFail,
     clearError } from "../slices/authSlice"
import axios from 'axios'

export const getlogin=(email,password)=>async(dispatch)=>{
    try {
        dispatch(authRequest())
        const{data}=await axios.post('/api/v2/login',{email,password})
        dispatch(authSuccess(data))
    } catch (error) {
        dispatch(authFail(error.response.data.message))
    }
}

export const getRegister=(userData)=>async(dispatch)=>{
    try {
        dispatch(authRegisterRequest())
        const config={
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        const{data}=await axios.post('/api/v2/register',userData,config)
        dispatch(authRegisterSuccess(data))
    } catch (error) {
        dispatch(authRegisterFail(error.response.data.message))
    }
}
export const getLoad=async(dispatch)=>{
    try {
        dispatch(authLoadRequest())
        const{data}=await axios.get('/api/v2/myprofile')
        dispatch(authLoadSuccess(data))
    } catch (error) {
        dispatch(authLoadFail(error.response.data.message))
    }
}

export const getLogout=async(dispatch)=>{
    try { 
        await axios.get('/api/v2/logout')
        dispatch(authLogoutSuccess())
    } catch (error) {
        dispatch(authLogoutFail())
    }
}

export const getUpdate=(userData)=>async(dispatch)=>{
    try {
        dispatch(authUpdRequest())
        const config={
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        const{data}=await axios.put('/api/v2/myprofile/update',userData,config)
        dispatch(authUpdSuccess(data))
    } catch (error) {
        dispatch(authUpdFail(error.response.data.message))
    }
}

export const getUpdatePass=(formData)=>async(dispatch)=>{
    try {
        dispatch(updatePassRequest())
        const config={
            headers:{
                'content-type':'application/json'
            }
        }
        await axios.put('/api/v2/myprofile/password/change',formData,config)
        dispatch(updatePassSuccess())
    } catch (error) {
        dispatch(updatePassFail(error.response.data.message))
    }
}

export const getForgotPass=(formData)=>async(dispatch)=>{
    try {
        dispatch(forgotPassRequest())
        const config={
            headers:{
                'content-type':'application/json'
            }
        }
        const {data}=await axios.post('/api/v2/password/forgot',formData,config)
        dispatch(forgotPassSuccess(data))
    } catch (error) {
        dispatch(forgotPassFail(error.response.data.message))
    }
}

export const getResetPass=(formData,token)=>async(dispatch)=>{
    try {
        dispatch(resetPassRequest())
        const config={
            headers:{
                'content-type':'application/json'
            }
        }
       const {data}= await axios.post(`/api/v2/password/reset/${token}`,formData,config)
        dispatch(resetPassSuccess(data))
    } catch (error) {
        dispatch(resetPassFail(error.response.data.message))
    }
}

export const clearAuthError=(dispatch)=>{

        dispatch(clearError())
}
