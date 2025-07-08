
const express=require("express");
const app=express();
const User = require("./models/user"); // ✅ ADD THIS LINE

//const User=require("./models/user");
const connectDB=require("./config/database");
//const {validateSignUpData}=require("./utils/validation");
//const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
//const jwt=require("jsonwebtoken");


app.use(express.json());//middlewared read req.body
app.use(cookieParser());//middilewarred read req.cookie

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDB()
.then( async ()=>{    
    console.log("database connection established","aaaaaaaaaaaaaaaaaa")
   
    try {
      await User.init(); // 🔒 Ensures index (emailId unique)  this try catch is from chat gpt for unique emailId
      console.log("✅ Indexes created successfully");
    } catch (indexErr) {
      console.error("❌ Index creation failed", indexErr.message);
    }

app.listen(3000,()=>{
    console.log("server is running successfully on port 3000","aaaaaaaaaaaaaaa")
})

})
.catch((err)=>{
    console.error("database is not connected ");
})

//6866097b4d552f05ca0fc56a














// const express=require("express");
// const app=express();

// const User=require("./models/user");
// const connectDB=require("./config/database");
// const {validateSignUpData}=require("./utils/validation");
// const bcrypt=require("bcrypt");
// const cookieParser=require("cookie-parser");
// const jwt=require("jsonwebtoken");
// const {userAuth}=require("./middlewares/auth");

// app.use(express.json());//middlewared read req.body
// app.use(cookieParser());//middilewarred read req.cookie

// app.post("/signup",async (req,res)=>{
//      console.log(req.body)
   
//      try{
   
//      // Validation of data
//     validateSignUpData(req);//yha validation.js me jo bhi code likha i have extracted all login in new file .jab koi bhi signup karega to sabse phele request ko validate krenge
     
//     //Encript the passworsd  

//       const {firstName,lastName,password,emailId}=req.body;

//     const passwordHash= await bcrypt.hash(password,10)
//      console.log(passwordHash);
// //     const user=new User(req.body);//is valine line ko change kar diya 
   
//    const user =new User({
//     firstName,
//     lastName,
//     emailId,
//     password:passwordHash
//    })
     
//           await user.save();
//           res.send("data is successfully addedd")
//      }
//      catch(err){
//         res.status(400).send("Error saving the use:"+ err.message);
//      }

// })
// //login  api 
// app.post("/login",async (req,res)=>{
//     try{
//            const {emailId,password}=req.body;
//            //const isPasswordValid=await bcrypt.compare("Elonmask@123","$2b$10$mFHIVoHSF.tFb6sbazKa1.W/BvYel3bB9tecIplhxEan8OF99ns5K") is trh se work karega phele actual password, and second is hash password 
//     const user =await User.findOne({emailId:emailId})//findOne find only one entry
//     if(!user){
//         //   throw new Error("EmailId is not Present in DB");
//          throw new Error("invalid credentials");


//     }
//    // const isPasswordValid=await bcrypt.compare(password,user.password);//hamare db me user.password
//    const isPasswordValid=await user.validatePassword(password);

//     if(isPasswordValid){
//         //create a jwt token

//         // const token=await jwt.sign({_id:user._id},"Arun@123",{expiresIn:"1d"});
//         // console.log(token,"aaaaaaaaaaaa")//create token  is code ko ham offload kar dete h to user Schemas ko 

//         const token=await user.getJWT();
     
//         //And the token  to cookie and send the response 
        
//        // res.cookie("token","djkhkjhkdjhkjhahjk")

//         res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)})



//           res.send("Login Successfully");
//     }
//     else{
//         throw new Error("Password is not correct ")//never say email is not correct this is leak information alwayas invalid creadentials
//     }

//     }
//     catch(err){
//           res.status(404).send("ERROR:"+err.message)
//     }
// })

// app.get("/profile", userAuth,async (req,res)=>{
//   try{
    
//     //const cookies=req.cookies;
// //     console.log(cookies,"cokkies")

// //     const {token}=cookies;
// //     //validatie the token

// //     if(!token)
// //     {
// //           throw new Error("Invalid Creadentials");
// //     }

