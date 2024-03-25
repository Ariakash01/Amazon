
const User = require('../models/userModel');
const sendEMail = require('../utils/email');
const ErrorHandler = require("../utils/errorHandlers")
const crypto = require('crypto');
const CallTheToken = require('../utils/sendToken');
const AsyncError = require('../middleware/AsyncError');


//Register User - /api/v1/register
exports.registerUser =AsyncError(async (req, res, next) => {
    const {name, email, password,
        role} = req.body

        let avatar;
        if(req.file){
            avatar=`${process.env.PROFILE_IMG}/uploads/user/${req.file.originalname}`
        }
    const user = await User.create({
        name,
        email,
        password,
        avatar,
        role

    });

    CallTheToken(user, 201, res)

})

//Login User - /api/v1/login
exports.loginUser =AsyncError(async (req, res, next) => {
    const {email, password} =  req.body

    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    //finding the user database
    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    
    if(!await user.ValidatePass(password)){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    CallTheToken(user, 201, res)
    
})

//Logout - /api/v1/logout
exports.logoutUser = AsyncError(async(req, res, next) => {

       await res.cookie('token',null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        .status(200)
        .json({
            success: true,
            message: "Loggedout"
        })

})

//Forgot Password - /api/v1/password/forgot
exports.forgotPass =AsyncError( async (req, res, next)=>{
    const user =  await User.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    const resetToken = user.getresetToken();
    await user.save({validateBeforeSave: false})
    

    //Create reset url
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

    try{
        sendEMail({
            email: user.email,
            subject: "JVLcart Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message), 500)
    }

})  

//Reset Password - /api/v1/password/reset/:token
exports.resetPass =AsyncError( async (req, res, next) => {
   const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex'); 

    const user = await User.findOne( {
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt : Date.now()
        }
    } )

    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or expired'));
    }

    if(req.body.password !== req.body.cfrmPassword) {
        return next(new ErrorHandler('Password does not match'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false})
    CallTheToken(user, 201, res)

})

//Get User Profile - /api/v1/myprofile
exports.myProfile =AsyncError(async (req, res, next) => {
   const user = await User.findById(req.user.id)
   res.status(200).json({
        success:true,
        user
   })
})

//Change Password  - api/v1/password/change
exports.changepassword  =AsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    //check old password
    if(!await user.ValidatePass(req.body.OldPassword)) {
        return next(new ErrorHandler('Old password is incorrect', 401));
    }

    //assigning new password
    user.password = req.body.NewPassword;
    await user.save();
    res.status(200).json({
        success:true,
    })
 })

//Update Profile - /api/v1/update
exports.profileUpdate =AsyncError(async (req, res, next) => {
    let newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    let avatar;
        if(req.file){
            avatar=`${process.env.PROFILE_IMG}/uploads/user/${req.file.originalname}`
            newUserData={...newUserData.email,avatar}
        }
    const user =await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        user
    })

})

//Admin: Get All Users - /api/v1/admin/users
exports.getAllUserByAdmin =AsyncError(async (req, res, next) => {
   const users = await User.find();
   res.status(200).json({
        success: true,
        users
   })
})

//Admin: Get Specific User - api/v1/admin/user/:id
exports.getSingleUserByAdmin =AsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
   })
});

//Admin: Update User - api/v1/admin/user/:id
exports.updateSingleUserByAdmin =AsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })
})

//Admin: Delete User - api/v1/admin/user/:id
exports.deleteSingleUserByAdmin =AsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }
    await user.remove();
    res.status(200).json({
        success: true,
    })
})