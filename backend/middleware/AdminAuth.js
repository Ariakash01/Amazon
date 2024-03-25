const jwt=require('jsonwebtoken')
const AsyncError = require('./AsyncError')
const customer = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandlers')

exports.AdminAuthentication=AsyncError(async(req,res,next)=>{
   const{token}=req.cookies

if(!token){
    return next(new ErrorHandler('Login first and to handle this Routes',401))
  }
  const decoded=jwt.verify(token,process.env.JWT_SECERET)
  req.user=await customer.findById(decoded.id)
  next()
})

exports.authorizeRole=(...roles)=>{
 return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return next(new ErrorHandler(`${req.user.role}--are not allowed to access these routes`,401))
    }
    next()
  }
}




