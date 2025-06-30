const express=require("express");
const app=express();
app.use("/",(req,res)=>{
res.send("this is home ")
})

app.use("/test",(req,res)=>{
    res.send("first request is test ");
})

app.use("/hello",(req,res)=>{
res.send("this is hello")
})
app.listen(3000,()=>{
    console.log("server is running successfully on port 3000")
})