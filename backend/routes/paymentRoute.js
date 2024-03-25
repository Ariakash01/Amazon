const express=require('express')
const { AdminAuthentication } = require('../middleware/AdminAuth')
const { processPayment, sendStripeApi } = require('../controller/paymentController')
const routes=express.Router()

routes.route('/payment/process').post(AdminAuthentication,processPayment)
routes.route('/payment/stripe').get(AdminAuthentication,sendStripeApi)

module.exports=routes
