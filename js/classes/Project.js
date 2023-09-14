import url from "../../utils/config.json" assert { type: "json" };

export class Project {
  // initialize values in constructor
  constructor() {
    this.project_id = 0;
    this.user_id = 0;
    this.file = "";
    this.exe = "";
    this.title = "";
    this.start_date = "";
    this.end_date = "";
    this.desc = "";
    this.source_link = "";
    this.live_link = "";
    this.languages=[];
    this.tags=[];
  }
  // Perform CRUD

  addProject=async(token,project) =>{
    // read JSON file and append new Project
    try {
      const res = await fetch(`${url.BASE_URL}/api/project`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "authorization":`Bearer ${token}`
        },
        body: JSON.stringify(project),
      });


      const result = await res.json();

      if([400,404,500,401].includes(res.status))
      {
          // not found
          return {
            status:res.status,
            message:result.message,
          };
      }
      console.log("Inside project: result:")
      console.log(result)
      return{
        status:res.status,
        message:result.message,
        lastid:result.result
      };
    } catch (err) {
      return {
        status:500,
        message:err,
      };
    }
  }
  updateProject=async(token,ProjectId, upProject) =>{
    try {
      const res = await fetch(`${url.BASE_URL}/api/project/${ProjectId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "authorization":`Bearer ${token}`
        },
        body: JSON.stringify(upProject),
      });


      const result = await res.json();

      if([400,404,500,401].includes(res.status))
      {
          // not found
          return {
            status:res.status,
            message:result.message,
          };
      }
     

      return{
        status:res.status,
        message:result.message,
      };
    } catch (err) {
      return {
        status:500,
        message:err,
      };
    }
   
  }
  deleteProject=async(token,id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/project/${id}`, {
        method: "DELETE", 
        headers: {
          "content-type":"application/json",
          "authorization":`Bearer ${token}`
        }
      });
      const result = await res.json();

      if([400,404,500,401].includes(res.status))
      {
          // not found
          return {
            status:res.status,
            message:result.message,
          };
      }
     

      return{
        status:res.status,
        message:result.message,
      };
    } catch (err) {
      return {
        status:500,
        message:err,
      };
    }
    
  }
  getProjects=async(token)=> {


    try {
      const res = await fetch(`${url.BASE_URL}/api/project`,{
          method:"GET",
          headers:{
              "content-type":"application/json",
              "authorization":`Bearer ${token}`
          }
      });
      const result = await res.json();

      if([400,404,500,401].includes(res.status))
      {
          // not found
          return {
            status:res.status,
            message:result.message,
            result:""
          };
      }
     

      return result;
      
      
      
    } catch (err) {
      console.log(err);
    }
  
  }
  getSingleProject=async(token,id)=> {
    

    try {
      const res = await fetch(`${url.BASE_URL}/api/project/${id}`,{
          method:"GET",
          headers:{
              "content-type":"application/json",
              "authorization":`Bearer ${token}`
          }
      });
      const result = await res.json();

      if([400,404,500,401].includes(res.status))
      {
          // not found
          return {
            status:res.status,
            message:result.message,
            result:""
          };
      }
     

      return result;
      
      
      
    } catch (err) {
      console.log(err);
    }
  
  
  }
}
