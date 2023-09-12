
// perform CRUD
const addUserInfo=({ res,
    body,
    DBcon,
    verifiedUser})=>{

    // adding record on db
    const addQuery=`
    INSERT INTO user_info
    (designation,location,user_id) 
    VALUES('${body.designation}','${body.location}',${parseInt(verifiedUser.id)})
    `
    DBcon.query(addQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        
        return successRes(res);
    })

    
   
}
const getAllUserInfos=({ res,
    DBcon,
    verifiedUser})=>{

    // get all user_infos

    const selectQuery=`
        SELECT * FROM user_info where user_id=${verifiedUser.id}; 
    `

    DBcon.query(selectQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        
        successResult(res,result)
    })

}
const getSingleUserInfo=({ res,
    DBcon,
    id,
    verifiedUser})=>{

    const selectQuery=`
        SELECT * FROM user_info where user_info_id=${id} && user_id=${verifiedUser.id}; 
    `

    DBcon.query(selectQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        else if(result.length===0)
        {
            return notFound(res)
        }
        successResult(res,result)
    })


}
const updateUserInfo=({ res,
    body,
    DBcon,
    id,
    verifiedUser})=>{
    
    const updateQuery=`
    UPDATE user_info SET designation='${body.designation}',location='${body.location}' WHERE user_id=${verifiedUser.id} && user_info_id=${id}
    `
    DBcon.query(updateQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        else if(result.affectedRows===0)
        {
            return notFound(res)
        }
        return successRes(res);
    });


}
const deleteAllUserInfos=({ res,
    DBcon,
    verifiedUser})=>{
    const deleteQuery= `
    DELETE FROM user_info where user_id=${verifiedUser.id} 
    `
    DBcon.query(deleteQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
       
        
        return successRes(res);
    })

}
const deleteSingleUserInfo=({ res,
    id,
    DBcon,
    verifiedUser})=>{
    const deleteSingleQuery=`
    DELETE FROM user_info WHERE user_info_id=${id} && user_id=${verifiedUser.id}
    `
    DBcon.query(deleteSingleQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        else if(result.affectedRows===0)
        {
            return notFound(res)
        }
        
        return successRes(res);
    })

}


const notFound=(res)=>{
    res.writeHead(404, { "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE",'Content-Type': 'text/html' });
    res.write(JSON.stringify({
        message:"404 Not found"
    }))
        return res.end()
}
const successRes=(res)=>{
    res.writeHead(200, { "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE",'Content-Type': 'text/html' });
    res.write(JSON.stringify({
        message:"Successfull"
    }))
        return res.end()
}

const serverErr=(res,err)=>{
    res.writeHead(500, { "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE",'Content-Type': 'text/html' });
    res.write(JSON.stringify({
        message:err
    }))
    return res.end()
}


const successResult=(res,result)=>{
    res.writeHead(200,{"Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE","Content-Type":"application/json"});
    res.write(JSON.stringify(result))
    res.end();

}


module.exports={
    addUserInfo,
    getAllUserInfos,
    getSingleUserInfo,
    updateUserInfo,
    deleteAllUserInfos,
    deleteSingleUserInfo
}