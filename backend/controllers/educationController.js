
// perform CRUD
const addEducation=async({ res,
    body,
    DBcon,
    verifiedUser})=>{

    // adding record on db
    const addQuery=`
    INSERT INTO education
    (institute_name,degree,location,start_date,end_date,description,user_id) 
    VALUES(
        '${body.institute_name}',
        '${body.degree}',
        '${body.location}',
        '${body.start_date}',
        '${body.end_date}',
        '${body.description}',
        ${parseInt(verifiedUser.id)})
    `
    DBcon.query(addQuery,(err,result)=>{
        if(err)
        { 
            return serverErr(res,err)
        }
        
        return successRes(res);
    })
   
}
const getAllEducations=({ res,
    DBcon,
    verifiedUser})=>{

    // get all Educations

    const selectQuery=`
        SELECT * FROM education where user_id=${verifiedUser.id}; 
    `

    DBcon.query(selectQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        
        successResult(res,result)
    })

}
const getSingleEducation=({ res,
    DBcon,
    id,
    verifiedUser})=>{

    const selectQuery=`
        SELECT * FROM education where education_id=${id} && user_id=${verifiedUser.id}; 
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
const updateEducation=({ res,
    body,
    DBcon,
    id,
    verifiedUser})=>{
    
    const updateQuery=`
    UPDATE education SET  
    institute_name='${body.institute_name}',
    degree='${body.degree}',
    location='${body.location}',
    start_date='${body.start_date}',
    end_date='${body.end_date}',
    description='${body.description}'
    WHERE user_id=${verifiedUser.id} && education_id=${id}
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
const deleteAllEducations=({ res,
    DBcon,
    verifiedUser})=>{
    const deleteQuery= `
    DELETE FROM education where user_id=${verifiedUser.id} 
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
const deleteSingleEducation=({ res,
    id,
    DBcon,
    verifiedUser})=>{
    const deleteSingleQuery=`
    DELETE FROM education WHERE education_id=${id} && user_id=${verifiedUser.id}
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
    addEducation,
    getAllEducations,
    getSingleEducation,
    updateEducation,
    deleteAllEducations,
    deleteSingleEducation
}