// //     const decodedMessage=await jwt.verify(token,"Arun@123")


// //    console.log(decodedMessage);

// //    const {_id}=decodedMessage;
// //     //console.log(cookies);
// //     console.log("Logged In User is :"+_id);

// //upper vala code isliye comment kar duya kuki iska code hamne auth.js me likh rkha  h 

//     // const user=await User.findById(_id);
  
//     const user=req.user;

//     if(!user){
//        throw new Error("User does not Exist ");
//     }

//    res.send(user);
//  }
//  catch(err){
//     res.status(404).send("ERROR :" + err.message) ;
//  }
//     //res.send("reading cookies")

// })

// app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
//     //console.log("sending connection request")
    
//     const user =req.user;
//     //sending the connection request
      
//     res.send(user.firstName + " send Connectoin Request ");
    
// })
// //get user by emailId

// app.get("/user", userAuth,async (req,res)=>{

//     const email=req.body.emailId;
//     try{ 
//          const users= await User.findOne({emailId:email});           
//             if(users.length==0){
//                   res.status(404).send("user not exist in get api")
//             }
//             else{
//                   res.send(users)
//             }

//            // const users= await User.find({emailId:email});           
//             // if(users.length==0){
//             //       res.status(404).send("user not exist in get api")
//             // }
//             // else{
//             //       res.send(users)
//             // }



//             //this is get data from database in postman

//         //     {
    
//         // "emailId": "arsonvimal@gmail.com"
//         //    }
              
//     }
//     catch(err){
//         res.status(404).send("cant get data");
//     }
    

// })

// //get all the data from database

// app.get("/feed",async (req,res)=>{
//     try{

//      const users=await User.find({})
//      res.send(users)
//     }
//     catch(err){
            
//         res.status(404).send("data can get all data from users")
//     }
// })
// //Delete data from database 

// app.delete("/user",async (req,res)=>{
//     const userId= req.body.userId;
//     try{
//         const user=await User.findByIdAndDelete({_id:userId});
//         // const user=await User.findByIdAndDelete(userId);
//          res.send("data is deleted successfully")
//     }
//     catch(err){
//            res.status(401).send("something went wrong ");
//     }
//     // {
    
//     //     "userId": "6863e4ca6f6cb79ae1fea293"
//     //this is postman object to delete by id 
//     // }
//  })


// connectDB()
// .then(()=>{
//     console.log("database connection established","aaaaaaaaaaaaaaaaaa")
        
// app.listen(3000,()=>{
//     console.log("server is running successfully on port 3000","aaaaaaaaaaaaaaa")
// })

// })
// .catch((err)=>{
//     console.error("database is not connected ");
// })
















// app.patch("/user/:userId",async(req,res)=>{
//  //   http://localhost:3000/usr/6863e86d9b5c9a62f3aa0074
//     const userId=req.params?.userId;
//     const data=req.body;

//  //   const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"];

//     // {   userId:"dlkskjhsfjkkja"
//     //     "firstName":"kkkkk",
//     //     "lastName":"Arun",
//     //     "emailId":"MONGO@GMAIL.COM",
//     //     "password":"585558",
//     //     "age":85,
//     //     "gender":"male",
//     //     "skills":["chess"]
//     //     }

//       try{

//          const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"]; 

//            const isUpdateAllowed=Object.keys(data).every((k)=>
//     ALLOWED_UPDATES.includes(k)
//    // every key is present in ALLOWED_UPDATES
//     )
//   if(!isUpdateAllowed){
//           res.status(400).send("Update is not allowed ");
//       //  throw new Error("user cant updata due to validation")

//     }
       
//    if(data.skills.length>10){
//     throw new Error("data length is too much");

//    }

//         //await User.findByIdAndUpdate({_id:userId},data);
//       const user=  await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before",runValidators:true});
//     //  console.log(user,"udatingggggggggggggggggg");

//         res.send("data is updated successfully")
//     }
//     catch(err){
//          res.status(404).send("UPDATE FAIL "+ err.message)
//     }
// })


// connectDB()
// .then(()=>{
//     console.log("database connection established")
        
// app.listen(3000,()=>{
//     console.log("server is running successfully on port 3000")
// })

