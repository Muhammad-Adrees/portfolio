
// perform CRUD
const addAbout=({ res,
    body,
    DBcon,
    verifiedUser})=>{

    // adding record on db
    const addQuery=`
    INSERT INTO about
    (description,user_id) 
    VALUES('${body.description}',${parseInt(verifiedUser.id)})
    `
    DBcon.query(addQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        
        return successRes(res);
    })

    
   
}
const getAllAbouts=({ res,
    DBcon,
    verifiedUser})=>{

    // get all Abouts

    const selectQuery=`
        SELECT * FROM about where user_id=${verifiedUser.id}; 
    `

    DBcon.query(selectQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        
        successResult(res,result)
    })

}
const getSingleAbout=({ res,
    DBcon,
    id,
    verifiedUser})=>{

    const selectQuery=`
        SELECT * FROM about where about_id=${id} && user_id=${verifiedUser.id}; 
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
const updateAbout=({ res,
    body,
    DBcon,
    id,
    verifiedUser})=>{
    
    const updateQuery=`
    UPDATE about SET description='${body.description}' WHERE user_id=${verifiedUser.id} && about_id=${id}
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
const deleteAllAbouts=({ res,
    DBcon,
    verifiedUser})=>{
    const deleteQuery= `
    DELETE FROM about where user_id=${verifiedUser.id} 
    `
    DBcon.query(deleteQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }else if(result.affectedRows===0)
        {
            return notFound(res)
        }
       
        
        return successRes(res);
    })

}
const deleteSingleAbout=({ res,
    id,
    DBcon,
    verifiedUser})=>{
    const deleteSingleQuery=`
    DELETE FROM about WHERE about_id=${id} && user_id=${verifiedUser.id}
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
    addAbout,
    getAllAbouts,
    getSingleAbout,
    updateAbout,
    deleteAllAbouts,
    deleteSingleAbout
}