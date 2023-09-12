// create server and call connect method of db and write api's
const http=require("http")
const url=require("url")
const DBconnection=require("./databases/portfolioDB.js");
const userRoutes=require("./routes/userRoutes.js")
const aboutRoutes=require("./routes/aboutRoutes.js")
const authRoutes=require("./routes/authRoutes.js")
const userInfoRoutes=require("./routes/userInfoRoutes.js")
const contactRoutes=require("./routes/contactRoutes.js")
const experienceRoutes=require("./routes/experienceRoutes.js")
const educationRoutes=require("./routes/educationRoutes.js")
const skillRoutes=require("./routes/skillRoutes.js");
const projectRoutes=require("./routes/projectRoutes.js");
const projectTagRoutes=require("./routes/projectTagRoutes.js");
const projectLanguageRoutes=require("./routes/projectLanguageRoutes.js");
const jwt = require("jsonwebtoken");
require('dotenv').config();


let DBcon=undefined;
const PORT=process.env.PORT || 5000

const server=http.createServer(async(req,res)=>{
    let q=url.parse(req.url)

    let splitUrl=q.pathname.split('/')
    splitUrl=splitUrl.filter((item)=>{
        return item!='';
    })

    // validate auth token

    let verifiedUser ="";
   
    // if url length is more then 3 then invalid
    if(splitUrl.length>3)
    {
        notFoundStatus(res)
    }

    const baseUrl=splitUrl[0]+'/'+splitUrl[1];
    let completeUrl='';
    for (const item of splitUrl) {
        completeUrl=completeUrl+item+'/'
        
    }



    if(["api/about","api/userinfo",
    "api/contact","api/experience",
    "api/education","api/skill","api/project",
    "api/projecttag","api/projectlanguage"].includes(baseUrl))
    {
        verifiedUser= await verifyToken(req,res)
    }

    const sendObj={
        req,res,completeUrl,DBcon,verifiedUser
    }


    if(baseUrl==='api/user')
    {
        // user api
        userRoutes(sendObj)
    }else if(baseUrl==='user/auth')
    {
        // auth api
        authRoutes(sendObj)
    }
    else if(baseUrl==='api/about')
    {
        // about api
        
        aboutRoutes(sendObj)
    }else if(baseUrl==='api/userinfo')
    {
        // userInfo api
        userInfoRoutes(sendObj)
    }
    else if(baseUrl==='api/contact')
    {
        // contact api
        contactRoutes(sendObj)
    }else if(baseUrl==='api/experience')
    {
        // experience api
       
        experienceRoutes(sendObj)
    }else if(baseUrl==='api/education')
    {
        // education api
       
        educationRoutes(sendObj)
    }else if(baseUrl==='api/skill')
    {
        // skill api
       
        skillRoutes(sendObj)
    }else if(baseUrl==='api/project')
    {
        // project api
        
        projectRoutes(sendObj)
    }else if(baseUrl==='api/projecttag')
    {
        // project tag api
        
        projectTagRoutes(sendObj)
    }else if(baseUrl==='api/projectlanguage')
    {
        // project languages api
        
        projectLanguageRoutes(sendObj)
    }else
    {
        notFoundStatus(res)
    }

})

const unAuthorizeStatus = (res) => {
    res.writeHead(401, { "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE",'Content-Type': 'text/html' });
    res.write(JSON.stringify({
        message:"unAuthorize!!!!"
    }))
        return res.end()
}
const notFoundStatus = (res) => {

    res.writeHead(404,  { "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE",'Content-Type': 'text/html' });
    res.write(JSON.stringify({
        message:"404 Not found"
    }))
        return res.end()
}

const verifyToken=async(req,res)=>{
    const auth_token = req.headers.auth_token;
    if (!auth_token) {
         return unAuthorizeStatus(res);
    }
    else {
        let verifiedUser =await jwt.verify(auth_token, process.env.SECRET_KEY);
         if (!verifiedUser) {
              return unAuthorizeStatus(res);
         }
         else
            return verifiedUser;
    }
}

server.listen(PORT,()=>{
    DBcon=DBconnection();
    console.log(`Server is listening on port:${PORT}`);
})

