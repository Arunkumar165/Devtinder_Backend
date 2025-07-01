
const express=require("express");
const app=express();

const {adminAuth,userAuth}=require("./middlewares/auth");



// app.use("/rount",[rh1,rh2,rh3]);
// app.use("/rount2",[rh1,rh2],rh3);

app.use("/senior/employ",adminAuth);//thi is way second way to how to middlewares 
app.use("/user",userAuth);

app.use("/user",userAuth,(req,res)=>{//ase bhi ham userAuth Authentication laga skte h ;
    res.send("this is user")
})
app.get("/senior/employ/getData",(req,res)=>{
    res.send("token is valid for senior person");
})

app.use("/manager",(req,res,next)=>{
    const token="abc";
    const validToken=token=="abc";
    if(!validToken){
        res.status(401).send("user is not valid")
    }
    else{
        next()
    }

})

app.get("/manager/getAllData",(req,res)=>{
    res.send("manager is valid");

})


app.get("/user/getAllData",(req,res)=>{

const token="abcd";
const adminToken=token=="abc";
if(adminToken){
    res.send("user is valid ")
}
else{
    res.status(401).send("unathorized token");
}

})

app.get("/next3",[(res,req,next)=>{
    console.log("1");
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