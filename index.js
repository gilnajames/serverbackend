const router = require('./Routes/router')
const jwtMiddleware=require('./middlewares/jwtMiddleware')

//1)import dotenv
require('dotenv').config()

//import express
const express =require('express')



// import connection
require('./DB/connections')

// import corse to the created server
const cors=require('cors')

//create server 
const backend =express();

 //Apply corse to the created server
 backend.use(cors())

//use a middleware called express.json() to convert json data to js object
backend.use(express.json())
// backend.use(jwtMiddleware)
backend.use(router)
//export uploads folder
backend.use('/uploads',express.static('./uploads'))

 // define port number
 const PORT = 4000 || process.env.PORT

 //run the server
 backend.listen(PORT,()=>{
    console.log(`server is UP and runing in PORT ${PORT}`);
})

backend.get('/',(req,res)=>{
    res.send(" project is runing in port 4000")
})
