
const jwt=require("jsonwebtoken")
require("dotenv").config();
module.exports=(id,user_role)=>{
    return jwt.sign({id,user_role},process.env.SECRET_KEY);
}