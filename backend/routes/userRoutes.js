const {
     addUser,
     getAllUsers,
     getSingleUser,
     updateUser,
     deleteAllUsers,
     deleteSingleUser

} = require("../controllers/userController.js")
const jwt=require("jsonwebtoken")
const bodyParser = require("../utils/bodyParser.js")
const validator = require("validator")
module.exports = async ({ req, res, completeUrl, DBcon,verifiedUser }) => {
     
     const id = completeUrl.split('/')[2];
     // check for valid id
     if (id && !validator.isNumeric(id)) {
          return inValidStatus(res);
     }

     if (req.method === 'GET' && completeUrl == 'api/user/') {
          // get all request
          getAllUsers(res, DBcon)
     }
     else if (req.method === 'GET' && completeUrl != 'api/user/') {
          // get single request with id
          getSingleUser(res,id, DBcon)
     }
     else if (req.method === 'POST' && completeUrl == 'api/user/' ) {
          // add case
          const body = await bodyParser(req);
          // validate body and user
          if (!Isvalidbody(body) || !validateUser(body)) {
               return inValidStatus(res);
          }
          addUser(res, body, DBcon)
     }
     else if (req.method === 'PUT' && completeUrl != 'api/user/') {
          // update with id
          const body = await bodyParser(req);
          // validate body and user
          if (!Isvalidbody(body) || !validateUser(body)) {
               return inValidStatus(res);
          }
          updateUser(res, id, body, DBcon);
     }
     else if (req.method === 'DELETE' && completeUrl == 'api/user/') {
          // delete all case

          deleteAllUsers(res, DBcon)
     }
     else if (req.method === 'DELETE' && completeUrl != 'api/user/' ) {
          // delete single case
          deleteSingleUser(res, id, DBcon)
     }
     else {
          notFoundStatus(res)
     }

}


const validateUser = (obj) => {
     const checkRole = obj.user_role === 'admin' || obj.user_role === 'user';
     return validator.isEmail(obj.email) && obj.password.length >= 9 && checkRole;
}
const notFoundStatus=(res)=>{
    
     res.writeHead(404,{ "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE",'Content-Type': 'text/html' });
     res.write(JSON.stringify({
          message:"404 not found"
      }))
          return res.end()
 }

const inValidStatus = (res) => {
     res.writeHead(400, {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE", 'Content-Type': 'text/html'
     });
     res.write(JSON.stringify({
          message: "invalid request"
     }))
     return res.end()
}


// check input body
const Isvalidbody = (body) => {
     const { first_name, last_name, email, password, user_role, auth_token } = body;
     // check validate input 

     const check = [null, undefined].includes(first_name) ||
          [null, undefined].includes(last_name) ||
          [null, undefined].includes(email) ||
          [null, undefined].includes(password) ||
          [null, undefined].includes(user_role) ||
          [null, undefined].includes(auth_token);;

     const length = Object.keys(body).length === 6;

     if (check || !length) {
          return false;
     }
     return true;
}


