const {
    addContact,
    getAllContacts,
    getSingleContact,
    updateContact,
    deleteAllContacts,
    deleteSingleContact

}=require("../controllers/contactController.js")
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
   if(req.method==='GET' && completeUrl=='api/contact/')
   {
        // get all request

        const obj={
         res,DBcon,verifiedUser
        }
        getAllContacts(obj)

   }
   else if(req.method==='GET' && completeUrl!='api/contact/')
   {
        // get single request with id

        const obj={
         res,DBcon,id,verifiedUser
        }
        getSingleContact(obj)
   }
   else if(req.method==='POST' && completeUrl=='api/contact/')
   {
        // add case
        
        const body= await bodyParser(req);
       const obj={
         res,
         body,
         DBcon,
         verifiedUser
       }
       
       if(!Isvalidbody(body) || !validate(body))
        {
            return inValidStatus(res);
        }
       addContact(obj)

   }
   else if(req.method==='PUT' && completeUrl!='api/contact/')
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
       if(!Isvalidbody(body) || !validate(body))
       {
           return inValidStatus(res);
       }
        updateContact(obj)
   }
   else if(req.method==='DELETE' && completeUrl=='api/contact/')
   {
        // delete all case

        const obj={
         res,
         DBcon,
         verifiedUser
        }
        deleteAllContacts(obj)
   }    
   else if(req.method==='DELETE' && completeUrl!='api/contact/')
   {

        const obj={
         res,
         id,
         DBcon,
         verifiedUser
       }
        deleteSingleContact(obj)
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
    const validlinkedin=obj.linkedin==='' || validator.isURL(obj.linkedin);
    const validinstagram=obj.instagram==='' || validator.isURL(obj.instagram);
    const validtwitter=obj.twitter==='' || validator.isURL(obj.twitter);
    const validgithub=obj.github==='' || validator.isURL(obj.github);
    const validLinks=validlinkedin && validinstagram && validtwitter && validgithub;

    return validator.isEmail(obj.email) && validator.isNumeric(obj.phone) && obj.phone.length===11 && validLinks;
}


// check input body

const Isvalidbody = (body) => {
     const { email,phone,linkedin, instagram, twitter,github } = body;
     // check validate input 

     const check = [null, undefined].includes(email) || 
     [null, undefined].includes(phone) || [null, undefined].includes(linkedin) || 
     [null, undefined].includes(instagram) || [null, undefined].includes(twitter) 
     || [null, undefined].includes(github);

     const length=Object.keys(body).length===6;
     
     if (check || !length) {
          return false;
     }
     return true;
}
