const allowedOrigin=require('./allowedOrigin');
const corsOptions={
    origin: (origin,callback)=>{
        if(allowedOrigin.indexOf(origin)!== -1 || !origin){
            callback(null,true);
        }
        else{
            callback(new Error('Request  Not allowed by CORS'));  
           
        }
    },
    optionsSuccessStatus:200
}
//Cross Origin Resource Sharing
module.exports=corsOptions;