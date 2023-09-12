import url from "../../utils/config.json" assert { type: "json" };

export class projectTag {
  // initialize values in constructor
  constructor() {
    this.project_tag_id = 0;
    this.user_id = 0;
    this.project_id = "";
    this.tag_name = "";
  }
  // Perform CRUD

  addProjectTag=async(token,project_id,Projecttag) =>{
    // read JSON file and append new ProjectTag
    try {
      const res = await fetch(`${url.BASE_URL}/api/projecttag`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth_token":token,
          "project_id":project_id
        },
        body: JSON.stringify(Projecttag),
      });


      const result = await res.json();

      if([400,404,500,401].includes(response.status))
      {
          // not found
          return {
            status:response.status,
            message:result.message,
          };
      }
     

      return{
        status:response.status,
        message:result.message,
      };
    } catch (err) {
      return {
        status:500,
        message:err,
      };
    }
  }
  updateProjectTag=async(token,ProjectTagId, upProjectTag) =>{
    try {
      const res = await fetch(`${url.BASE_URL}/api/projecttag/${ProjectTagId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth_token":token
        },
        body: JSON.stringify(upProjectTag),
      });


      const result = await res.json();

      if([400,404,500,401].includes(response.status))
      {
          // not found
          return {
            status:response.status,
            message:result.message,
          };
      }
     

      return{
        status:response.status,
        message:result.message,
      };
    } catch (err) {
      return {
        status:500,
        message:err,
      };
    }
   
  }
  deleteAllProjectTag=async(token,project_id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/projecttag`, {
        method: "DELETE", 
        headers: {
          "content-type":"application/json",
          "auth_token":token,
          "project_id":project_id
        }
      });
      const result = await res.json();

      if([400,404,500,401].includes(response.status))
      {
          // not found
          return {
            status:response.status,
            message:result.message,
          };
      }
     

      return{
        status:response.status,
        message:result.message,
      };
    } catch (err) {
      return {
        status:500,
        message:err,
      };
    }
    
  }
  getProjectTag=async(token)=> {


    try {
      const response = await fetch(`${url.BASE_URL}/api/projecttag`,{
          method:"GET",
          headers:{
              "content-type":"application/json",
              "auth_token":token
          }
      });
      const result = await response.json();

      if([400,404,500,401].includes(response.status))
      {
          // not found
          return {
            status:response.status,
            message:result.message,
            result:""
          };
      }
     

      return{
        status:response.status,
        message:result.message,
        result
      };
      
      
      
    } catch (err) {
      console.log(err);
    }
  
  }
  getSingleProjectTag=async(token,id)=> {
    

    try {
      const response = await fetch(`${url.BASE_URL}/api/projecttag/${id}`,{
          method:"GET",
          headers:{
              "content-type":"application/json",
              "auth_token":token
          }
      });
      const result = await response.json();

      if([400,404,500,401].includes(response.status))
      {
          // not found
          return {
            status:response.status,
            message:result.message,
            result:""
          };
      }
     

      return{
        status:response.status,
        message:result.message,
        result
      };
      
      
      
    } catch (err) {
      console.log(err);
    }
  
  
  }
}
