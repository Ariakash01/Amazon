import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:'product',
    initialState:{
        loading:false,
        productt:{},
        isReview:false
    },
reducers:{
    productRequest(state,action){
        return{
            ...state,
            loading:true
        }
    },
    productSuccess(state,action){
        return{
            ...state,
            loading:false,
            productt:action.payload.productt
        }
    },
    productFail(state,action){
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    reviewRequest(state,action){
        return{
            ...state,
            loading:true
        }
    },
    reviewSuccess(state,action){
        return{
            ...state,
            loading:false,
            isReview:true
        }
    },
    reviewFail(state,action){
        return{
            ...state,
            loading:false,
            error:action.payload
        }
},
clearError(state,action){
    return{
    ...state,
    error:null
    }
},
clearProduct(state,action){
    return{
    ...state,
    productt:{}
    }
},

clearReview(state,action){
    return{
    ...state,
    isReview:false
    }
}
}
})

const{actions,reducer}=productSlice

export const{productFail,productRequest,productSuccess,
    reviewFail,reviewRequest,reviewSuccess,
    clearReview,
    clearError,
    clearProduct
}=actions

export default reducer