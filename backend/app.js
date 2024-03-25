const express=require('express')
const app=express()
const errorMiddleWare=require('./middleware/error.js')
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(cookieParser())
const products=require('./routes/product')
const users=require('./routes/authRoute')
const orders =require('./routes/orderedRoute')
const payment =require('./routes/paymentRoute')
const path=require('path')
const dotenv=require('dotenv');

dotenv.config({path:path.join(__dirname,"config/config.env")});
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/api/v1',products)
app.use('/api/v2',users)
app.use('/api/v2',orders)
app.use('/api/v2',payment)

app.use(errorMiddleWare)

module.exports=app