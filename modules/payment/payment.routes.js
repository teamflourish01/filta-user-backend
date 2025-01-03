const express=require("express")
const paymentRouter=express.Router()
const paymentController=require("./patymentController")
paymentRouter.post("/create-order",paymentController.createOrder)
paymentRouter.post("/verify",paymentController.verifyPayment)

module.exports=paymentRouter
