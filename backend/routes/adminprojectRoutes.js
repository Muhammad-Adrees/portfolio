const {
    getAllAdminProjects,
    deleteAllAdminProjects,
    deleteSingleAdminProject

} = require("../controllers/adminprojectController.js")
const validator = require("validator")

module.exports = async ({ req, res, completeUrl, DBcon }) => {
    
    const id = completeUrl.split('/')[2];
    // check for valid id
    if (id && !validator.isNumeric(id)) {
         return inValidStatus(res);
    }

    if (req.method === 'GET' && completeUrl == 'api/adminproject/') {
         // get all request
         getAllAdminProjects(res, DBcon)
    }
    else if (req.method === 'DELETE' && completeUrl == 'api/adminproject/') {
         // delete all case

         deleteAllAdminProjects(res, DBcon)
    }
    else if (req.method === 'DELETE' && completeUrl != 'api/adminproject/' ) {
         // delete single case
         deleteSingleAdminProject(res, id, DBcon)
    }
    else {
         notFoundStatus(res)
    }

}


const notFoundStatus=(res)=>{
   
    res.writeHead(404,{ "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE",'Content-Type': 'text/html' });
    res.write(JSON.stringify({
         message:"404 not found"
     }))
         return res.end()
}

const inValidStatus = (res) => {
    res.writeHead(400, {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "POST, GET,PUT,DELETE", 'Content-Type': 'text/html'
    });
    res.write(JSON.stringify({
         message: "invalid request"
    }))
    return res.end()
}