// })
// .catch((err)=>{
//     console.error("database is not connected ");
// })
















// const express=require("express");
// const app=express();

// const User=require("./models/user");
// const connectDB=require("./config/database");
// const {validateSignUpData}=require("./utils/validation");
// const bcrypt=require("bcrypt");
// const cookieParser=require("cookie-parser");
// const jwt=require("jsonwebtoken");
// const {userAuth}=require("./middlewares/auth");

// app.use(express.json());//middlewared read req.body
// app.use(cookieParser());//middilewarred read req.cookie

// app.post("/signup",async (req,res)=>{
//      console.log(req.body)
   
//      try{
   
//      // Validation of data
//     validateSignUpData(req);//yha validation.js me jo bhi code likha i have extracted all login in new file .jab koi bhi signup karega to sabse phele request ko validate krenge
     
//     //Encript the passworsd  

//       const {firstName,lastName,password,emailId}=req.body;

//     const passwordHash= await bcrypt.hash(password,10)
//      console.log(passwordHash);
// //     const user=new User(req.body);//is valine line ko change kar diya 
   
//    const user =new User({
//     firstName,
//     lastName,
//     emailId,
//     password:passwordHash
//    })
     
//           await user.save();
//           res.send("data is successfully addedd")
//      }
//      catch(err){
//         res.status(400).send("Error saving the use:"+ err.message);
//      }

// })
// //login  api 
// app.post("/login",async (req,res)=>{
//     try{
//            const {emailId,password}=req.body;
//            //const isPasswordValid=await bcrypt.compare("Elonmask@123","$2b$10$mFHIVoHSF.tFb6sbazKa1.W/BvYel3bB9tecIplhxEan8OF99ns5K") is trh se work karega phele actual password, and second is hash password 
//     const user =await User.findOne({emailId:emailId})//findOne find only one entry
//     if(!user){
//         //   throw new Error("EmailId is not Present in DB");
//          throw new Error("invalid credentials");


//     }
//     const isPasswordValid=await bcrypt.compare(password,user.password);//hamare db me user.password

//     if(isPasswordValid){
//         //create a jwt token
//         const token=await jwt.sign({_id:user._id},"Arun@123");
//         console.log(token,"aaaaaaaaaaaa")
//         //And the token  to cookie and send the response 
        
//        // res.cookie("token","djkhkjhkdjhkjhahjk")

//         res.cookie("token",token)



//           res.send("Login Successfully");
//     }
//     else{
//         throw new Error("Password is not correct ")//never say email is not correct this is leak information alwayas invalid creadentials
//     }

//     }
//     catch(err){
//           res.status(404).send("ERROR:"+err.message)
//     }
// })

// app.get("/profile", userAuth,async (req,res)=>{
//  try{   const cookies=req.cookies;
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
//     const user=await User.findById(_id);
//     console.log()
//     if(!user){
//        throw new Error("User does not Exist ");
//     }

//    res.send(user);
//  }
//  catch(err){
//     res.status(404).send("ERROR :" + err.message) ;
//  }
//     //res.send("reading cookies")

// })

// //get user by emailId

// app.get("/user", userAuth,async (req,res)=>{

//     const email=req.body.emailId;
//     try{ 
//          const users= await User.findOne({emailId:email});           
//             if(users.length==0){
//                   res.status(404).send("user not exist in get api")
//             }
//             else{
//                   res.send(users)
//             }

//            // const users= await User.find({emailId:email});           
//             // if(users.length==0){
//             //       res.status(404).send("user not exist in get api")
//             // }
//             // else{
//             //       res.send(users)
//             // }



//             //this is get data from database in postman

//         //     {
    
//         // "emailId": "arsonvimal@gmail.com"
//         //    }
              
//     }
//     catch(err){
//         res.status(404).send("cant get data");
//     }
    

// })

// //get all the data from database

// app.get("/feed",async (req,res)=>{
//     try{

//      const users=await User.find({})
//      res.send(users)
//     }
//     catch(err){
            
//         res.status(404).send("data can get all data from users")
//     }
// })
// //Delete data from database 

