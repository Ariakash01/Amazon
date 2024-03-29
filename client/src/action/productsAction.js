import { productsFail, productsRequest, productsSuccess } from "../slices/productsSlice"
import axios from 'axios'

export const getProducts=(keyword,currentPage)=>async(dispatch)=>{
    try {
        dispatch(productsRequest())
        let link=`/api/v1/products?page=${currentPage}`
        if(keyword){
            link=link+`&keyword=${keyword}`
        }
        const{data}=await axios.get(link)
        dispatch(productsSuccess(data))
    } catch (error) {
        dispatch(productsFail(error.response.data.message))
    }
}
