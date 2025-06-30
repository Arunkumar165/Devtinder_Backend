const express=require("express");
const app=express();



app.get("/user",(req,res)=>{
    res.send({firstName:"Arun",lastName:"kumar"})
})


app.post("/user",(req,res)=>{
    res.send("data is added successfully")
})

app.use("/test",(req,res)=>{
    res.send("first request is test ");
})

app.use("/hello",(req,res)=>{
res.send("this is hello")
})

// app.use("/",(req,res)=>{
// res.send("this is home ")
// })


app.listen(3000,()=>{
    console.log("server is running successfully on port 3000")
})