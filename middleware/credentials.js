const allowedOrigin=require('../Config/allowedOrigin');

const credentials=(req,res,next)=>{
    const origin = req.headers.origin;
    if(allowedOrigin.includes(origin)){
        res.header('Access-Control-Allow-Credentials',true);  //this set an extra layer of security on the application
    }
    next();
}

module.exports=credentials;