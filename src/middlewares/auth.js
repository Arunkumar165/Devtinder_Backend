 const adminAuth=(req,res,next)=>{
    const token="abc";
    const adminToken=token=="abc";
    if(!adminToken){
       res.status(401).send("token is invalid")
    }
    else{
        next()
    }

}
const userAuth=(req,res,next)=>{
    const token="abc";
    const adminToken=token=="abdc";
    if(!adminToken){
       res.status(401).send("user token is invalid")
    }
    else{
        next()
    }

}

module.exports={
    adminAuth,
    userAuth
}