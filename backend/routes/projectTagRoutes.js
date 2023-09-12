const {
    addProjectTag,
    getAllProjectTags,
    getSingleProjectTag,
    updateProjectTag,
    deleteAllProjectTags,
    deleteSingleProjectTag

}=require("../controllers/projectTagController.js")
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
   if(req.method==='GET' && completeUrl=='api/projecttag/')
   {
        // get all request
        const obj={
         res,DBcon,verifiedUser
        }
        getAllProjectTags(obj)

   }
   else if(req.method==='GET' && completeUrl!='api/projecttag/')
   {
        // get single request with id

        const obj={
         res,DBcon,id,verifiedUser
        }
        getSingleProjectTag(obj)
   }
   else if(req.method==='POST' && completeUrl=='api/projecttag/')
   {
        // add case
        
        const body= await bodyParser(req);
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
       
       if( !Isvalidbody(body))
        {
            return inValidStatus(res);
        }
       addProjectTag(obj)

   }
   else if(req.method==='PUT' && completeUrl!='api/projecttag/')
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
       if( !Isvalidbody(body))
       {
           return inValidStatus(res);
       }
        updateProjectTag(obj)
   }
   else if(req.method==='DELETE' && completeUrl=='api/projecttag/')
   {
        // delete all case
        const project_id = req.headers.project_id;

        // pending numeric check
        if(!project_id)
        {
            return inValidStatus(res);
        }
        const obj={
         res,
         DBcon,
         verifiedUser,project_id
        }
        deleteAllProjectTags(obj)
   }    
   else if(req.method==='DELETE' && completeUrl!='api/projecttag/')
   {
        // delete single case

        const obj={
         res,
         id,
         DBcon,
         verifiedUser
       }
        deleteSingleProjectTag(obj)
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
 




// check input body

const Isvalidbody = (body) => {
     const { tag_name} = body;
     // check validate input 

     const check = [null, undefined].includes(tag_name)

     const length=Object.keys(body).length===1;
     
     if (check || !length) {
          return false;
     }
     return true;
}