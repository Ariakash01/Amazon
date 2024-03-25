const express=require('express')
const multer=require('multer')
const path=require('path')
const upload=multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join( __dirname,'..','uploads/user'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})

const routes=express.Router()
const {registerUser, loginUser, logoutUser, forgotPass, resetPass, myProfile, 
    changepassword, profileUpdate, getAllUserByAdmin, getSingleUserByAdmin,
     updateSingleUserByAdmin, deleteSingleUserByAdmin}= require('../controller/authController')
const { AdminAuthentication, authorizeRole } = require('../middleware/AdminAuth')

//common for all user and admin
routes.route('/register').post(upload.single('avatar'),registerUser)
routes.route('/login').post(loginUser)
routes.route('/logout').get(logoutUser)
routes.route('/password/forgot').post(forgotPass)
routes.route('/password/reset/:token').post(resetPass)
routes.route('/myprofile').get(AdminAuthentication,myProfile)
routes.route('/myprofile/password/change').put(AdminAuthentication,changepassword)
routes.route('/myprofile/update').put(AdminAuthentication,upload.single('avatar'),profileUpdate)
//profile update route file  varum

//ADMIN power ROUTES
routes.route('/admin/users').get(AdminAuthentication,authorizeRole('admin'),getAllUserByAdmin)
routes.route('/admin/user/:id').get(AdminAuthentication,authorizeRole('admin'),getSingleUserByAdmin)
                               .put(AdminAuthentication,authorizeRole('admin'),updateSingleUserByAdmin)
                               .delete(AdminAuthentication,authorizeRole('admin'),deleteSingleUserByAdmin)



module.exports=routes