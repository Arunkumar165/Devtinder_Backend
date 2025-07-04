const jwt =require("jsonwebtoken");
const User=require("../models/user");




const userAuth= async (req,res,next)=>{
    try{
              //Read the Token  from the req cookies

       const {token}=req.cookies;

       if(!token){
             throw new Error("Token is not valid");
       }
       const decodedObj=await jwt.verify(token,"Arun@123");
       const {_id}=decodedObj;
       const user =await User.findById(_id);
       if(!user){
         throw new Error("User is not found");

       }

       req.user=user;
      next();

              //Validate the Token
              //Find the User
    }
    catch(err){
        res.status(404).send("ERROR: "+err.message);
    }
    
}

module.exports={
    //adminAuth,
    userAuth
}













//  const adminAuth=(req,res,next)=>{
//     const token="abc";
//     const adminToken=token=="abc";
//     if(!adminToken){
//        res.status(401).send("token is invalid")
//     }
//     else{
//         next()
//     }

// }
// const userAuth=(req,res,next)=>{
//     const token="abc";
//     const adminToken=token=="abdc";
//     if(!adminToken){
//        res.status(401).send("user token is invalid")
//     }
//     else{
//         next()
//     }

// }

// module.exports={
//     adminAuth,
//     userAuth
// }