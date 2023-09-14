
// perform CRUD
const addProjectTag=async({ res,
    body,
    DBcon,
    verifiedUser,project_id})=>{

    // adding record on db
    const addQuery=`
    INSERT INTO project_tag
    (tag_name,user_id,project_id) 
    VALUES(
        '${body.tag_name}',
        ${parseInt(verifiedUser.id)},
        ${parseInt(project_id)})
    `
    DBcon.query(addQuery,(err,result)=>{
        if(err)
        { 
            return serverErr(res,err)
        }
        return successRes(res);
    })
   
}
const getAllProjectTags=({ res,
    DBcon,
    verifiedUser})=>{

    // get all ProjectTags

    const selectQuery=`
        SELECT * FROM project_tag where user_id=${verifiedUser.id}; 
    `

    DBcon.query(selectQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        
        successResult(res,result)
    })

}
const getSingleProjectTag=({ res,
    DBcon,
    id,
    verifiedUser})=>{

    const selectQuery=`
        SELECT * FROM project_tag where project_tag_id=${id} && user_id=${verifiedUser.id}; 
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
const updateProjectTag=({ res,
    body,
    DBcon,
    id,
    verifiedUser})=>{
    
    const updateQuery=`
    UPDATE project_tag SET  
    tag_name='${body.tag_name}'
    WHERE user_id=${verifiedUser.id} && project_tag_id=${id} 
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
const deleteAllProjectTags=({ res,
    DBcon,
    verifiedUser,project_id})=>{
    const deleteQuery= `
    DELETE FROM project_tag where user_id=${verifiedUser.id}  && project_id=${project_id}
    `
    DBcon.query(deleteQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
       
        
        return successRes(res);
    })

}
const deleteSingleProjectTag=({ res,
    id,
    DBcon,
    verifiedUser})=>{
    const deleteSingleQuery=`
    DELETE FROM project_tag WHERE project_tag_id=${id} && user_id=${verifiedUser.id}
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
    addProjectTag,
    getAllProjectTags,
    getSingleProjectTag,
    updateProjectTag,
    deleteAllProjectTags,
    deleteSingleProjectTag
}