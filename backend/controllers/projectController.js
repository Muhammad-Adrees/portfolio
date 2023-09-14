
// perform CRUD
const addProject=async({ res,
    body,
    DBcon,
    verifiedUser})=>{

    // adding record on db
    const addQuery=`
    INSERT INTO project
    (file,exe,title,start_date,end_date,description,source_link,live_link,user_id ) 
    VALUES(
        '${body.file}',
        '${body.exe}',
        '${body.title}',
        '${body.start_date}',
        '${body.end_date}',
        '${body.description}',
        '${body.source_link}',
        '${body.live_link}',
        ${parseInt(verifiedUser.id)})
    `

    const lastID=`
    SELECT LAST_INSERT_ID()
    `
    DBcon.query(addQuery,(err,result)=>{
        if(err)
        { 
            return serverErr(res,err)
        }
        DBcon.query(lastID,(err,result2)=>{
                res.writeHead(200, { "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE",'Content-Type': 'text/html' });
            res.write(JSON.stringify({
                result:result2[0]["LAST_INSERT_ID()"],
                message:"Successfull"
            }))
            return res.end()
        })
        
    })
   
}
const getAllProjects=({ res,
    DBcon,
    verifiedUser})=>{

    // get all Projects

    const selectQuery=`
        SELECT * FROM project where user_id=${verifiedUser.id}; 
    `

    DBcon.query(selectQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        
        successResult(res,result)
    })

}
const getSingleProject=({ res,
    DBcon,
    id,
    verifiedUser})=>{

    const selectQuery=`
        SELECT * FROM project where project_id=${id} && user_id=${verifiedUser.id}; 
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
const updateProject=({ res,
    body,
    DBcon,
    id,
    verifiedUser})=>{
    
    const updateQuery=`
    UPDATE project SET  
    file='${body.file}',
    exe='${body.exe}',
    title='${body.title}',
    start_date='${body.start_date}',
    end_date='${body.end_date}',
    description='${body.description}',
    source_link='${body.source_link}',
    live_link='${body.live_link}'
    WHERE user_id=${verifiedUser.id} && project_id=${id}
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
        console.log(result.length)
        return successRes(res);
    });


}
const deleteAllProjects=({ res,
    DBcon,
    verifiedUser})=>{
    const deleteQuery= `
    DELETE FROM project where user_id=${verifiedUser.id} 
    `
    DBcon.query(deleteQuery,(err,result)=>{
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
const deleteSingleProject=({ res,
    id,
    DBcon,
    verifiedUser})=>{
    const deleteSingleQuery=`
    DELETE FROM project WHERE project_id=${id} && user_id=${verifiedUser.id}
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
    addProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteAllProjects,
    deleteSingleProject
}