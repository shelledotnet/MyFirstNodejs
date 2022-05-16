const express=require('express');
const app=express();
const default404=app.get('/*',(req,res)=>{
   
    // res.status(404).sendFile(path.join(__dirname,'views','404.html'));
    res.status(404).send({'code':404,'description':'failed'});
 })

 module.exports=default404;