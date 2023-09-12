
// perform CRUD
const addSkill=async({ res,
    body,
    DBcon,
    verifiedUser})=>{

    // adding record on db
    const addQuery=`
    INSERT INTO skill
    (skill_name,start_date,end_date,experience_per,user_id) 
    VALUES(
        '${body.skill_name}',
        '${body.start_date}',
        '${body.end_date}',
        ${body.experience_per},
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
const getAllSkills=({ res,
    DBcon,
    verifiedUser})=>{

    // get all Skills

    const selectQuery=`
        SELECT * FROM skill where user_id=${verifiedUser.id}; 
    `

    DBcon.query(selectQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        
        successResult(res,result)
    })

}
const getSingleSkill=({ res,
    DBcon,
    id,
    verifiedUser})=>{

    const selectQuery=`
        SELECT * FROM skill where skill_id=${id} && user_id=${verifiedUser.id}; 
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
const updateSkill=({ res,
    body,
    DBcon,
    id,
    verifiedUser})=>{
    
    const updateQuery=`
    UPDATE skill SET  
    skill_name ='${body.skill_name}',
    start_date='${body.start_date}',
    end_date='${body.end_date}',
    experience_per=${body.experience_per}
    WHERE user_id=${verifiedUser.id} && skill_id=${id}
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
const deleteAllSkills=({ res,
    DBcon,
    verifiedUser})=>{
    const deleteQuery= `
    DELETE FROM skill where user_id=${verifiedUser.id} 
    `
    DBcon.query(deleteQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
       
        
        return successRes(res);
    })

}
const deleteSingleSkill=({ res,
    id,
    DBcon,
    verifiedUser})=>{
    const deleteSingleQuery=`
    DELETE FROM skill WHERE skill_id=${id} && user_id=${verifiedUser.id}
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
    addSkill,
    getAllSkills,
    getSingleSkill,
    updateSkill,
    deleteAllSkills,
    deleteSingleSkill
}