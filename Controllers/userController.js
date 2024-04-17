
const users = require('../Models/userSchema')
const jwt=require("jsonwebtoken")


exports.register = async(req,res)=>{
    console.log("inside userController:register method");
    const {username,email,password}=req.body;
    console.log(username,email,password)
    try{
    //check whether email id is already exist in collection
    const existingUser = await users.findOne({email:email});
    console.log("===existing user====");
    console.log(existingUser)
        if(existingUser){
            //if user already registered by checking email
            res.status(406).json('account already exists,please Login')
        }
        else{
            const newUser = new users ({
                username:username,
                email:email,
                password:password
               

            })
            await newUser.save();
            res.status(200).json(newUser);
        }
   
}
catch(err){
     //for testing a sample response is configured
     res.status(401).json("registeration request failed due to",err)

}

}

exports.login=async(req,res)=>{
    console.log("inside login controller method")

    const {email,password}=req.body;
    console.log(email,password)

    try {
     
       const existingUser= await users.findOne({email:email,password:password})
        if(existingUser){
            const token =jwt.sign({userId:existingUser._id},"superscretkey12345")
            console.log(token)
            res.status(200).json({
                existingUser:existingUser,
                token:token
            })
        }
        else{
            res.status(406).json("invaid email id  or password")
           
        }
    }
    catch(err){
        res.status(401).json("login request is failed due to erro,errr")
    }
}
