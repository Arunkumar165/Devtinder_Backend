
const  express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const {validateEditProfileData}=require("../utils/validation");



profileRouter.get("/profile/view", userAuth,async (req,res)=>{
  try{
    
    //const cookies=req.cookies;
//     console.log(cookies,"cokkies")

//     const {token}=cookies;
//     //validatie the token

//     if(!token)
//     {
//           throw new Error("Invalid Creadentials");
//     }

//     const decodedMessage=await jwt.verify(token,"Arun@123")


//    console.log(decodedMessage);

//    const {_id}=decodedMessage;
//     //console.log(cookies);
//     console.log("Logged In User is :"+_id);

//upper vala code isliye comment kar duya kuki iska code hamne auth.js me likh rkha  h 

    // const user=await User.findById(_id);
  
    const user=req.user;

    if(!user){
       throw new Error("User does not Exist ");
    }

   res.send(user);
 }
 catch(err){
    res.status(404).send("ERROR :" + err.message) ;
 }
    //res.send("reading cookies")

})

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    console.log("PATCH /profile/edit called");  // 🔍 Add this
try{

   if(!validateEditProfileData(req)){
        throw new Error("Envalid Edit Request");
       // return res.status(400).send()
   }
   const loggedInUser =req.user;

   // loggedInUser.firstName=req.body.firstName;
   // loggedInUser.lastName=req.body.firstName;      is trh se update kar sakte h neeche loop liya h ;
   
   
   Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key])); 
   
   await loggedInUser.save();
   
  // res.send(`${loggedInUser.firstName}, your profile is updating `,"sssssssssss")
   //beautifull way me respose kaise create kiya jata ;
   res.json({message:`${loggedInUser.firstName},your profile is updating`,data:loggedInUser})

}
catch(err){
   res.status(404).send("ERROR:"+ err.message);
}
})


module.exports=profileRouter;
