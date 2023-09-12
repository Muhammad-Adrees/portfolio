const mysql=require('mysql')
require('dotenv').config();
module.exports=()=>{
const conection=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD
})

conection.connect((err)=>{
    if(err) throw err;
    console.log("SQL CONNECTION CREATED!!!!")
})


return conection;

}