import axios from 'axios'
import { cartRequest, cartSuccess } from "../slices/cartSlice"

export const getcart=(id,quantity)=>async(dispatch)=>{
    try { 
        dispatch(cartRequest())
        const {data}=await axios.get(`/api/v1/product/${id}`)
        dispatch(cartSuccess(
            {
                product:data.productt._id,
                name:data.productt.name,
                price:data.productt.price,
                image:data.productt.images[0].image,
                stock:data.productt.stock,
                quantity
           }
        ))
    } catch (error) {

    }
}