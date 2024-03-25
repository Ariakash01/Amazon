import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'authourize',
    initialState:{
        loading:true,
        authorize:false
    },
reducers:{
   authRequest(state,action){
        return{
            ...state,
           loading:true
        }
    },
   authSuccess(state,action){
        return{
            loading:false,
          authorize:true,
          user:action.payload.user
        }
    },
   authFail(state,action){
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    authRegisterRequest(state,action){
        return{
            ...state,
            loading:true
           
        }
    },
   authRegisterSuccess(state,action){
        return{
            loading:false,
          authorize:true,
          user:action.payload.user
        }
    },
   authRegisterFail(state,action){
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    authLoadRequest(state,action){
        return{
            ...state,
            authorize:false,
            loading:true 
        }
    },
   authLoadSuccess(state,action){
        return{
            loading:false,
          authorize:true,
          user:action.payload.user
        }
    },
   authLoadFail(state,action){
        return{
            ...state,
            loading:false
        }
    },
    authLogoutSuccess(state,action){
        return{
            loading:false,
          authorize:false
        }
    },
   authLogoutFail(state,action){
        return{
      ...state,
     error:action.payload
        }
    },
    authUpdRequest(state,action){
        return{
            ...state,
            loading:true,
           update:false
        }
    },
   authUpdSuccess(state,action){
        return{
            ...state,
            loading:false,
          user:action.payload.user,
          update:true
        }
    },
   authUpdFail(state,action){
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    clearUpdateRequest(state,action){
        return{
            ...state,
            update:false
        }
    },
    updatePassRequest(state,action){
        return{
            ...state,
            loading:true,
           update:false
        }
    },
   updatePassSuccess(state,action){
        return{
            ...state,
            loading:false,
          update:true
        }
    },
   updatePassFail(state,action){
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    forgotPassRequest(state,action){
        return{
            ...state,
            loading:true,
            message:null
        }
    },
   forgotPassSuccess(state,action){
        return{
            ...state,
            loading:false,
       message:action.payload.message
        }
    },
   forgotPassFail(state,action){
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    resetPassRequest(state,action){
        return{
            ...state,
            loading:true
        }
    },
   resetPassSuccess(state,action){
        return{
            ...state,
            loading:false,
            authorize:true,
       user:action.payload.user
        }
    },
   resetPassFail(state,action){
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    
    clearError(state,action){
        return{
            ...state,
            loading:false,
            error:null
        }
    }
}
 
})

const{actions,reducer}=authSlice

export const{authFail,authRequest,authSuccess,
    authRegisterFail,authRegisterRequest,authRegisterSuccess,
    authLoadFail,authLoadRequest,authLoadSuccess,
    authLogoutFail,authLogoutSuccess,
    authUpdFail,authUpdRequest,authUpdSuccess,
    updatePassRequest,updatePassSuccess,updatePassFail,
    forgotPassRequest,forgotPassSuccess,forgotPassFail,
    resetPassRequest,resetPassSuccess,resetPassFail,
    clearUpdateRequest,
    clearError}=actions

export default reducer