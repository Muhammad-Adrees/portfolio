const {
    addProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteAllProjects,
    deleteSingleProject

}=require("../controllers/projectController.js")
const bodyParser=require("../utils/bodyParser.js")
const validator=require("validator")
require("dotenv").config()


module.exports=async({req,res,completeUrl,DBcon,verifiedUser})=>{
    const id=completeUrl.split('/')[2];
    
  
   // check for valid id
   if(id && !validator.isNumeric(id)){
       return inValidStatus(res);
   }

    //     Redirect to routes
   if(req.method==='GET' && completeUrl=='api/project/')
   {
        // get all request
        const obj={
         res,DBcon,verifiedUser
        }
        getAllProjects(obj)

   }
   else if(req.method==='GET' && completeUrl!='api/project/')
   {
        // get single request with id
        const obj={
         res,DBcon,id,verifiedUser
        }
        getSingleProject(obj)
   }
   else if(req.method==='POST' && completeUrl=='api/project/')
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
       addProject(obj)

   }
   else if(req.method==='PUT' && completeUrl!='api/project/')
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
        updateProject(obj)
   }
   else if(req.method==='DELETE' && completeUrl=='api/project/')
   {
        // delete all case
        console.log("delete all")
        const obj={
         res,
         DBcon,
         verifiedUser
        }
        deleteAllProjects(obj)
   }    
   else if(req.method==='DELETE' && completeUrl!='api/project/')
   {
        // delete single case
        console.log("delete with id")
        const obj={
         res,
         id,
         DBcon,
         verifiedUser
       }
        deleteSingleProject(obj)
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
     const { title,file,exe,source_link,live_link, start_date, end_date,description } = body;
     // check validate input

     const check = [null, undefined].includes(title) || 
     [null, undefined].includes(file) || [null, undefined].includes(exe) || 
     [null, undefined].includes(source_link) || [null, undefined].includes(live_link) 
     || [null, undefined].includes(start_date) || 
     [null, undefined].includes(end_date) || [null, undefined].includes(description);

     const length=Object.keys(body).length===8;
     
     if (check || !length) {
          return false;
     }
     return true;
}

