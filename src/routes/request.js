const  express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const User=require("../models/user")
const ConnectionRequest=require("../models/connectionRequest");




requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
    
try{
   
    const fromUserId =req.user._id;
     const toUserId =req.params.toUserId;
      const status =req.params.status;
      const allowedStatus=["ignored","interested"];

      if(!allowedStatus.includes(status)){
        return res.status(404).json({message:"Invalid Status type:"+ status});

      };

      const toUser=await User.findById(toUserId)
      if(!toUser){
          return res.status(404).json({message:"User is found"});// ye vala code connection request me koi unknow id se connection na bane;
      }
      //if there is existing ConnectionRequest
      const existingConnectionRequest=await ConnectionRequest.findOne({
        // fromUserId:fromUserId,
        // toUserId:toUserId    down vala code ase likha gya h ;$or is mongo db things and fromUserId send connection to toUserId and it cant send reverse and again connection


        $or:[
          {fromUserId,toUserId},
          {fromUserId:toUserId,toUserId:fromUserId},
        ]

       
      })
       
      if(existingConnectionRequest){
          return res
                   .status(404)
                   .send({message:"Connection Request Already exist"});
      }


      console.log(fromUserId,toUserId,status,"sssssssssssss")
      const connectionRequest=new ConnectionRequest({
        fromUserId,
        toUserId,
        status
      });

      const data =await connectionRequest.save();

      res.json({
         // message:"Connection Request Sent Successfully",
         message:req.user.firstName+"is "+ status + " in "+ toUser.firstName,
          data,

      });
  //  res.send(data)
    
}
catch(err){

      res.status(400).send("ERROR: "+ err.message);
}
    
    
})


module.exports=requestRouter;




// requestRouter.post("/sendConnectionRequest",userAuth,async (req,res)=>{
//     //console.log("sending connection request")
    
//     const user =req.user;
//     //sending the connection request
      
//     res.send(user.firstName + " send Connectoin Request ");
    
// })

// module.exports=requestRouter;






