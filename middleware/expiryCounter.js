const User = require("../modules/user/userSchema");
const { expiryDate } = require("../notifications/expiryDate");

const expiryMiddleware=async(req,res,next)=>{
    try {
        if(req.user.planExpired){
            let expired = expiryDate(req.user.planExpired);
            console.log(expired,"expired");
            
            let x=req.user.notifications.includes(expired)
            console.log("includes",x);
            
            if(expired && !x){
                let data=await User.findByIdAndUpdate(req.user._id,{notifications:[...req.user.notifications,expired]},{new:true})
                req.user=data
            }
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports={expiryMiddleware}