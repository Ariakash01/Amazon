const express=require('express')
const routes=express.Router()
const { getProducts, newProduct ,getSingleProduct ,updSingleProduct,delSingleProduct, 
    productReview,
    getAllReview,
    deleteOneReview} = require('../controller/productCon')
const { AdminAuthentication, authorizeRole } = require('../middleware/AdminAuth')


//for ADMIN Routes
routes.route('/admin/products/new').post(AdminAuthentication,authorizeRole('admin'),newProduct)

//For USER Routes
routes.route('/products').get(getProducts)


routes.route('/product/:id').get(getSingleProduct)
                                   .put(updSingleProduct)
                                   .delete(delSingleProduct)
//product reviews
routes.route('/product/review/newORupd').put(AdminAuthentication,productReview)
routes.route('/product/review/delete').delete(deleteOneReview)
routes.route('/product/review/all').get(AdminAuthentication,getAllReview)

module.exports=routes