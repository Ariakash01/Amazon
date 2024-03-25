import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {BiSearchAlt2} from 'react-icons/bi'
import './search.css'
const Search = () => {
    const navigate=useNavigate()
    const location=useLocation()
const[keyword,setKeyword]=useState("")
 const searchHandler=(e)=>{
    e.preventDefault()
    navigate(`/search/${keyword}`)
 }

 const clearSearch=()=>{
  setKeyword("")
}

useEffect(()=>{
  if(location.pathname=='/'){
  clearSearch()
  }
},[location])


  return (
    <form onSubmit={searchHandler} className="inputSearch">
            <input type="text" className="head_inp" 
            value={keyword}
            onChange={(e)=>{setKeyword(e.target.value)}}
            />
            <button className='inp_sub_btn src_bn' type='submit'><BiSearchAlt2 className="search_icon"/></button>
    </form>
  )
}

export default Search