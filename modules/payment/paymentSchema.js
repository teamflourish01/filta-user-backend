const mongoose=require("mongoose")
let paymentSchema=new mongoose.Schema({
    razorpay_order_id:{
        type:String
    },
    razorpay_payment_id:{
        type:String
    },
    razorpay_signature:{
        type:String
    }
})

let Payment=new mongoose.model("Payment",paymentSchema)
module.exports=Payment