// app.delete("/user",async (req,res)=>{
//     const userId= req.body.userId;
//     try{
//         const user=await User.findByIdAndDelete({_id:userId});
//         // const user=await User.findByIdAndDelete(userId);
//          res.send("data is deleted successfully")
//     }
//     catch(err){
//            res.status(401).send("something went wrong ");
//     }
//     // {
    
//     //     "userId": "6863e4ca6f6cb79ae1fea293"
//     //this is postman object to delete by id 
//     // }
//  })







// app.patch("/user/:userId",async(req,res)=>{
//  //   http://localhost:3000/usr/6863e86d9b5c9a62f3aa0074
//     const userId=req.params?.userId;
//     const data=req.body;

//  //   const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"];

//     // {   userId:"dlkskjhsfjkkja"
//     //     "firstName":"kkkkk",
//     //     "lastName":"Arun",
//     //     "emailId":"MONGO@GMAIL.COM",
//     //     "password":"585558",
//     //     "age":85,
//     //     "gender":"male",
//     //     "skills":["chess"]
//     //     }

//       try{

//          const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"]; 

//            const isUpdateAllowed=Object.keys(data).every((k)=>
//     ALLOWED_UPDATES.includes(k)
//    // every key is present in ALLOWED_UPDATES
//     )
//   if(!isUpdateAllowed){
//           res.status(400).send("Update is not allowed ");
//       //  throw new Error("user cant updata due to validation")

//     }
       
//    if(data.skills.length>10){
//     throw new Error("data length is too much");

//    }

//         //await User.findByIdAndUpdate({_id:userId},data);
//       const user=  await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before",runValidators:true});
//     //  console.log(user,"udatingggggggggggggggggg");

//         res.send("data is updated successfully")
//     }
//     catch(err){
//          res.status(404).send("UPDATE FAIL "+ err.message)
//     }
// })

















































// const express=require("express");
// const app=express();

// const User=require("./models/user");
// const connectDB=require("./config/database");
// const {validateSignUpData}=require("./utils/validation");
// const bcrypt=require("bcrypt");


// app.use(express.json());

// app.post("/signup",async (req,res)=>{
//      console.log(req.body)
   
//      try{
   
//      // Validation of data
//     validateSignUpData(req);//yha validation.js me jo bhi code likha i have extracted all login in new file .jab koi bhi signup karega to sabse phele request ko validate krenge
     
//     //Encript the passworsd  

//       const {firstName,lastName,password,emailId}=req.body;

//     const passwordHash= await bcrypt.hash(password,10)
//      console.log(passwordHash);
// //     const user=new User(req.body);//is valine line ko change kar diya 
   
//    const user =new User({
//     firstName,
//     lastName,
//     emailId,
//     password:passwordHash
//    })
     
//           await user.save();
//           res.send("data is successfully addedd")
//      }
//      catch(err){
//         res.status(400).send("Error saving the use:"+ err.message);
//      }

// })
// //login  api 
// app.post("/login",async (req,res)=>{
//     try{
//            const {emailId,password}=req.body;
//            //const isPasswordValid=await bcrypt.compare("Elonmask@123","$2b$10$mFHIVoHSF.tFb6sbazKa1.W/BvYel3bB9tecIplhxEan8OF99ns5K") is trh se work karega phele actual password, and second is hash password 
//     const user =await User.findOne({emailId:emailId})//findOne find only one entry
//     if(!user){
//         //   throw new Error("EmailId is not Present in DB");
//          throw new Error("invalid credentials");


//     }
//     const isPasswordValid=await bcrypt.compare(password,user.password);//hamare db me user.password

//     if(isPasswordValid){
//           res.send("Login Successfully");
//     }
//     else{
//         throw new Error("Password is not correct ")//never say email is not correct this is leak information alwayas invalid creadentials
//     }

//     }
//     catch(err){
//           res.status(404).send("ERROR:"+err.message)
//     }
// })


// //get user by emailId

// app.get("/user",async (req,res)=>{

//     const email=req.body.emailId;
//     try{ 
//          const users= await User.findOne({emailId:email});           
//             if(users.length==0){
//                   res.status(404).send("user not exist in get api")
//             }
//             else{
//                   res.send(users)
//             }

