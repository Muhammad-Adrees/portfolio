const {
    addProjectLanguage,
    getAllProjectLanguages,
    getSingleProjectLanguage,
    updateProjectLanguage,
    deleteAllProjectLanguages,
    deleteSingleProjectLanguage

}=require("../controllers/projectLanguageController.js")
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
   if(req.method==='GET' && completeUrl=='api/projectlanguage/')
   {
       
        // get all request
        const obj={
         res,DBcon,verifiedUser
        }
        getAllProjectLanguages(obj)

   }
   else if(req.method==='GET' && completeUrl!='api/projectlanguage/')
   {
        // get single request with id

        const obj={
         res,DBcon,id,verifiedUser
        }
        getSingleProjectLanguage(obj)
   }
   else if(req.method==='POST' && completeUrl=='api/projectlanguage/')
   {
        // add case
        
        const body= await bodyParser(req);

        // validate project_id
        const project_id = req.headers.project_id;

        // pending numeric check
        if(!project_id)
        {
            return inValidStatus(res);
        }
       const obj={
         res,
         body,
         DBcon,
         verifiedUser,project_id
       }
       
       if( !Isvalidbody(body) || !validate(body))
        {
            return inValidStatus(res);
        }
       addProjectLanguage(obj)

   }
   else if(req.method==='PUT' && completeUrl!='api/projectlanguage/')
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
        updateProjectLanguage(obj)
   }
   else if(req.method==='DELETE' && completeUrl=='api/projectlanguage/')
   {
        // validate project_id
        const project_id = req.headers.project_id;

        if(!project_id)
        {
            return inValidStatus(res);
        }
        // delete all case
        const obj={
         res,
         DBcon,
         verifiedUser,project_id
        }
        deleteAllProjectLanguages(obj)
   }    
   else if(req.method==='DELETE' && completeUrl!='api/projectlanguage/')
   {
        // delete single case
        console.log("delete with id")
        const obj={
         res,
         id,
         DBcon,
         verifiedUser
       }
        deleteSingleProjectLanguage(obj)
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



const validate=(obj)=>{

    // validate date 
    return !isNaN(obj.lan_percentage);
}

// check input body

const Isvalidbody = (body) => {
     const { lan_name,lan_percentage} = body;
     // check validate input 

     const check = [null, undefined].includes(lan_name) || 
     [null, undefined].includes(lan_percentage) 

     const length=Object.keys(body).length===2;
     
     if (check || !length) {
          return false;
     }
     return true;
}