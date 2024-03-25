import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
name:'order',
initialState:{
    orderDetail:{},
    userOrders:[],
    loading:false
},
reducers:{
   createdOrderRequest(state,action){
    return{
        ...state,
        loading:true
    }
   },
   createdOrderSucess(state,action){
    return{
        ...state,
        loading:false,
        orderDetail:action.payload.order
    }
   },
   createdOrderFail(state,action){
    return{
        ...state,
        loading:false,
        error:action.payload
    }
   },
   clearOrderError(state,action){
    return{
        ...state,
       error:null
    }
   },
   userOrderRequest(state,action){
    return{
        ...state,
        loading:true
    }
   },
   userOrderSucess(state,action){
    return{
        ...state,
        loading:false,
        userOrders:action.payload.orders
    }
   },
   userOrderFail(state,action){
    return{
        ...state,
        loading:false,
        error:action.payload
    }
   },
   singleOrderRequest(state,action){
    return{
        ...state,
        loading:true
    }
   },
   singleOrderSucess(state,action){
    return{
        ...state,
        loading:false,
        orderDetail:action.payload.orders
    }
   },
   singleOrderFail(state,action){
    return{
        ...state,
        loading:false,
        error:action.payload
    }
   }
    }

})



const{actions,reducer}=cartSlice

export const{
createdOrderFail,createdOrderRequest,createdOrderSucess,
clearOrderError,
userOrderFail,userOrderRequest,userOrderSucess,
singleOrderFail,singleOrderRequest,singleOrderSucess
}=actions

export default reducer