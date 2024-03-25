const AsyncError = require('../middleware/AsyncError.js')
const product=require('../models/model.js')
const searchApi = require('../utils/SearchApi.js')
const ErrorHandler = require('../utils/errorHandlers.js')

//Get all Product from DB
exports.getProducts=AsyncError(async(req,res,next)=>{
    const resPerPage=10
    const apiFeatures=new searchApi(product.find(),req.query).search().paginate(resPerPage)
    
    console.log(`before controller ${apiFeatures}`)
    const products=await apiFeatures.query
    console.log(`after controller ${products}`)
    const AllProductCount=await product.countDocuments({})
    res.status(200).json({
        success:true,
        resPerPage,
        count:AllProductCount,
        products
    })
})

// GET single product from DB
exports.getSingleProduct=AsyncError(async(req,res,next)=>{
  
    const productt=await product.findById(req.params.id).populate('reviews.user','name email')
    if(!productt){
       return next(new ErrorHandler('product Not Found',400))
    }
    res.status(200).json({
        success:true,
        productt
    })
})

//UPDATE in single product in DB
exports.updSingleProduct=AsyncError(async(req,res,next)=>{
    let prod=await product.findById(req.params.id)
    if(!prod){
        return next(new ErrorHandler('product Not Found',400))
    }
    prod=await product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        prod
    })
})

//DELETE a single product
exports.delSingleProduct=AsyncError(async(req,res,next)=>{
    const prod=await product.findById(req.params.id)
    if(!prod){
        return next(new ErrorHandler('product Not Found',400))
    }
    await prod.remove()
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
})

// post All data from products.json to Seeder to Database
exports.newProduct=AsyncError(async (req,res,next)=>{
    req.body.user=req.user.id
    const prod=await product.create(req.body)
    res.status(201).json({
        success:true,
        message:'product added successfully',
        prod
    })
})


//CREATE reviews

exports.productReview=AsyncError(async (req,res,next)=>{
  const{productId,rating,comment}=req.body
  const review={
    user:req.user.id,
    rating,
    comment
  }
  //check user is already review or not
  const products=await product.findById(productId)
  const isReview=products.reviews.find(review=>{
    return review.user.toString()===req.user.id.toString()
  })

  //if review found means, you can forlop the reviews again and find that user review
  if(isReview){
       products.reviews.forEach(review =>{
       if(review.user.toString()===req.user.id.toString()){
        review.comment=comment,
        review.rating=rating
       }
      })
      //if user not review anything about these product ,so push new review to product
  }else{
    products.reviews.push(review)
    products.noOfReviews=products.reviews.length
  }
  //AVERAGE for calculating all users ratings 
  products.rating=products.reviews.reduce((acc,review)=>{
    return review.rating+acc
  },0)/products.reviews.length*10

  //if no review yet,it returns NAN ,so these coding...
  products.rating=isNaN(products.rating)?0:products.rating;

  await products.save({validateBeforeSave:false})
  res.status(200).json({
    success:true
  })
})

//get All Reviews 
exports.getAllReview=AsyncError(async (req,res,next)=>{
    const products=await product.findById(req.query.id)

    res.status(200).json({
        success:true,
        reviews:products.reviews
    })
})

//delete one review
exports.deleteOneReview=AsyncError(async (req,res,next)=>{
const products=await product.findById(req.query.product)
const reviews=products.reviews.filter(review=>{
return review._id.toString()!==req.query.id.toString()
})

const noOfReviews=reviews.length

//AVERAGE for calculating all users ratings 
let rating=reviews.reduce((acc,review)=>{
  return review.rating+acc
},0)/reviews.length;
rating=isNaN(rating)?0:rating
await product.findByIdAndUpdate(req.query.product,{
    reviews,
    noOfReviews,
    rating
})

    res.status(200).json({
        success:true
    })
})

//indha delete vela seyyyala seri pannanum !!!!!!
