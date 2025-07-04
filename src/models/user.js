

const mongoose=require("mongoose");

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const validator=require("validator");
const userSchema= new mongoose.Schema({
      
    firstName:{
        type:String,
 
        minLength:4,
        maxLength:10
    },
    lastName:{
        type:String,
         
    },
    emailId:{
        type:String,
         required:true,
          unique:true,
          lowercase:true,
          validate(value){
                   if(!validator.isEmail(value) ){
                    throw new Error("this is invalid email ")

                   }
          }
    },
    password:{
        type:String,
          required:true,
                  validate(value){
                   if(!validator.isStrongPassword(value) ){
                    throw new Error("Enter your  Strong Password " + value)

                   }
          }
    },
    age:{
        type:Number,
          min:18,
    },
    gender:{
        type:String,
          validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not vaalid ");//ye vala validation only hota h POST not in Update jha hamne findByIdAndUpdate h vha runValidators true karna pdega;

            }

          }
    },
    photoUrl:{
        type:String,
        default:"https://gimgs2.nohat.cc/thumb/f/640/flat-person-icon-download-dummy-man--m2i8d3i8N4d3N4K9.jpg",
               validate(value){
                   if(!validator.isURL(value) ){
                    throw new Error("this is invalid url ")

                   }
          }
    },
    about:{
       type:String,
       default:"this is defalut abut the user",
    },
    skills:{
        type:[String],
    }

},{
    timestamps:true
})

  userSchema.methods.getJWT=async function (){
            const user=this;
            const token =await jwt.sign({_id:user._id},"Arun@123",{
                expiresIn:"7d",
            })

            return token;
        }
    
        userSchema.methods.validatePassword=async function (passwordInputByUser){
            const user=this;
            const passwordHash=user.password;

             const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);//hamare db me user.password
                return isPasswordValid;
        }    


module.exports=mongoose.model("User",userSchema);












// const mongoose=require("mongoose");

// const validator=require("validator");
// const userSchema= new mongoose.Schema({
      
//     firstName:{
//         type:String,
 
//         minLength:4,
//         maxLength:10
//     },
//     lastName:{
//         type:String,
         
//     },
//     emailId:{
//         type:String,
//          required:true,
//           unique:true,
//           lowercase:true,
//           validate(value){
//                    if(!validator.isEmail(value) ){
//                     throw new Error("this is invalid email ")

//                    }
//           }
//     },
//     password:{
//         type:String,
//           required:true,
//                   validate(value){
//                    if(!validator.isStrongPassword(value) ){
//                     throw new Error("Enter your  Strong Password " + value)

//                    }
//           }
//     },
//     age:{
//         type:Number,
//           min:18,
//     },
//     gender:{
//         type:String,
//           validate(value){
//             if(!["male","female","others"].includes(value)){
//                 throw new Error("Gender data is not vaalid ");//ye vala validation only hota h POST not in Update jha hamne findByIdAndUpdate h vha runValidators true karna pdega;

//             }

//           }
//     },
//     photoUrl:{
//         type:String,
//         default:"https://gimgs2.nohat.cc/thumb/f/640/flat-person-icon-download-dummy-man--m2i8d3i8N4d3N4K9.jpg",
//                validate(value){
//                    if(!validator.isURL(value) ){
//                     throw new Error("this is invalid url ")

//                    }
//           }
//     },
//     about:{
//        type:String,
//        default:"this is defalut abut the user",
//     },
//     skills:{
//         type:[String],
//     }

// },{
//     timestamps:true
// })

// module.exports=mongoose.model("User",userSchema);
//uppercode and down code is same
// const UserModel=mongoose.model("User",userSchema);
// module.exports=UserModel;