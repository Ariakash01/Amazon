import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate} from 'react-router-dom'
import Loader from '../loader/Loader'
const ProtectedRoute = ({children}) => {

    const{authorize,loading}=useSelector(state=>state.authState)
    if(!authorize && !loading){
        return <Navigate to="/login"/>
    }

if(loading){
  return <Loader/>
}

if(authorize){
  return (
    children
  )
}

 
}

export default ProtectedRoute