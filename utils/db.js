const mongoose = require('mongoose');
const URI =process.env.MONGO_URI
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