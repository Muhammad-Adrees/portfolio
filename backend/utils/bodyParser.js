module.exports=(req)=>{
    return new Promise((resolve,reject)=>{
        try{
            let bodyData="";
            req.on("data",(chunk)=>{
                bodyData+=chunk;
            })
            req.on("end",()=>{
                resolve(JSON.parse(bodyData));
            })

        }catch(err)
        {
            console.log(err);
            reject(err);
        }
    })
}