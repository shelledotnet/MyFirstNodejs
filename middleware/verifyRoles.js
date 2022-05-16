//the rest operator ... allow many parameter to be pass in an array
const verifyRoles=(...allowedRoles) =>{
    //a middleware unanimous functions that takes request,response and next 
    return (req,res,next)=>{
        //lets use optional chainning ?. if their is request he needs to have roles
        if(!req?.roles) return res.sendStatus(401); //unAuthorized
        const rolesArray=[...allowedRoles];  // the roles that was passed in

        /*
        console.log(rolesArray);// the  allowedRoles that was passed in
        console.log(req.roles);//this is an aray of user roles coming from jwt
        */
       
        //we are comparings (array req,roles from jwt ) include in the (allowedRoles) return true the (includes function return a boolean(t/f))
        //map function return an araray.. the find method filter the result ensuring is only returning true
        const result=req.roles.map(role=>rolesArray.includes(role)).find(val => val === true);
        if(!result) return res.sendStatus(401) //unAuthorized
        next(); //indicate lets move on everyhting is good will allow the route to be access

          
    }
}

module.exports=verifyRoles