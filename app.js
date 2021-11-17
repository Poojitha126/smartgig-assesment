const bodyParser = require("body-parser");
const express=require("express")
const mongoose=require("mongoose");

const app=express();
const UserRouter=require("./routes/user")
const ImageRouter = require("./routes/image")
const jwt=require("jsonwebtoken");

app.set('views','./views');
app.set('view engine','ejs');


mongoose.connect("mongodb://localhost/smartgig");

// app.use("/upload",function(req,res,next){
//     try{
//         const token = req.headers.authorization?.split(" ")[1];
//     console.log(token);
//     if (!token){
//         res.status(401).json({
//             status:"failed",
//             message:"Not Authenticated"
//         });
        
//     }
//     const decoded=jwt.verify(token,"Secret-123");
//     if (!decoded){
//         return res.status(401).json({
//             status:"failed",
//             message:"Invalid token"
//         })
//     }
//     req.user=decoded.data //getting the user id from token
//     }catch(e){
//         return res.status(500).json({
//             status:"failed",
//             message:e.message
//         })
//     }
//     next();
// })

app.use(bodyParser());
// app.use("/",UserRouter);
app.use("/upload",ImageRouter);
app.listen(5000,()=>console.log("serving"))


