const {
     addSkill,
     getAllSkills,
     getSingleSkill,
     updateSkill,
     deleteAllSkills,
     deleteSingleSkill

} = require("../controllers/skillController.js")
const bodyParser = require("../utils/bodyParser.js")
const validator = require("validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()


module.exports = async ({req,res,completeUrl,DBcon,verifiedUser}) => {
     const id = completeUrl.split('/')[2];
     
   
     // check for valid id
     if (id && !validator.isNumeric(id)) {
          return inValidStatus(res);
     }

     //     Redirect to routes
     if (req.method === 'GET' && completeUrl == 'api/skill/') {
          // get all request
          console.log("get all")
          const obj = {
               res, DBcon, verifiedUser
          }
          getAllSkills(obj)

     }
     else if (req.method === 'GET' && completeUrl != 'api/skill/') {
          // get single request with id
          console.log("get with id")
          const obj = {
               res, DBcon, id, verifiedUser
          }
          getSingleSkill(obj)
     }
     else if (req.method === 'POST' && completeUrl == 'api/skill/') {
          // add case
          const body = await bodyParser(req);
          //   validate body and data
          if (!Isvalidbody(body) || !validate(body)) {
               return inValidStatus(res);
          }

          const obj = {
               res,
               body,
               DBcon,
               verifiedUser
          }
          addSkill(obj)

     }
     else if (req.method === 'PUT' && completeUrl != 'api/skill/') {
          // update with id
          const body = await bodyParser(req);
          //   validate body and data
          if (!Isvalidbody(body) || !validate(body)) {
               return inValidStatus(res);
          }
          const obj = {
               res,
               body,
               id,
               DBcon,
               verifiedUser
          }

          updateSkill(obj)
     }
     else if (req.method === 'DELETE' && completeUrl == 'api/skill/') {
          // delete all case
          console.log("delete all")
          const obj = {
               res,
               DBcon,
               verifiedUser
          }
          deleteAllSkills(obj)
     }
     else if (req.method === 'DELETE' && completeUrl != 'api/skill/') {
          // delete single case
          console.log("delete with id")
          const obj = {
               res,
               id,
               DBcon,
               verifiedUser
          }
          deleteSingleSkill(obj)
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
 


const validateDate=(dt)=>{
     return !isNaN(new Date(dt))
 }
const validate=(obj)=>{
    // validate date and year ( user send valid year count based on sDate and eDate)
    return validateDate(obj.start_date) && validateDate(obj.end_date);
}
// check input body

const Isvalidbody = (body) => {
     const { skill_name, start_date, end_date, experience_per } = body;
     // check validate input 

     const check = [null, undefined].includes(skill_name) || 
     [null, undefined].includes(start_date) || 
     [null, undefined].includes(end_date) || 
     [null, undefined].includes(experience_per)

     const length=Object.keys(body).length===4;
     
     if (check || !length) {
          return false;
     }
     return true;
}

