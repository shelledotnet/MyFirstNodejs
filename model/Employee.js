const mongoose = require('mongoose'); //elegant mongodb object modeling for node.js
const Schema=mongoose.Schema;

const employeeSchema=new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    DateCreated:{
        type: Date,
        default:Date.now
    }
    
});

module.exports=mongoose.model('Employee',employeeSchema);