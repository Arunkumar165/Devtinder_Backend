22  -  use of regex in routes /a/,/.*fly$/
-  Reading the Query Params in the routes
-  Reading the dynamic routes

-  Multiple route handlers - Play with the code 
-  next()
-  next funtion and errors along with res.send()
-  app.use("/route",rh,[rh2,rh3],rh4,rh5);

-  what is middlewares? why do need middlewares
-  How express js basically handles requests behind the scenes 
-  Defference app.use and app.all
-  Write a dummy auth middlewares for admin 
-  write a dummy auth middlewares  for all user routes ,except /user/login
-  Difference app.use  and app.all
-  Error handling using app.use ("/",(err,req,res,next)={});
-  

-  Create a free Cluster on MongoDb on MongoDb official site  (Mongo Atlas)
-  Install Mongo db library
-  Connect your application to the database  "Connecton -url"/devTinder
-  Call the connectDB function and connect to database before starting application on 3000
-  Create a User Schema and user Model
-  Create POST/signup API calls from postman
-  Push some documents using API calls from postman
-  Error Handling using Try, catch
-  Js Object vs JSON (difference)
-  And the express.json middlewares to your app
-  Make your signup API dynamic to receive data from the end user(ye postman,browser ya khi se bhi user ho sakta h )
-  User.findOne with duplicate email ids,which object returned
-  API- GET user by email
-  API - feed API - GET /feed - get All the users from the databases
-  API - Get User by Id
-  Create a delete User api
-  Difference between patch and api 
-  APi - Update a user
-  Explore the Mongoose Documentation for Model methods
-  What are the options  in a Model.findOneAndUpdate method, explore more about it  
-  API - Update the User wiht emai Id

-  Create a delete user API 
-  Difference between PATCH and PUT
-  API update a user
-  Explore The Mongoose Documentation for Model methods
-  What are option in a Model.findOneAndUpdate method ,explore more about it 
-  API -Update the user with email ID

-  Explore schematype options from the documentation
-  and required ,unique ,lowercase,min,minLength,trim
-  Add default
-  Create a custom validate function for gender
-  Improve the DB Schema -PUT all appropriate validations on each field in Schema 
-  Add timestamps to the userSchema;
-  Add Api level validation on Patch request & signup post api
-  Data Sanitization - Add API validation for each field

-  Install validator
-  Explorer validator liabrary function and Use vlidator function for password,email,photoURL,
-  Never Trust req.body

-  Validate data in sign up API
-  install bcrypt package
-  Create PasswordHash using bcrypt.hash and save the user is encrypted password 
-  Create Login API
-  Compare passwords and throw errors if emails or passwords is invalid 

-  // Install Cookie- parse
-  just send a dummy  cookie to users 
-  Create GET/profile APi and check if you get the cookie back 
-  install jsonwebtoken
-  IN login API,after email and password validation , create a JWT token and send it to user in cookies;
-  Read the cookies inside your profile API and find the logged in user;
-  userAuth Middleware
-  Add the userAuth middleware ware in profile API and a new sendConnectionRequest API 
-  Set the Expiry of JWT token and cookies to 7 days ;
-  Create userSchema method to getJWT()
-  Create userSchema method to comparepassword(passwordInputUser);

-  Explore tinder APIs 
-  Create a list all API you think of in Dev Tinder
-  Group multiple routes under respective  routers
-  Create routes folder for managing auth,profile,request routers
-  Create authRouter,profileRouter,requestRouter
-  Import these routers in app.js
-  Create POST/logout API
-  Create PATCH /profile/edit
-  Create PATCH /profile/password API =>forgot password API
-  Make you validate all data in every POST,PATCH apis


-  Create Connection Request Schema;
-  Send Connnection Request API;
-  Proper Validation of data ;
-  Think about All CornerCase ;
-  $or query $and query in mongoose  
-  schema.pre("save") function 
-  Read More About index in MongoDB;
-  why do we need index in DB?
-  What is advantage and disadvantage of creating ?

















app.use(()=>{
  ager ham route "/head" ase paramerter nhi dete h to ye sabhi ke kliye work karta  
})