const  express=require("express");
const authRouter=express.Router();
const {validateSignUpData}=require("../utils/validation");
const User=require("../models/user");
const bcrypt=require("bcrypt");

//const jwt=require("jsonwebtoken");



authRouter.post("/signup",async (req,res)=>{
  
    // console.log(req.body)
   
     try{
   
     // Validation of data
    validateSignUpData(req);//yha validation.js me jo bhi code likha i have extracted all login in new file .jab koi bhi signup karega to sabse phele request ko validate krenge
     
    //Encript the passworsd  

      const {firstName,lastName,password,emailId}=req.body;

    const passwordHash= await bcrypt.hash(password,10)
    // console.log(passwordHash);
//     const user=new User(req.body);//is valine line ko change kar diya 
   
   const user =new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash
   })
     
     const savedUser=  await user.save();
       const token=await savedUser.getJWT();
     
       res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)})


     
          res.json({message:"data is successfully addedd",data : savedUser})
     }
     catch(err){
          if (err.code === 11000 && err.keyPattern && err.keyPattern.emailId) {
      res.status(400).send("Error: Email is already registered ❌");
    } else {
      res.status(400).send("Error saving user: " + err.message);
    }
     }

})

authRouter.post("/login",async (req,res)=>{
    try{
           const {emailId,password}=req.body;
            
    const user =await User.findOne({emailId:emailId})//findOne find only one entry
    if(!user){
        //   throw new Error("EmailId is not Present in DB");
         throw new Error("invalid credentials");


    }
   // const isPasswordValid=await bcrypt.compare(password,user.password);//hamare db me user.password
   const isPasswordValid=await user.validatePassword(password);

    if(isPasswordValid){
        //create a jwt token

        // const token=await jwt.sign({_id:user._id},"Arun@123",{expiresIn:"1d"});
        // console.log(token,"aaaaaaaaaaaa")//create token  is code ko ham offload kar dete h to user Schemas ko 

        const token=await user.getJWT();
     
        //And the token  to cookie and send the response 
        
       // res.cookie("token","djkhkjhkdjhkjhahjk")

        res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)})



         // res.send("Login Successfully");
          res.send(user);
    }
    else{
        throw new Error("Password is not correct ")//never say email is not correct this is leak information alwayas invalid creadentials
    }

    }
    catch(err){
          res.status(404).send("ERROR:"+err.message)
    }
})

authRouter.post("/logout",async (req,res)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
  });
  res.send("logout successfully"); 
})

module.exports=authRouter;
