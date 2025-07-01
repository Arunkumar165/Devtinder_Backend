const express=require("express");
const app=express();


app.use("/rount",[rh1,rh2,rh3]);
app.use("/rount2",[rh1,rh2],rh3);

app.get("/next3",[(res,req,next)=>{
    console.log("1")
    next()
},
(req,res,next)=>{
console.log("2")
next()
},
(res,req,next)=>{
    console.log("3");
    next()
},
(req,res,next)=>{
    res.send("4")
}]

)

app.get("/next2",(res,req,next)=>{
    console.log("1")
    next()
},
(req,res,next)=>{
console.log("2")
next()
},
(res,req,next)=>{
    console.log("3");
    next()
},
(req,res,next)=>{
    res.send("4")
}

)


app.get("/next",(req,res,next)=>{
    console.log("this going to next");
     next()
},

    (req,res)=>{
        res.send("this is response next")
    }



)


app.get("/user/:userId/:name/:classs",(req,res)=>{
    console.log(req.params)
    res.send({firstName:"Arun",lastName:"kumar"})
   // http://localhost:3000/user/101/arun/5858
})


app.get("/user/:userId",(req,res)=>{
    console.log(req.params)
    res.send({firstName:"Arun",lastName:"kumar"})
})

app.get("/user",(req,res)=>{
    console.log(req.query)
    res.send({firstName:"Arun",lastName:"kumar"})
})



// app.get("/a/",(req,res)=>{
//     res.send({firstName:"Arun",lastName:"kumar"})not working 
// })


app.listen(3000,()=>{
    console.log("server is running successfully on port 3000")
})
















// const express=require("express");
// const app=express();



// app.get("/user",(req,res)=>{
//     res.send({firstName:"Arun",lastName:"kumar"})
// })


// app.post("/user",(req,res)=>{
//     res.send("data is added successfully")
// })

// app.use("/test",(req,res)=>{
//     res.send("first request is test ");
// })

// app.use("/hello",(req,res)=>{
// res.send("this is hello")
// })

// app.use("/",(req,res)=>{
// res.send("this is home ")
// })


// app.listen(3000,()=>{
//     console.log("server is running successfully on port 3000")
// })