const express=require("express");
const userRouter=express.Router();

const {userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest");
const USER_SAVE_DATA="firstName lastName photoUrl age gender about skills";
const User=require("../models/user");


//Get all the   pending connection request for the loggedIn user;

userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{
         const loggedInUser=req.user;

         const connectionRequests =await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
            }).populate("fromUserId","firstName lastName")// second argu me string and array bhi pass kar skate h 
       //  }).populate("fromUserId",["firstName","lastName"]);//ye line connectionRequest.js me ref:"User" in fromUserId 
       //}).populate("fromUserId");//is line se user colleection ka sara data a jyaga in connectionRequest.js me in fromUserId
       // console.log(connectionRequests,"ppppppppppppppppp")
         res.json({
            message: "Data fetch successfully",
            data: connectionRequests,
         })
    }
    catch(err){
            
        req.statusCode(400).send("ERROR: "+ err.message);
    }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    

    try{
            // Akshay=>Elon=>accepted
            // Elon=>Mark=>accepted

            const loggedInUser=req.user;
            const connectionRequests=await ConnectionRequest.find({
                $or:[
                    {toUserId:loggedInUser._id,status:"accepted"},
                    {fromUserId:loggedInUser._id,status:"accepted"},
                ]
            }).populate("fromUserId", USER_SAVE_DATA).populate("toUserId",USER_SAVE_DATA);

        //     connectionRequests se ye data aaa rha tha => {
        //     "_id": "686d4aa55b59a4a7d385fe9a",
        //     "fromUserId": {
        //         "_id": "686d00d396c547142766b392",
        //         "firstName": "pooja",
        //         "lastName": "kumar",
        //         "photoUrl": "https://gimgs2.nohat.cc/thumb/f/640/flat-person-icon-download-dummy-man--m2i8d3i8N4d3N4K9.jpg",
        //         "about": "this is defalut abut the user",
        //         "skills": []
        //     },
        //     "toUserId": "686bf8dbd04a2918460a1da5",
        //     "status": "accepted",
        //     "createdAt": "2025-07-08T16:43:17.616Z",
        //     "updatedAt": "2025-07-08T18:09:23.041Z",
        //     "__v": 0
        // }

        // but ham ye data chahte in =>  
        //      "fromUserId": {
        //         "_id": "686d00d396c547142766b392",
        //         "firstName": "pooja",
        //         "lastName": "kumar",
        //         "photoUrl": "https://gimgs2.nohat.cc/thumb/f/640/flat-person-icon-download-dummy-man--m2i8d3i8N4d3N4K9.jpg",
        //         "about": "this is defalut abut the user",
        //         "skills": []
        //     },

        //     ye sara array h pura data show nhi kar saktee h 

            const data =connectionRequests.map((row)=>{
            
                //  if(row.fromUserId._id==loggedInUser._id){//ham mongoose id ko is trh comare nhi kar sakte h ;
                  if(row.fromUserId._id.toString()==loggedInUser._id.toString()){
                      return    row.toUserId;
                 }
                return row.fromUserId
            
            });
               
            res.json({data})
          //  res.json({data:connectionRequests});



    }
    catch(err){
                res.status(404).send({message:err.message});
    }
})

userRouter.get("/feed",userAuth,async (req,res)=>{
    try{
         //user should see all the user cards except
         //0.his own card 
         //1. his connections
         //2.ignored people  
         //3.alredy sent the connection request

         //Example :Rahul=[Mark,Donald,MS Dhoni ,Virat]
         //Rahul->Akshay->rejected  Rahul->Elon->Accepted

         const loggedInUser=req.user;
          const page=parseInt(req.query.page) || 1;
             let limit=parseInt(req.query.limit) || 10;
          limit=limit>50?50:limit;
          const skip=(page-1)*limit;

         //find all connection requests (sent+received);
         const  connectionRequests=await ConnectionRequest.find({
            $or:[{formUserId:loggedInUser._id},{toUserId:loggedInUser._id}],
         })
         .select("formUserId toUserId")
         .populate("fromUserId","toUserId")
         .populate("toUserId","firstName");

          const hideUsersFromFeed=new Set();
          connectionRequests.forEach((req)=>{
            
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
          });

     //  console.log(hideUsersFromFeed);
   
       



        const users=await User.find({
      
            $and:[
               
              {_id:{$nin: Array.from(hideUsersFromFeed)}},//All are this comparison array $nin,$ne
              {_id:{$ne:loggedInUser._id}}, 
            ]

     //   }).select(USER_SAVE_DATA);
     }).select(USER_SAVE_DATA).skip(skip).limit(limit);

        //  res.send(connectionRequests);
        //   res.send(users);
         res.json({data:users});



    }
    catch(err){
             res.status(404).json({message:err.message});
    }

})



module.exports=userRouter;





