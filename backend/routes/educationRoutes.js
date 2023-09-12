const {
    addEducation,
    getAllEducations,
    getSingleEducation,
    updateEducation,
    deleteAllEducations,
    deleteSingleEducation

}=require("../controllers/educationController.js")
const bodyParser=require("../utils/bodyParser.js")
const validator=require("validator")
const jwt=require("jsonwebtoken")
require("dotenv").config()


module.exports=async({req,res,completeUrl,DBcon,verifiedUser})=>{
    const id=completeUrl.split('/')[2];

    
   // check for valid id
   if(id && !validator.isNumeric(id)){
       return inValidStatus(res);
   }

    //     Redirect to routes
   if(req.method==='GET' && completeUrl=='api/education/')
   {
        // get all request
        console.log("get all")
        const obj={
         res,DBcon,verifiedUser
        }
        getAllEducations(obj)

   }
   else if(req.method==='GET' && completeUrl!='api/education/')
   {
        // get single request with id

        const obj={
         res,DBcon,id,verifiedUser
        }
        getSingleEducation(obj)
   }
   else if(req.method==='POST' && completeUrl=='api/education/')
   {
        // add case
        const body= await bodyParser(req);
       
       const obj={
         res,
         body,
         DBcon,
         verifiedUser
       }
       
       if( !Isvalidbody(body) || !validate(body))
        {
            return inValidStatus(res);
        }
       addEducation(obj)

   }
   else if(req.method==='PUT' && completeUrl!='api/education/')
   {
        // update with id
        const body= await bodyParser(req);
        const obj={
         res,
         body,
         id,
         DBcon,
         verifiedUser
       }
       if( !Isvalidbody(body) || !validate(body))
       {
           return inValidStatus(res);
       }
        updateEducation(obj)
   }
   else if(req.method==='DELETE' && completeUrl=='api/education/')
   {
        // delete all case
        console.log("delete all")
        const obj={
         res,
         DBcon,
         verifiedUser
        }
        deleteAllEducations(obj)
   }    
   else if(req.method==='DELETE' && completeUrl!='api/education/')
   {
        // delete single case
        console.log("delete with id")
        const obj={
         res,
         id,
         DBcon,
         verifiedUser
       }
        deleteSingleEducation(obj)
   }
   else
   {
        notFoundStatus(res)
   }

}

const inValidStatus=(res)=>{
     res.writeHead(400,{ "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE",'Content-Type': 'text/html' });
     res.write(JSON.stringify({
          message:"invalid request"
      }))
     return res.end()
 }
 
 const notFoundStatus=(res)=>{
    
     res.writeHead(404,{ "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE",'Content-Type': 'text/html' });
     res.write(JSON.stringify({
          message:"404 not found"
      }))
          return res.end()
 }
 


const validateDate=(dt)=>{
     return !isNaN(new Date(dt))
 }
const validate=(obj)=>{
    // validate date and year ( user send valid year count based on sDate and eDate)
    return validateDate(obj.start_date) && validateDate(obj.end_date);
}


// check input body

const Isvalidbody = (body) => {
     const { institute_name,degree,location, start_date, end_date,description } = body;
     // check validate input 

     const check = [null, undefined].includes(institute_name) || 
     [null, undefined].includes(degree) || [null, undefined].includes(location) || 
     [null, undefined].includes(start_date) || [null, undefined].includes(end_date) 
     || [null, undefined].includes(description);

     const length=Object.keys(body).length===6;
     
     if (check || !length) {
          return false;
     }
     return true;
}