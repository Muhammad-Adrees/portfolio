
const jwt=require("jsonwebtoken")
require("dotenv").config();
module.exports=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY);
}