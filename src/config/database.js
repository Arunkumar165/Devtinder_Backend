const mongoose=require("mongoose");

const connectDB=async ()=>{

    await mongoose.connect("mongodb+srv://Arun:mohan@arun.bewhyqa.mongodb.net/devTinder")

}


//devTinder.users.createIndex({ email: 1 }, { unique: true })

module.exports=connectDB

// connectDB()
// .then(()=>{
//     console.log("database connection established")
// })
// .catch((err)=>{
//     console.error("database is not connected ");
// })













// const mongoose=require("mongoose");

// const connectDB=async ()=>{
//     await mongoose.connect("mongodb+srv://Arun:mohan@arun.bewhyqa.mongodb.net/Hello")

// }

// connectDB()
// .then(()=>{
//     console.log("database connection established")
// })
// .catch((err)=>{
//     console.error("database is not connected ");
// })



//in this code phele server connect ho rha fir database connect ho rha .main baat yeh h ki phele database connect hona 
//chahye ok isklie ham connectdb ko export krengen and import krenge app.js me 

// const mongoose=require("mongoose");
// mongoose.connect("mongodb+srv://Arun:mohan@arun.bewhyqa.mongodb.net/")