
const AsyncError = require("../middleware/AsyncError");
const product = require("../models/model");
const order = require("../models/orderedModel");
const ErrorHandler = require("../utils/errorHandlers")


//POST New ordered product
exports.newOrder= AsyncError(async(req,res,next)=>{
    const{
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    }=req.body

    const orders=await order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user.id
    })
    res.status(200).json({
        success:true,
        orders
    })
})

//GET A single order product
exports.getSingleOrder= AsyncError(async(req,res,next)=>{
    const orders=await order.findById(req.params.id).populate('user','name email')
    if(!orders){
        return next(new ErrorHandler (`your product ID ${req.params.id} is not in your DB`,404))
       }

       res.status(200).json({
        success:true,
        orders
      })
})

//GET all ordered product
exports.getAllOrder= AsyncError(async(req,res,next)=>{
    const orders=await order.find({user:req.user.id})
       res.status(200).json({
        success:true,
        orders
      })
})


//ADMIN getAll orders
exports.getAllOrderByAdmin= AsyncError(async(req,res,next)=>{
    const orders=await order.find()
    let AllTotalPrice=0
    orders.forEach(order=>{
        AllTotalPrice+=order.totalPrice
    })
       res.status(200).json({
        success:true,
        AllTotalPrice,
        orders
      })
})

//ADMIN : update delivery ands stock pondru ella update panrom

exports.updateStatusStockByAdmin= AsyncError(async(req,res,next)=>{
    const orders=await order.findById(req.params.id)
    if(orders.orderStatus=='delivered'){
        return next(new ErrorHandler(`your order has already been delivered`,400))
       }

    //update stock in products stocks
    orders.orderItems.forEach(async orderItem=>{
        await updateStock(orderItem.product,orderItem.quantity)
    })

    // processing or delivery tracked status
    orders.orderStatus=req.body.orderStatus
    orders.deliveredAt=Date.now()
    await orders.save()
    res.status(200).json({
        success:true
      })
})

async function updateStock(productId,quantity){
    const products=await product.findById(productId)
    products.stock=products.stock-quantity
    products.save({
        validateBeforeSave:false
    })
}

//ADMIN :Delete a single  order 
exports.deleteOrderByAdmin= AsyncError(async(req,res,next)=>{
    const orders=await order.findById(req.params.id)
    if(!orders){
        return next(new ErrorHandler(`your requested order is not available`,404))
       }
    await order.findByIdAndDelete(req.params.id)
       res.status(200).json({
        success:true
      })
    })

//Inga namma 1:47:59-(finish)--create review API SEYYANUM & indha order ella test pannanum postmanla 


