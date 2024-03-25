const ErrorHandler = require("../utils/errorHandlers")

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500
    if(process.env.NODE_ENV=='development'){
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        stack:err.stack,
        error:err
    })
}
if(process.env.NODE_ENV=='production'){
    let message=err.message
    let  error=new ErrorHandler(message)
    if(err.name=="validationError"){
        message=Object.values(err.errors).map(value=>value.message)
        error=new ErrorHandler(message)
        err.statusCode=400
    }
    if(err.name=="CastError"){
        message=`Resource not found: ${err.path}`
        error=new ErrorHandler(message)
        err.statusCode=400
    }
    if(err.code==11000){
        let message=`duplicate ${Object.keys(err.keyValue)} .already exits`
        error=new ErrorHandler(message)
        err.statusCode=400
    }
    if(err.name=="JSONWebTokenError"){
        message="json web token are invalid.please try again"
        error=new ErrorHandler(message)
        err.statusCode=400
    }
    if(err.name=="TokenExpiredError"){
        let message="Token are expired.please login or again try to reset"
        error=new ErrorHandler(message)
        err.statusCode=400
    }

    res.status(err.statusCode).json({
        success:false,
        message:error.message ||'internal server error'
    })
}
}