const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true,
        maxLength:[15,"less than 15 character"]
    },
    price:{
        type:Number,
        default:0.0
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    rating:{
        type:Number,
        default:0
    }
    ,
    images:[{
        image:{
            type:String
    
        }
    }],
    category:{
        type:String,
        required:[true,"enter category"],
        enum:{
            values:[
                'electronics',
                'mobile phones',
                'laptops',
                'accessories',
                'headphones',
                'food',
                'books',
                'clothes/shoes',
                'beauty/health',
                'sports',
                'outdoor',
                'home'
            ],
            message:"please select currect category"
        }
    },
    seller:{
        type:String,
        required:[true,"please enter product seller name"]
    },
    
    stock:{
        type:Number,
        required:[true,"please enter product stock number"],
        maxLength:[20,"cannot exceed 20 product"]
    },
    noOfReviews:{
        type:Number,
        default:0
    },reviews:[
        {
           user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
           },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    CreatedAt:{
        type:Date,
        default:Date.now()
    } 
    
})


let schema=mongoose.model('product',productSchema)
module.exports=schema