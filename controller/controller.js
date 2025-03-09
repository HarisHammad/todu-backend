const taskModle = require('../model/task-model')
const User = require('../model/user-model')
// const bcrypt = require('bcrypt')
const register =async(req,res)=>{
try {
    const {username,email,password,isAdmin} = req.body
    const userExists = await User.findOne({email})
   if(userExists){
  return  res.status(401).json({message:"Email Already Exists "})
   }
    const newUser = await User.create({username,email,password,isAdmin})
    return res.status(200).json(
        {message:"Registraion succsessful",
        Token:await newUser.genreteToken(),
        userid:newUser._id.toString(),
        isAdmin:newUser.isAdmin
        })
} catch (error) {
    res.status(400).json({msg:'error from regiter'})
    console.log(error);
    
}
}


const login =async (req,res)=>{
try {
    const {email,password} = req.body
    const userExists = await User.findOne({email})
    if(!userExists){
        return res.status(400).json({message:"Email not registered. Please sign up first."})
    }
   const user = await userExists.comparePassword(password)
   if(user){
    return res.status(200).json({
        msg:'login Successfull',
        Token:await userExists.genreteToken(),
        userid:userExists._id,
        isAdmin:userExists.isAdmin
    })
   }else{
     return res.status(400).json({
        message:'Invalid password'
   })
}
} catch (error) {
    res.status(400).json({msg:'error from Login'})
    console.log(error);  
}
}



const user =async(req,res)=>{
    try {
      const userData = req.user;
    //   console.log("user ", userData);
       return res.status(200).json({ userData })
    } catch (error) {
      console.log(`error from user route%${error}`);
      
    }
  }







const task = async(req,res)=>{
    try {
        const {tasks, id}= req.body;
        const userExistid = await User.findOne({_id:id})
        
        
        if(!userExistid){
          return  res.status(400).json({message:'id not found'})
        }
        
        if(userExistid){
        const newTask = await taskModle.create({tasks,user:id})
        userExistid.taskModle.push(newTask.id)
        await userExistid.save()
        return res.status(200).json({newTask})
        }
    
        
    } catch (error) {
        console.log('task backend',error);
        
    }
}



const userData=async(req,res)=>{
    try {
        const userData = await taskModle.find({user:req.params.id})
        res.status(200).json({userData})
        
    } catch (error) {
        res.status(400).json({msg:'error from  userdata'})
        console.log(error); 
    }
    }


    const deleteData = async(req,res)=>{
        try {
            const userExist = await User.findByIdAndUpdate({_id:req.params.id},
                {$pull:{taskModle:req.params.taskid}}
            )
            if(!userExist){
                return  res.status(400).json({message:'id not found'})
              }
            if(userExist){
                await taskModle.findByIdAndDelete(req.params.taskid)
                return res.status(200).json({message:'task delete'})
            }

        } catch (error) {
            console.log(error);
            
        }
    }
    
module.exports={register,login,userData,task,deleteData,user}