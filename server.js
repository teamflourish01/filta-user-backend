const express=require("express")
const cors=require("cors")
const { connection } = require("./db")
require("dotenv").config()
const app=express()


app.use(cors({origin:true}))
app.use(express.json())








app.listen(process.env.PORT,async()=>{
    console.log(`Server is Running on ${process.env.PORT} Port`);
    try {
            await connection
            console.log("Database Is Ready");
            
    } catch (error) {
        console.log(error);
        
    }
    
})
