const logEvents=require('./logEvents');
const {v4:uuid}=require('uuid');

const errorHandler=(err,req,res,next)=>{
    let guid=uuid();
    logEvents(`${err.name}: ${err.message}`,'errLog.txt',guid);
    console.error(err.stack)
    res.status(500).send({'code':500,'description':'issue completing request','ref':guid});
}

module.exports=errorHandler;