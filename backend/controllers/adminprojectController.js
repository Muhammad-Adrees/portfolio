
// perform CRUD

const getAllAdminProjects=(res,DBcon)=>{

    // get all AdminProjects
     const getQuery= `
     SELECT * FROM project
     `
     DBcon.query(getQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
      
        successResult(res,result)
        
    })
}

const deleteAllAdminProjects=(res,DBcon)=>{
    const deleteQuery= `
    DELETE FROM project 
    `
    DBcon.query(deleteQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
       
        
        return successRes(res);
    })
}
const deleteSingleAdminProject=(res,id,DBcon)=>{
    const deleteSingleQuery=`
        DELETE FROM project WHERE project_id=${parseInt(id)}
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
    getAllAdminProjects,
    deleteAllAdminProjects,
    deleteSingleAdminProject
}