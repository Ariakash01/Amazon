const express=require('express')
const { newOrder, getSingleOrder, getAllOrder, getAllOrderByAdmin, updateStatusStockByAdmin,
     deleteOrderByAdmin } = require('../controller/orderedController')
const { AdminAuthentication, authorizeRole } = require('../middleware/AdminAuth')

const routes=express.Router()

//1:11:57
routes.route('/orders').get(AdminAuthentication,getAllOrder)
routes.route('/order/:id').get(AdminAuthentication,getSingleOrder)
routes.route('/order/new').post(AdminAuthentication,newOrder)


//ADMIN special routes
routes.route('/admin/orders').get(AdminAuthentication,authorizeRole('admin'),getAllOrderByAdmin)
routes.route('/admin/order/:id').put(AdminAuthentication,authorizeRole('admin'),updateStatusStockByAdmin)
routes.route('/admin/order/:id').delete(AdminAuthentication,authorizeRole('admin'),deleteOrderByAdmin)



module.exports=routes