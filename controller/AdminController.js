const User = require("../model/user-model");

const Admin = async(req,res)=>{
try {
    const data = await User.find().select('-password')
    if(!data||data.length===0){
      return  res.status(401).json({message:'user not found'})
    }
    res.status(200).json(data)

} catch (error) {
    console.log('Eror From Admin',error); 
}
}

const DeleteUser = async(req,res)=>{
 await User.deleteOne({_id:req.params.id})
 return res.status(200).json({msg:'delete successfully'})
}


module.exports={Admin,DeleteUser}