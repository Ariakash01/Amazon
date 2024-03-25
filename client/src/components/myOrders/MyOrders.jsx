import React, { Fragment, useEffect } from 'react'
import Metadata from '../Metadata'
import {MDBDataTable}from 'mdbreact'
import { getUserOrders } from '../../action/ordersAction'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './myOrders.css'
const MyOrders = () => {
    const {userOrders=[]}=useSelector(state=> state.orderedState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(getUserOrders)
    },[])
    const setOrders=()=>{
        const data={
            columns:[
                {
                    label:'Order ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Number Of Items',
                    field:'noOfItems',
                    sort:'asc'
                },
                {
                    label:'Amount',
                    field:'amount',
                    sort:'asc'
                },
                {
                    label:'Status',
                    field:'status',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    sort:'asc'
                }
            ],
            rows:[]
        }

userOrders.forEach(userOrder=>{
    data.rows.push({
        id:userOrder._id,
        noOfItems:userOrder.orderItems.length,amount:`$${userOrder.totalPrice}`,
        status:userOrder.orderStatus&&userOrder.orderStatus.includes('delivered')?
        (<p style={{color:'green'}}>{userOrder.orderStatus}</p>):
        (<p style={{color:'red'}}>{userOrder.orderStatus}</p>),
        actions:<Link to={`/order/${userOrder._id}`} className="btn btn-primary">
        <i className='fa fa-eye'></i>
        </Link>
    })
})

        return data
    }
  return (
    <Fragment>
        <div className="table">
        <Metadata title="My Orders"/>
        
        <h1 className='mt-5'>My Orders</h1>
        
        <MDBDataTable
        className='px-3'
        bordered
        stripped
        hover
        data={setOrders()}
        />
        </div>
    </Fragment>
  )
}

export default MyOrders