import {combineReducers,configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import  productsReducer  from './slices/productsSlice'
import  productReducer from "./slices/productSlice"
import  authReducer from "./slices/authSlice"
import  cartReducer from "./slices/cartSlice"
import  orderedReducer from "./slices/ordersSlice"
const reducer=combineReducers({
   productsState:productsReducer,
   productState:productReducer,
   authState:authReducer,
   cartState:cartReducer,
   orderedState:orderedReducer
})

const store=configureStore({
    reducer,
    middleware:[thunk]
})

export default store