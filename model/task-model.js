const {Schema,model,} = require('mongoose')
const mongoose = require('mongoose');

const taskSchema = new Schema ({
    tasks:{type:String},
    user:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }]
})
const taskModle = new model('taskModle',taskSchema)
module.exports=taskModle