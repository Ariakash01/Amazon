const AsyncError = require('../middleware/AsyncError')

const stripe=require('stripe')('sk_test_51O6WWUSDDmKn96syOaLsA5HotWltZs3qwRSGiwFjecYNYJ96nTrP8lMW7X9EOiuOrvsiBFhk4XQxHvUwdNOgPlBT008TAI8Yzi')


exports.processPayment=AsyncError(async(req,res,next)=>{
    const paymentIntent=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"usd",
        description:"TEST_PAYMENT",
        metadata:{integration_check:"accept_payment"},
        shipping:req.body.shipping
    })

    res.status(200)
    .json({
        success: true,
        client_secret:paymentIntent.client_secret
        
    })
})

exports.sendStripeApi=AsyncError(async(req,res,next)=>{
    res.status(200)
    .json({
        stripeApiKey:process.env.STRIPE_KEY
    })
})