//            // const users= await User.find({emailId:email});           
//             // if(users.length==0){
//             //       res.status(404).send("user not exist in get api")
//             // }
//             // else{
//             //       res.send(users)
//             // }



//             //this is get data from database in postman

//         //     {
    
//         // "emailId": "arsonvimal@gmail.com"
//         //    }
              
//     }
//     catch(err){
//         res.status(404).send("cant get data");
//     }
    

// })

// //get all the data from database

// app.get("/feed",async (req,res)=>{
//     try{

//      const users=await User.find({})
//      res.send(users)
//     }
//     catch(err){
            
//         res.status(404).send("data can get all data from users")
//     }
// })
// //Delete data from database 

// app.delete("/user",async (req,res)=>{
//     const userId= req.body.userId;
//     try{
//         const user=await User.findByIdAndDelete({_id:userId});
//         // const user=await User.findByIdAndDelete(userId);
//          res.send("data is deleted successfully")
//     }
//     catch(err){
//            res.status(401).send("something went wrong ");
//     }
//     // {
    
//     //     "userId": "6863e4ca6f6cb79ae1fea293"
//     //this is postman object to delete by id 
//     // }
//  })







// app.patch("/user/:userId",async(req,res)=>{
//  //   http://localhost:3000/usr/6863e86d9b5c9a62f3aa0074
//     const userId=req.params?.userId;
//     const data=req.body;

//  //   const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"];

//     // {   userId:"dlkskjhsfjkkja"
//     //     "firstName":"kkkkk",
//     //     "lastName":"Arun",
//     //     "emailId":"MONGO@GMAIL.COM",
//     //     "password":"585558",
//     //     "age":85,
//     //     "gender":"male",
//     //     "skills":["chess"]
//     //     }

//       try{

//          const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"]; 

//            const isUpdateAllowed=Object.keys(data).every((k)=>
//     ALLOWED_UPDATES.includes(k)
//    // every key is present in ALLOWED_UPDATES
//     )
//   if(!isUpdateAllowed){
//           res.status(400).send("Update is not allowed ");
//       //  throw new Error("user cant updata due to validation")

//     }
       
//    if(data.skills.length>10){
//     throw new Error("data length is too much");

//    }

//         //await User.findByIdAndUpdate({_id:userId},data);
//       const user=  await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before",runValidators:true});
//     //  console.log(user,"udatingggggggggggggggggg");

//         res.send("data is updated successfully")
//     }
//     catch(err){
//          res.status(404).send("UPDATE FAIL "+ err.message)
//     }
// })










//update the data  from database 

// app.patch("/user",async(req,res)=>{
//     const userId=req.body.userId;
//     const data=req.body;

//  //   const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"];

//     // {   userId:"dlkskjhsfjkkja"
//     //     "firstName":"kkkkk",
//     //     "lastName":"Arun",
//     //     "emailId":"MONGO@GMAIL.COM",
//     //     "password":"585558",
//     //     "age":85,
//     //     "gender":"male",
//     //     "skills":["chess"]
//     //     }

//       try{

//          const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"]; 

//            const isUpdateAllowed=Object.keys(data).every((k)=>
//     ALLOWED_UPDATES.includes(k)
//    // every key is present in ALLOWED_UPDATES
//     )
//   if(!isUpdateAllowed){
//           res.status(400).send("Update is not allowed ");
//       //  throw new Error("user cant updata due to validation")

//     }

//         //await User.findByIdAndUpdate({_id:userId},data);
//       const user=  await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before",runValidators:true});
//     //  console.log(user,"udatingggggggggggggggggg");

//         res.send("data is updated successfully")
//     }
//     catch(err){
//          res.status(404).send("UPDATE FAIL "+ err.message)
//     }
// })


// connectDB()
// .then(()=>{
//     console.log("database connection established")
        
// app.listen(3000,()=>{
//     console.log("server is running successfully on port 3000")
// })

// })
// .catch((err)=>{
//     console.error("database is not connected ");
// })


































// const express=require("express");
// const app=express();

// const User=require("./models/user");
// const connectDB=require("./config/database");
// const {validateSignUpData}=require("./utils/validation");
// const bcrypt=require("bcrypt");


