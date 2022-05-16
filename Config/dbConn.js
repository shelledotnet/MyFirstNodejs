const mongoose = require('mongoose'); //elegant mongodb object modeling for node.js

const connectDB=async () =>{
    try{
        await mongoose.connect(process.env.DATABASE_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
    }catch(err){
        console.error(err);
    }
}

module.exports=connectDB