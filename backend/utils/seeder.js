const products=require('../data/products.json')
const product=require('../models/model.js')
const dotenv=require('dotenv');
const connectDatabase = require('../config/database');

dotenv.config({path:"config/config.env"});
connectDatabase()
const seedProducts=async()=>{
    try{
        await product.deleteMany()
        console.log(" DELETED  all items to database from PRODUCTS.json")
        await product.insertMany(products)
        console.log(" INSERT  all items to  database from PRODUCTS.json")
    }catch(err){
        console.log(err.message)
    }
    process.exit()
}

seedProducts()