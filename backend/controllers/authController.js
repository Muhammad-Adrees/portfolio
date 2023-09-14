const generateAuthToken=require("../utils/generateAuthToken.js")
const bcrypt=require("bcrypt")
// perform CRUD
const registerUser=async(res,obj,DBcon)=>{
    // first hash pass

    const hash=await hashPassword(obj.password)
    // for registration adding to DB
    const addQuery=`
    INSERT INTO user
    (first_name,last_name,email,password,user_role,auth_token) 
    VALUES('${obj.first_name}','${obj.last_name}','${obj.email}','${hash}','${obj.user_role}','')
    `
    DBcon.query(addQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        
        return successRes(res);
    })

}

const loginUser=(res,credentials,DBcon)=>{
    console.log("Inside login db")
    // check for login
    const getQuery=
    `
    SELECT * FROM user WHERE email='${credentials.email}'
    `
    DBcon.query(getQuery,async(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        else if(result.length===0)
        {
            console.log("Not found login!!")
            return notFound(res);
        }
        // compare passwords in case of hashed passwords;
        const checkpss=await checkPass( credentials.password,result[0].password);
        console.log(checkPass)
        if(checkpss)
        {
            // now generate jwt token and send with res

            const token=generateAuthToken(result[0].user_id,result[0].user_role);

            const data={token,user_role:result[0].user_role};
            result[0].auth_token=token;

            const getResult=updateUser(result[0],DBcon);
           
            if(getResult.message)
            {
                return serverErr(res,getResult.err)
            }
            res.writeHead(200, { "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE",'Content-Type': 'application/json' });
            res.write(JSON.stringify({data}))
            res.end();
        }
        else
        {
            return notFound(res)
        }
        
       
    })
}
const updateUser=async(upObj,DBcon)=>{
    const updateQuery=`
    UPDATE user SET first_name='${upObj.first_name}',last_name='${upObj.last_name}',
    email='${upObj.email}',password='${upObj.password}',user_role='${upObj.user_role}',auth_token='${upObj.auth_token}' WHERE user_id=${upObj.user_id}
    `
    await DBcon.query(updateQuery,(err,result)=>{
        if(err)
        {
            return {err,message:"err"};
        }
        else if(result.affectedRows===0)
        {
            return "notfound"
        }
        return "success";
    });

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
const checkPass=async(Pass,hash)=>{
    try{

        const res=await bcrypt.compare(Pass,hash);
        return res;
    }
    catch(err)
    {
        return err;
    }
}
module.exports={
    registerUser,
    loginUser
}