// app.use(express.json());

// app.post("/signup",async (req,res)=>{
//      console.log(req.body)
   
//      try{
   
//      // Validation of data
//     validateSignUpData(req);//yha validation.js me jo bhi code likha i have extracted all login in new file 
     
//     //Encript the passworsd  

//       const {password}=req.body;

//     const passwordHash= await bcrypt.hash(password,10)
//      console.log(passwordHash);
//      const user=new User(req.body);
     
//           await user.save();
//           res.send("data is successfully addedd")
//      }
//      catch(err){
//         res.status(400).send("Error saving the use:"+ err.message);
//      }

// })
// //get user by emailId

// app.get("/user",async (req,res)=>{

//     const email=req.body.emailId;
//     try{ 
//          const users= await User.findOne({emailId:email});           
//             if(users.length==0){
//                   res.status(404).send("user not exist in get api")
//             }
//             else{
//                   res.send(users)
//             }

//            // const users= await User.find({emailId:email});           
//             // if(users.length==0){
//             //       res.status(404).send("user not exist in get api")
//             // }
//             // else{
//             //       res.send(users)
//             // }



//             //this is get data from database in postman

//         //     {
    
//         // "emailId": "arsonvimal@gmail.com"
//         //    }
              
//     }
//     catch(err){
//         res.status(404).send("cant get data");
//     }
    

// })

// //get all the data from database

// app.get("/feed",async (req,res)=>{
//     try{

//      const users=await User.find({})
//      res.send(users)
//     }
//     catch(err){
            
//         res.status(404).send("data can get all data from users")
//     }
// })
// //Delete data from database 

// app.delete("/user",async (req,res)=>{
//     const userId= req.body.userId;
//     try{
//         const user=await User.findByIdAndDelete({_id:userId});
//         // const user=await User.findByIdAndDelete(userId);
//          res.send("data is deleted successfully")
//     }
//     catch(err){
//            res.status(401).send("something went wrong ");
//     }
//     // {
    
//     //     "userId": "6863e4ca6f6cb79ae1fea293"
//     //this is postman object to delete by id 
//     // }
//  })







// app.patch("/user/:userId",async(req,res)=>{
//  //   http://localhost:3000/usr/6863e86d9b5c9a62f3aa0074
//     const userId=req.params?.userId;
//     const data=req.body;

//  //   const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"];

//     // {   userId:"dlkskjhsfjkkja"
//     //     "firstName":"kkkkk",
//     //     "lastName":"Arun",
//     //     "emailId":"MONGO@GMAIL.COM",
//     //     "password":"585558",
//     //     "age":85,
//     //     "gender":"male",
//     //     "skills":["chess"]
//     //     }

//       try{

//          const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"]; 

//            const isUpdateAllowed=Object.keys(data).every((k)=>
//     ALLOWED_UPDATES.includes(k)
//    // every key is present in ALLOWED_UPDATES
//     )
//   if(!isUpdateAllowed){
//           res.status(400).send("Update is not allowed ");
//       //  throw new Error("user cant updata due to validation")

//     }
       
//    if(data.skills.length>10){
//     throw new Error("data length is too much");

//    }

//         //await User.findByIdAndUpdate({_id:userId},data);
//       const user=  await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before",runValidators:true});
//     //  console.log(user,"udatingggggggggggggggggg");

//         res.send("data is updated successfully")
//     }
//     catch(err){
//          res.status(404).send("UPDATE FAIL "+ err.message)
//     }
// })










// //update the data  from database 

// // app.patch("/user",async(req,res)=>{
// //     const userId=req.body.userId;
// //     const data=req.body;

// //  //   const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"];

// //     // {   userId:"dlkskjhsfjkkja"
// //     //     "firstName":"kkkkk",
// //     //     "lastName":"Arun",
// //     //     "emailId":"MONGO@GMAIL.COM",
// //     //     "password":"585558",
// //     //     "age":85,
// //     //     "gender":"male",
// //     //     "skills":["chess"]
// //     //     }

// //       try{

// //          const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"]; 

