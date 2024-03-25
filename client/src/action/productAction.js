import { productFail, productRequest, productSuccess ,
    reviewFail,reviewRequest,reviewSuccess
} from "../slices/productSlice"
import axios from 'axios'

export const getProduct=id=>async(dispatch)=>{
    try {
        dispatch(productRequest())
        const{data}=await axios.get(`/api/v1/product/${id}`)
        dispatch(productSuccess(data))
    } catch (error) {
        dispatch(productFail(error.response.data.message))
    }
}
export const postReview=formdata=>async(dispatch)=>{
    try {
        dispatch(reviewRequest())
        const config={
            headers:{
                'content-type':'application/json'
            }
        }
        const{data}=await axios.put('/api/v1/product/review/newORupd',formdata,config)
        dispatch(reviewSuccess(data))
    } catch (error) {
        dispatch(reviewFail(error.response.data.message))
    }
}