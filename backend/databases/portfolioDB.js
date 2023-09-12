const Sqlconnection=require("../mySqlConnection.js")
const createTables=require("../createTables.js")
require('dotenv').config();

module.exports=()=>{
    const connect=Sqlconnection();

    const selectDBQuery=`use ${process.env.DB_NAME}`
    
    connect.query(selectDBQuery,(err,result)=>{
        if(err) throw err;
        console.log(`${process.env.DB_NAME} selected!!!`)
    })
    const checkTablesQuery=`show tables`;
    connect.query(checkTablesQuery,(err,result)=>{
            // create tables
            createTables(connect);
    })
    return connect;
}