// //            const isUpdateAllowed=Object.keys(data).every((k)=>
// //     ALLOWED_UPDATES.includes(k)
// //    // every key is present in ALLOWED_UPDATES
// //     )
// //   if(!isUpdateAllowed){
// //           res.status(400).send("Update is not allowed ");
// //       //  throw new Error("user cant updata due to validation")

// //     }

// //         //await User.findByIdAndUpdate({_id:userId},data);
// //       const user=  await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before",runValidators:true});
// //     //  console.log(user,"udatingggggggggggggggggg");

// //         res.send("data is updated successfully")
// //     }
// //     catch(err){
// //          res.status(404).send("UPDATE FAIL "+ err.message)
// //     }
// // })


// connectDB()
// .then(()=>{
//     console.log("database connection established")
        
// app.listen(3000,()=>{
//     console.log("server is running successfully on port 3000")
// })

// })
// .catch((err)=>{
//     console.error("database is not connected ");
// })




















// const express=require("express");
// const app=express();

// const User=require("./models/user")
// const connectDB=require("./config/database");


// app.post("/signup",async (req,res)=>{


//      const user=new User({
        
//             firstName:"viratkholi",
//         lastName:"sharma",
//         emailId:"abc@gmail.com",
//         password:"12jdkjkhkj3456",
//         age:"27",
//         gender:"male"


//      })


//    try {
//     await user.save();
//     res.send("data is added successfully")
//    }
//    catch(err){
//     res.status(404),send("Error saving the user")
//    }

// //  await user.save();
//   //most of mongoose function return promise  vese hamko user.save() ko try catch me rkhna h 

//   res.send("user added successfully");


//     // const userObj={
//     //     firstName:"ArunKalu",
//     //     lastName:"Kumar",
//     //     emailId:"arsonvimal@gmail.com",
//     //     password:"123456",
//     //     age:"27",
//     //     gender:"male"
//     // }
//     // const user=new User(userObj)
// })



// connectDB()
// .then(()=>{
//     console.log("database connection established")
        
// app.listen(3000,()=>{
//     console.log("server is running successfully on port 3000")
// })

// })
// .catch((err)=>{
//     console.error("database is not connected ");
// })

































// const express=require("express");
// const app=express();

// const connectDB=require("./config/database");


// const {adminAuth,userAuth}=require("./middlewares/auth");



// // app.use("/rount",[rh1,rh2,rh3]);
// // app.use("/rount2",[rh1,rh2],rh3);

// app.use("/",(err,req,res,next)=>{

//     if(err){
//          res.status(500).send("something is by midleware 401")
//     }
    
   
// })


// app.get("/error1",(req,res)=>{

//     // try{
//     //         throw new error("this is  throw new error ");
//     //         res.send("data is send");

//     // }
//     // catch (err){
//     //     res.status(401).send("this is status error")

//     // }
//     throw new Error("this is ");
//     res.send("checking error")
// })


// app.use("/",(err,req,res,next)=>{

//     if(err){
//          res.status(500).send("something is by midleware 401")
//     }
    
   
// })











// app.use("/senior/employ",adminAuth);//thi is way second way to how to middlewares 
// app.use("/user",userAuth);

// app.use("/user",userAuth,(req,res)=>{//ase bhi ham userAuth Authentication laga skte h ;
//     res.send("this is user")
// })
// app.get("/senior/employ/getData",(req,res)=>{
//     res.send("token is valid for senior person");
// })

// app.use("/manager",(req,res,next)=>{
//     const token="abc";
//     const validToken=token=="abc";
//     if(!validToken){
//         res.status(401).send("user is not valid")
//     }
//     else{
//         next()
//     }

// })

// app.get("/manager/getAllData",(req,res)=>{
//     res.send("manager is valid");

// })


// app.get("/user/getAllData",(req,res)=>{

// const token="abcd";
// const adminToken=token=="abc";
// if(adminToken){
//     res.send("user is valid ")
// }
// else{
//     res.status(401).send("unathorized token");
// }

// })

// app.get("/next3",[(res,req,next)=>{
//     console.log("1");
//     next()
// },
// (req,res,next)=>{
// console.log("2")
// next()
// },
// (res,req,next)=>{
//     console.log("3");
//     next()
// },
// (req,res,next)=>{
//     res.send("4")
// }]

