//#region Constant
require('dotenv').config();
const mongoose = require('mongoose'); //elegant mongodb object modeling for node.js
const connectDB=require('./Config/dbConn');
const express=require('express');
const app=express();
const {v4:uuid}=require('uuid');
const serialize = require('serialize-javascript');
const cors=require('cors');
const http=require('http');
const path=require('path');
const logEvents=require('./middleware/logEvents');
const auditLog=require('./middleware/auditLog');
const errorHandler=require('./middleware/errorHandler');
const default404=require('./middleware/default404');
const corsOptions=require('./Config/corsOptions');
const cookieParser=require('cookie-parser');
const verifyJWT=require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;
let guid=uuid();
//#endregion
//#region Middleware

//Connect to MongoDB by invoking the unanimouse function
connectDB();

//custom middlware logger
app.use(auditLog);

//Handle options credentials check - before CORS!
//and fectch cookies credentials requirement
app.use(credentials);


//Cross Origin Resource Sharing
//app.use(cors());
app.use(cors(corsOptions));

//buit-in middleware to handle urlencoded data
//in other words, form data:
//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

//buit-in middleware for json
app.use(express.json());

//middleware for cookie
app.use(cookieParser());

//buit-in middleware that serve static files (images,css,video,files)
app.use(express.static(path.join(__dirname,'/public')));

app.use('/',require('./routes/root'));
app.use('/subdir',require('./routes/subdir'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh')); //this gives a new accessToken
app.use('/logOut',require('./routes/logOut')); //this terminates the referesh token

//app.use(verifyJWT);  //this verifyJWT middleware will affect resources down the line(this will definately affect all my exception handler)
app.use('/employees',require('./routes/api/employees'));
app.use('/users',require('./routes/api/users'));



//default directory middleware for url not found
app.use(default404);



mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    //we dont want to listen below for request without connected above datasource for resources
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
})

//Global Exception handler middleware
app.use(errorHandler);



//app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

//#endregion
