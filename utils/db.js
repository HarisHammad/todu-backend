const mongoose = require('mongoose');
const URI ="mongodb+srv://harishammadpak1:Harispak%401@cluster0.pl4yl.mongodb.net/To-Do-List?retryWrites=true&w=majority"
const ConnectDb = async()=>{
    try {
       await mongoose.connect(URI)
      console.log('server connect seccessfully');
      
    } catch (error) {
      console.log('server not connect');
        console.log(error);
        process.exit(0)
    }
}
module.exports=ConnectDb