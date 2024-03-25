const mongoose=require('mongoose')
const validator=require('validator');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter username"]
    },
    email:{
        type:String,
        required:[true,"please enter email"],
        unique:true,
        validate:[validator.isEmail,'please enter valid email']
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        maxlength:[8,'password length must below 8 char'],
        select:false
    },
    avatar:{
        type:String
    },
    role:{
        type:String
       
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

userSchema.methods.getJwtToken=function(){
   return jwt.sign({id:this.id},process.env.JWT_SECERET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.ValidatePass=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.methods.getresetToken=function(){
    const token=crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex')
    this.resetPasswordTokenExpire=Date.now()+30*60*1000
    return token
}

let customer=mongoose.model('user',userSchema)
module.exports=customer