// )

// app.get("/next2",(res,req,next)=>{
//     console.log("1")
//     next()
// },
// (req,res,next)=>{
// console.log("2")
// next()
// },
// (res,req,next)=>{
//     console.log("3");
//     next()
// },
// (req,res,next)=>{
//     res.send("4")
// }

// )


// app.get("/next",(req,res,next)=>{
//     console.log("this going to next");
//      next()
// },

//     (req,res)=>{
//         res.send("this is response next")
//     }



// )


// app.get("/user/:userId/:name/:classs",(req,res)=>{
//     console.log(req.params)
//     res.send({firstName:"Arun",lastName:"kumar"})
//    // http://localhost:3000/user/101/arun/5858
// })


// app.get("/user/:userId",(req,res)=>{
//     console.log(req.params)
//     res.send({firstName:"Arun",lastName:"kumar"})
// })

// app.get("/user",(req,res)=>{
//     console.log(req.query)
//     res.send({firstName:"Arun",lastName:"kumar"})
// })


// // app.get("/a/",(req,res)=>{
// //     res.send({firstName:"Arun",lastName:"kumar"})not working 
// // })




// connectDB()
// .then(()=>{
//     console.log("database connection established")
        
// app.listen(3000,()=>{
//     console.log("server is running successfully on port 3000")
// })

// })
// .catch((err)=>{
//     console.error("database is not connected ");
// })


























// const express=require("express");
// const app=express();

// const {adminAuth,userAuth}=require("./middlewares/auth");



// // app.use("/rount",[rh1,rh2,rh3]);
// // app.use("/rount2",[rh1,rh2],rh3);

// app.use("/senior/employ",adminAuth);//thi is way second way to how to middlewares 
// app.use("/user",userAuth);

// app.use("/user",userAuth,(req,res)=>{//ase bhi ham userAuth Authentication laga skte h ;
//     res.send("this is user")
// })
// app.get("/senior/employ/getData",(req,res)=>{
//     res.send("token is valid for senior person");
// })

// app.use("/manager",(req,res,next)=>{
//     const token="abc";
//     const validToken=token=="abc";
//     if(!validToken){
//         res.status(401).send("user is not valid")
//     }
//     else{
//         next()
//     }

// })

// app.get("/manager/getAllData",(req,res)=>{
//     res.send("manager is valid");

// })


// app.get("/user/getAllData",(req,res)=>{

// const token="abcd";
// const adminToken=token=="abc";
// if(adminToken){
//     res.send("user is valid ")
// }
// else{
//     res.status(401).send("unathorized token");
// }

// })

// app.get("/next3",[(res,req,next)=>{
//     console.log("1");
//     next()
// },
// (req,res,next)=>{
// console.log("2")
// next()
// },
// (res,req,next)=>{
//     console.log("3");
//     next()
// },
// (req,res,next)=>{
//     res.send("4")
// }]

// )

// app.get("/next2",(res,req,next)=>{
//     console.log("1")
//     next()
// },
// (req,res,next)=>{
// console.log("2")
// next()
// },
// (res,req,next)=>{
//     console.log("3");
//     next()
// },
// (req,res,next)=>{
//     res.send("4")
// }

// )


// app.get("/next",(req,res,next)=>{
//     console.log("this going to next");
//      next()
// },

//     (req,res)=>{
//         res.send("this is response next")
//     }



// )


// app.get("/user/:userId/:name/:classs",(req,res)=>{
//     console.log(req.params)
//     res.send({firstName:"Arun",lastName:"kumar"})
//    // http://localhost:3000/user/101/arun/5858
// })


// app.get("/user/:userId",(req,res)=>{
//     console.log(req.params)
//     res.send({firstName:"Arun",lastName:"kumar"})
// })

// app.get("/user",(req,res)=>{
//     console.log(req.query)
//     res.send({firstName:"Arun",lastName:"kumar"})
// })



// // app.get("/a/",(req,res)=>{
// //     res.send({firstName:"Arun",lastName:"kumar"})not working 
// // })


// app.listen(3000,()=>{
//     console.log("server is running successfully on port 3000")
// })

















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