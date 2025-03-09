const bcrypt =require('bcrypt.js')
const jwt =require('jsonwebtoken')
const {Schema,model} = require('mongoose');
const mongoose = require('mongoose');
const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    taskModle:[{
            type:mongoose.Types.ObjectId,
            ref:'taskModle'
        }]
    

}) 

userSchema.pre('save', async function (next){
    if(!this.isModified('password'))
        next()
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(this.password,saltRound)
        this.password=hash_password
    } catch (error) {
        console.log('Eror from pre userscema',error);
        
    }
})



userSchema.methods.comparePassword = async function (password){
    return bcrypt.compare(password,this.password)
}



userSchema.methods.genreteToken = async function (){
    try {
        return jwt.sign({
            userid:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin
        },
    process.env.JWT_SECRET_TOKEN,
    {
        expiresIn:'30d'
    }
    )
    } catch (error) {
        console.log('Eroror from genrete token',error);
    }
}



const User = new model('User',userSchema)
module.exports=User