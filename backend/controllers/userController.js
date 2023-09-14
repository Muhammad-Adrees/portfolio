const bcrypt=require("bcrypt")
// perform CRUD
const addUser=async(res,obj,DBcon)=>{

    // hash pass
    const hash=await hashPassword(obj.password)
    // adding record on db
    const addQuery=`
    INSERT INTO user
    (first_name,last_name,email,password,user_role) 
    VALUES('${obj.first_name}','${obj.last_name}','${obj.email}','${hash}','${obj.user_role}')
    `
    DBcon.query(addQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        
        return successRes(res);
    })

    
   
}
const getAllUsers=(res,DBcon)=>{

    // get all users
     const getQuery= `
     SELECT * FROM user
     `
     DBcon.query(getQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
      
        successResult(res,result)
        
    })
}
const getSingleUser=(res,id,DBcon)=>{



    const getSingleQuery=`
        select * from user where user_id=${parseInt(id)}
    `
    DBcon.query(getSingleQuery,(err,result)=>{
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

const updateUser=async(res,id,upObj,DBcon)=>{
    const hash=await hashPassword(upObj.password)
    
    const updateQuery=`
    UPDATE user SET first_name='${upObj.first_name}',last_name='${upObj.last_name}',
    email='${upObj.email}',password='${hash}',user_role='${upObj.user_role}' WHERE user_id=${parseInt(id)}
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
const deleteAllUsers=(res,DBcon)=>{
    const deleteQuery= `
    DELETE FROM user 
    `
    DBcon.query(deleteQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
       
        
        return successRes(res);
    })
}
const deleteSingleUser=(res,id,DBcon)=>{
    const deleteSingleQuery=`
        DELETE FROM user WHERE user_id=${parseInt(id)}
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

const hashPassword=async(pass)=>{
    const saltRounds=10;
    try{
       const hash= await bcrypt.hash(pass,saltRounds)
       return hash;
    }
    catch(err)
    {
        return err;
    }
}


module.exports={
    addUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteAllUsers,
    deleteSingleUser
}