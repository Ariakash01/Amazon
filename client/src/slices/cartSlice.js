import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
        loading:false,
        shippingInfo:localStorage.getItem('shippingInfo')?JSON.parse(localStorage.getItem('shippingInfo')):{}
    },
reducers:{
    cartRequest(state,action){
        return{
            ...state,
            loading:true
        }
    },
    cartSuccess(state,action){

        const item=action.payload
        const isItemExists=state.items.find(i=>i.product==item.product)
        if(isItemExists){
            state={
                ...state,
                loading:false
            }
        }
        else{
            state={
                items:[...state.items,item],
                loading:false
            }
            localStorage.setItem('cartItems',JSON.stringify(state.items))
        }
        return state
       
    },
    increaseCartQty(state,action){
        state.items=state.items.map(item=>{
            if(item.product===action.payload){
                item.quantity=item.quantity+1
            }
            return item
        })
        localStorage.setItem('cartItems',JSON.stringify(state.items))

    },
    decreaseCartQty(state,action){
        state.items=state.items.map(item=>{
            if(item.product===action.payload){
                if(item.quantity >1){
                item.quantity=item.quantity-1
                }
                return item
            }
            return item
        })
        localStorage.setItem('cartItems',JSON.stringify(state.items))

    },
      removeItemFromCart(state,action){
        const filter=state.items.filter(item=>{
            return item.product !== action.payload
        })
        localStorage.setItem('cartItems',JSON.stringify(filter))
        return{
            ...state,
            items:filter
        }
    },
    shippingInfoDetails(state,action){
        
        localStorage.setItem('shippingInfo',JSON.stringify(action.payload))
        return{
            ...state,
            shippingInfo:action.payload
        }
    },
    orderComplete(state,action){
        
        localStorage.removeItem('shippingInfo')
        localStorage.removeItem('cartItems')
       
        return{
            items:[],
           loading:false,
            shippingInfo:{}
        }
    }
}
 
})

const{actions,reducer}=cartSlice

export const{cartRequest,cartSuccess,
    decreaseCartQty,increaseCartQty,
    removeItemFromCart,
shippingInfoDetails,
orderComplete}=actions

export default reducer