const path=require('path')
const fs=require('fs')
const {format}=require('date-fns');
const {v4: uuid}=require('uuid');
const fsPromise=require('fs').promises;  //all functions in promise hee are asynchnoze

const fcreate=(a)=>{
    if(!fs.existsSync(`./${a}`)){
        fs.mkdir(`./${a}`,(err)=>{
            if(err)throw err;
        });
    }
}



const fileOps = async () =>{
    try {
        var lgs='Log';
        const data=await fsPromise.readFile(path.join(__dirname,'birtday.txt'),'utf8');
        fcreate(lgs);
        await fsPromise.appendFile(path.join(__dirname,lgs,'logs.txt'),`\n\nRequest reading  : ${data} \t ${format(new Date(),'yyyyMMdd\tHH:mm:ss')} \t ${uuid()}`);
        console.log(data);
    }catch(err){
        await fsPromise.appendFile(path.join(__dirname,lgs,'logs.txt'),`\n\nissue completing request : ${err.name} \t ${err.message}\t ${format(new Date(),'yyyyMMdd\tHH:mm:ss')} \t ${uuid()}`);
       console.error('unable to read file:');
    }
}

fileOps();








//fs.readFile('./birtday.txt','utf8',(err,data)=>{
/* fs.readFile(path.join(__dirname,'birtday.txt'),'utf8',(err,data)=>{
    if(!err)console.log(data);
    else throw err;
    
}) */

/* fs.writeFile(path.join(__dirname,'file','read.txt'),'loving this nodejs',(err)=>{
    if(err) throw err;
    console.log('operation completed ');
   
}) */

/* fs.writeFile(path.join(__dirname,'Log','log.txt'),'logging request and response',(err)=>{
    if(err) throw err;
    console.log('operation loged ');
    fs.appendFile(path.join(__dirname,'Log','log.txt'),'\n\nusing node to log',(err)=>{
        if(err) throw err;
        console.log('operation append to logg');
    })
}) */

/* fs.appendFile(path.join(__dirname,'Log','log.txt'),'logging request and response',(err)=>{
    if(err) throw err;
    console.log('operation loged');
}) */

//exit the application on uncaught errors
process.on('uncaughtException',err=>{
    console.error(`issue completing request : ${err}`);
    process.exit(1);
})
