const exprress=require("express");
const shuffleRouter=exprress.Router();
const shuffleController=require("./shuffleController");
const authMiddleware = require("../../middleware/auth");

shuffleRouter.post("/add",authMiddleware,shuffleController.addShuffle)
module.exports=shuffleRouter

