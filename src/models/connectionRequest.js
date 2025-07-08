
const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({

    fromUserId:{
         type:mongoose.Schema.Types.ObjectId,
         required:true
    }
    ,
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }

},{
    timestamps:true 
})

//down line vala code create compound index fromUserId,toUserId
connectionRequestSchema.index({fromUserId:1,toUserId:1})  //index ka use basically millions of data h ok like virat kohli bhot sare h unko find karna difficult hota so asani se find karne ke liye ...

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    //check if the fromUserId is same as toUserId and ye pre method data ko save hone se phele check karta h 
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
                    throw new Error("Cannot send connection request to youself")
    }
    next();//next function use kiya kuki this is middleware 

})

const ConnectionRequestModel=new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
)
module.exports=ConnectionRequestModel;






