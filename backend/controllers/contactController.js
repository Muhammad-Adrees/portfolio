
// perform CRUD
const addContact=async({ res,
    body,
    DBcon,
    verifiedUser})=>{

    // adding record on db
    const addQuery=`
    INSERT INTO contact
    (email,phone,linkedin,instagram,twitter,github,user_id) 
    VALUES(
        '${body.email}',
        '${body.phone}',
        '${body.linkedin}',
        '${body.instagram}',
        '${body.twitter}',
        '${body.github}',
        ${parseInt(verifiedUser.id)})
    `
    DBcon.query(addQuery,(err,result)=>{
        if(err)
        { 
            console.log(err)
            return serverErr(res,err)
        }
        
        return successRes(res);
    })
   
}
const getAllContacts=({ res,
    DBcon,
    verifiedUser})=>{

    // get all Contacts

    const selectQuery=`
        SELECT * FROM contact where user_id=${verifiedUser.id}; 
    `

    DBcon.query(selectQuery,(err,result)=>{
        if(err)
        {
            return serverErr(res,err)
        }
        
        successResult(res,result)
    })

}
const getSingleContact=({ res,
    DBcon,
    id,
    verifiedUser})=>{

    const selectQuery=`
        SELECT * FROM contact where contact_id=${id} && user_id=${verifiedUser.id}; 
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
const updateContact=({ res,
    body,
    DBcon,
    id,
    verifiedUser})=>{
    
    const updateQuery=`
    UPDATE contact SET  
    email='${body.email}',
    phone='${body.phone}',
    linkedin='${body.linkedin}',
    instagram='${body.instagram}',
    twitter='${body.twitter}',
    github='${body.github}'
    WHERE user_id=${verifiedUser.id} && contact_id=${id}
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
const deleteAllContacts=({ res,
    DBcon,
    verifiedUser})=>{
    const deleteQuery= `
    DELETE FROM contact where user_id=${verifiedUser.id} 
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
const deleteSingleContact=({ res,
    id,
    DBcon,
    verifiedUser})=>{
    const deleteSingleQuery=`
    DELETE FROM contact WHERE contact_id=${id} && user_id=${verifiedUser.id}
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
    addContact,
    getAllContacts,
    getSingleContact,
    updateContact,
    deleteAllContacts,
    deleteSingleContact
}