import { createdOrderFail, createdOrderRequest, createdOrderSucess, 
    userOrderFail, userOrderRequest, userOrderSucess ,
    singleOrderFail,singleOrderRequest,singleOrderSucess
} from "../slices/ordersSlice"

import axios from 'axios'

export const getOrder=order=>async(dispatch)=>{
    try {
        dispatch(createdOrderRequest())
        const{data}=await axios.post('/api/v2/order/new',order)
        dispatch(createdOrderSucess(data))
    } catch (error) {
        dispatch(createdOrderFail(error.response.data.message))
    }
}
export const getUserOrders=async(dispatch)=>{
    try {
        dispatch(userOrderRequest())
        const{data}=await axios.get('/api/v2/orders')
        dispatch(userOrderSucess(data))
    } catch (error) {
        dispatch(userOrderFail(error.response.data.message))
    }
}
export const getSingleOrder= id =>async(dispatch)=>{
    try {
        dispatch(singleOrderRequest())
        const{data}=await axios.get(`/api/v2/order/${id}`)
        dispatch(singleOrderSucess(data))
    } catch (error) {
        dispatch(singleOrderFail(error.response.data.message))
    }
}