const jwt = require("jsonwebtoken");


const jwtMiddleware=(req,res,next)=>{
    console.log("verifying token:using jwt middleware");
    const token=req.headers['authorization'].split(' ')[1]
    console.log(token)
   
    try{
        const jwtResponse = jwt.verify(token,"superscretkey12345")
        console.log("==jwtResponse==");
        console.log(jwtResponse)
        req.payload = jwtResponse.userId;
        next();
       

    }catch(err){
        res.status(401).json("authorization failed,please Login")
  
    }
    
}

module.exports=jwtMiddleware;