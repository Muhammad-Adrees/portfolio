const {
    getCurrentUser

}=require("../controllers/currentuserController.js")
require("dotenv").config()


module.exports=async({req,res,completeUrl,DBcon,verifiedUser})=>{

    //     Redirect to routes
   if(req.method==='GET' && completeUrl=='api/currentuser/')
   {
        // get all request

        const obj={
         res,DBcon,verifiedUser
        }
        getCurrentUser(obj)

   }
   else
   {
        notFoundStatus(res)
   }

}

 const notFoundStatus=(res)=>{
    
     res.writeHead(404,{ "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE",'Content-Type': 'text/html' });
     res.write(JSON.stringify({
          message:"404 not found"
      }))
    return res.end()
 }

