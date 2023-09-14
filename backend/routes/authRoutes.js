const {
     registerUser,
     loginUser

} = require("../controllers/authController.js")

const bodyParser = require("../utils/bodyParser.js")
const validator = require("validator")


module.exports = async ({ req, res, completeUrl, DBcon }) => {

     let body = await bodyParser(req);
     if (req.method === 'POST' && completeUrl == 'user/auth/register/') {
          // Register user
          console.log(body)

          if (!IsvalidbodyRegister(body) || !validateUser(body)) {
               return inValidStatus(res);
          }
          registerUser(res, body, DBcon)
     }
     else if (req.method === 'POST' && completeUrl == 'user/auth/login/') {
          console.log(body)
          if (!IsvalidbodyLogin(body) || !validator.isEmail(body.email)) {
               return inValidStatus(res);
          }
          loginUser(res, body, DBcon);
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
    console.log('not found routes')
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
const IsvalidbodyRegister = (body) => {
     const { first_name, last_name, email, password, user_role, auth_token } = body;
     // check validate input : validator({description});

     const check = [null, undefined].includes(first_name) ||
          [null, undefined].includes(last_name) ||
          [null, undefined].includes(email) ||
          [null, undefined].includes(password) ||
          [null, undefined].includes(user_role) ||
          [null, undefined].includes(auth_token);

     const length = Object.keys(body).length === 6;

     if (check || !length) {
          return false;
     }
     return true;
}
const IsvalidbodyLogin = (body) => {
     const { email, password } = body;
     // check validate input : validator({description});

     const check = [null, undefined].includes(email) ||
          [null, undefined].includes(password)

     const length = Object.keys(body).length === 2;

     if (check || !length) {
          return false;
     }
     return true;
}