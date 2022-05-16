const {format,getDate,getMonth,toDate}=require('date-fns');
const {v4: uuid}=require('uuid');

console.log(format(new Date(),'yyyyMMdd:HH:mm:ss'));
console.log(getDate(new Date(),'yyyyMMdd:HH:mm:ss'));
console.log(toDate(new Date()));
console.log(getMonth(new Date()));
console.log(uuid().toUpperCase().substring(0,8))
console.log();

