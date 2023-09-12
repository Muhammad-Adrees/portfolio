const {
    addUserInfo,
    getAllUserInfos,
    getSingleUserInfo,
    updateUserInfo,
    deleteAllUserInfos,
    deleteSingleUserInfo

}=require("../controllers/userInfoController.js")
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
    //  validate weather the one who request for data is valid user or not

    //     Redirect to routes
   if(req.method==='GET' && completeUrl=='api/userinfo/')
   {
        // get all request

        const obj={
         res,DBcon,verifiedUser
        }
        getAllUserInfos(obj)

   }
   else if(req.method==='GET' && completeUrl!='api/userinfo/')
   {
        // get single request with id

        const obj={
         res,DBcon,id,verifiedUser
        }
        getSingleUserInfo(obj)
   }
   else if(req.method==='POST' && completeUrl=='api/userinfo/')
   {
        // add case
        const body= await bodyParser(req);
        //    validate body
        if(!Isvalidbody(body))
        {
          return inValidStatus(res);
        }
       
       const obj={
         res,
         body,
         DBcon,
         verifiedUser
       }
       addUserInfo(obj)

   }
   else if(req.method==='PUT' && completeUrl!='api/userinfo/')
   {
        // update with id
        const body= await bodyParser(req);
     //    validate body
        if(!Isvalidbody(body))
        {
          return inValidStatus(res);
        }


        const obj={
         res,
         body,
         id,
         DBcon,
         verifiedUser
       }

        updateUserInfo(obj)
   }
   else if(req.method==='DELETE' && completeUrl=='api/userinfo/')
   {
        // delete all case
        const obj={
         res,
         DBcon,
         verifiedUser
        }
        deleteAllUserInfos(obj)
   }    
   else if(req.method==='DELETE' && completeUrl!='api/userinfo/')
   {
        // delete single case

        const obj={
         res,
         id,
         DBcon,
         verifiedUser
       }
        deleteSingleUserInfo(obj)
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

const Isvalidbody=(body)=>
{
     const { designation,location } = body;
     // check validate input 

     const check=[null, undefined].includes(designation) || 
     [null, undefined].includes(location) 

     const length=Object.keys(body).length===2;
     
     if (check || !length) {
          return false;
     }
     return true;
}

