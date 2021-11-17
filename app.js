const bodyParser = require("body-parser");
const express=require("express")
const mongoose=require("mongoose");

const app=express();
const UserRouter=require("./routes/user")
const PageRouter = require("./routes/page")
const jwt=require("jsonwebtoken");




mongoose.connect("mongodb://localhost/smartgig");

app.use("/page",function(req,res,next){
    try{
        const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token){
        res.status(401).json({
            status:"failed",
            message:"Not Authenticated"
        });
        
    }
    const decoded=jwt.verify(token,"Secret-123");
    if (!decoded){
        return res.status(401).json({
            status:"failed",
            message:"Invalid token"
        })
    }
    req.user=decoded.data //getting the user id from token
    }catch(e){
        return res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
    next();
})

app.use(bodyParser());
app.use("/",UserRouter);
// app.use("/page",PageRouter);
app.listen(5000,()=>console.log("serving"))


