const {
    addExperience,
    getAllExperiences,
    getSingleExperience,
    updateExperience,
    deleteAllExperiences,
    deleteSingleExperience

}=require("../controllers/experienceController.js")
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
   if(req.method==='GET' && completeUrl=='api/experience/')
   {
        // get all request
        console.log("get all")
        const obj={
         res,DBcon,verifiedUser
        }
        getAllExperiences(obj)

   }
   else if(req.method==='GET' && completeUrl!='api/experience/')
   {
        // get single request with id
        const obj={
         res,DBcon,id,verifiedUser
        }
        getSingleExperience(obj)
   }
   else if(req.method==='POST' && completeUrl=='api/experience/')
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
       addExperience(obj)

   }
   else if(req.method==='PUT' && completeUrl!='api/experience/')
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
        updateExperience(obj)
   }
   else if(req.method==='DELETE' && completeUrl=='api/experience/')
   {
        // delete all case
        console.log("delete all")
        const obj={
         res,
         DBcon,
         verifiedUser
        }
        deleteAllExperiences(obj)
   }    
   else if(req.method==='DELETE' && completeUrl!='api/experience/')
   {
        // delete single case
        console.log("delete with id")
        const obj={
         res,
         id,
         DBcon,
         verifiedUser
       }
        deleteSingleExperience(obj)
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
    let sDate=new Date(obj.start_date)
    let eDate=new Date(obj.end_date)
    let year=eDate.getFullYear()-sDate.getFullYear();
    // validate date and year ( user send valid year count based on sDate and eDate)
    return validateDate(obj.start_date) && validateDate(obj.end_date) && year===obj.years;
}




// check input body

const Isvalidbody = (body) => {
     const { company_name,role, start_date, end_date, years,description } = body;
     // check validate input

     const check = [null, undefined].includes(company_name) || 
     [null, undefined].includes(role) || [null, undefined].includes(start_date) || 
     [null, undefined].includes(end_date) || [null, undefined].includes(years) 
     || [null, undefined].includes(description);

     const length=Object.keys(body).length===6;
     
     if (check || !length) {
          return false;
     }
     return true;
}

