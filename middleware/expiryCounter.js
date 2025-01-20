const User = require("../modules/user/userSchema");
const { expiryDate } = require("../notifications/expiryDate");
const { planExpiry } = require("../notifications/planExpiry");

const expiryMiddleware=async(req,res,next)=>{
    try {
console.log(req.body,"body login");
        let user=await User.findOne({email:req.body.email})
        if(user?.planExpired){
            let expired = expiryDate(user.planExpired);
            console.log(expired,"expired");
            if(expired=="Your Plan Is Expired"){
              return  res.status(400).send({
                    message:"Plan Has been Expired"
                })
            }
            let x=user.notifications.includes(expired)
            console.log("includes",x);
            
            if(expired && !x){
                let data=await User.findByIdAndUpdate(user._id,{notifications:[...user.notifications,expired]},{new:true})
            }
        }

        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports={expiryMiddleware}