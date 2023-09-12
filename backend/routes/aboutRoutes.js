const {
     addAbout,
     getAllAbouts,
     getSingleAbout,
     updateAbout,
     deleteAllAbouts,
     deleteSingleAbout

} = require("../controllers/aboutController.js")
const bodyParser = require("../utils/bodyParser.js")
const validator = require("validator")
require("dotenv").config()


module.exports = async ({req,res,completeUrl,DBcon,verifiedUser}) => {
     const id = completeUrl.split('/')[2];
   


     
     // check for valid id
     if (id && !validator.isNumeric(id)) {
          return inValidStatus(res);
     }
     //  validate weather the one who request for data is valid user or not

     //     Redirect to routes
     if (req.method === 'GET' && completeUrl == 'api/about/') {
          // get all request
          console.log("get all")
          const obj = {
               res, DBcon, verifiedUser
          }
          getAllAbouts(obj)

     }
     else if (req.method === 'GET' && completeUrl != 'api/about/') {
          // get single request with id
          console.log("get with id")
          const obj = {
               res, DBcon, id, verifiedUser
          }
          getSingleAbout(obj)
     }
     else if (req.method === 'POST' && completeUrl == 'api/about/') {
          // add case
          const body = await bodyParser(req);
          // validator body
          if(!Isvalidbody(body))
          {
               return inValidStatus(res);
          }

          const obj = {
               res,
               body,
               DBcon,
               verifiedUser
          }
          addAbout(obj)

     }
     else if (req.method === 'PUT' && completeUrl != 'api/about/') {
          // update with id

          const body = await bodyParser(req);
          // validator body
          if(!Isvalidbody(body))
          {
               return inValidStatus(res);
          }

          const obj = {
               res,
               body,
               id,
               DBcon,
               verifiedUser
          }

          updateAbout(obj)
     }
     else if (req.method === 'DELETE' && completeUrl == 'api/about/') {
          // delete all case
          console.log("delete all")
          const obj = {
               res,
               DBcon,
               verifiedUser
          }
          deleteAllAbouts(obj)
     }
     else if (req.method === 'DELETE' && completeUrl != 'api/about/') {
          // delete single case
          console.log("delete with id")
          const obj = {
               res,
               id,
               DBcon,
               verifiedUser
          }
          deleteSingleAbout(obj)
     }
     else {
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
     const { description } = body;
     const check=[null, undefined].includes(description);
     
     const length=Object.keys(body).length===1;
     
     if (check || !length) {
          return false;
     }
     return true;
}

