require('dotenv').config()
const cors = require('cors')
const express = require('express');
const router = require('./router/router')
const adminRouter = require('./router/AdminRoute')
const ConnectDb = require('./utils/db')
const corsOption={
    origin: 'https://todu-front.vercel.app', 
    methods: 'GET,POST,DELETE,PATCH,PUT,HEAD',
    credentials:true
}
const app = express();
app.use(cors(corsOption))
app.use(express.json())
app.use('/api',router)
app.use('/api',adminRouter)







const PORT = 3000;
ConnectDb().then(()=>{
app.listen(PORT,()=>{
console.log('server running at this port',PORT);
}) })

module.exports = app;
