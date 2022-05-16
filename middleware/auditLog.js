const logEvents=require('./logEvents');
const {v4:uuid}=require('uuid');

const auditLog=(req,res,next)=>{
    logEvents(`Request:${req.method}\t${req.headers.origin}\t${req.url}`,'auditLog.txt',uuid());
    next();
}

module.exports=auditLog;