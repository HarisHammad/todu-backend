const jwt = require('jsonwebtoken');
const User = require('../model/user-model');

const authMiddlewere =async (req,res,next)=>{
try {
    const token = req.header('Authorization');
    console.log(" Token:", token);
    if(!token){
      return  res.status(200).json({message:'Token not provided'})
    }
    const jwttoken = token.replace("Bearer",'').trim();
    const isVarifaid = jwt.verify(jwttoken,"To_Do_List");
    const userData = await User.findOne({email:isVarifaid.email}).select('-password');
     req.user = userData
     next()
} catch (error) {
  console.error("Auth Middleware Error:", error);
 return res.status(401).json({ message: "Invalid token" });
}
}
module.exports=authMiddlewere