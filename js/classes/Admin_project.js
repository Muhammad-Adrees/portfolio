import url from "../../utils/config.json" assert { type: "json" };

export class Admin_project {
  // initialize values in constructor
  constructor() {
   
  }
  // Perform CRUD

  deleteAdminProject=async(token,id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/adminproject/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type":"application/json",
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
  deleteAllAdminProject=async(token)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/adminproject/`, {
        method: "DELETE",
        headers: {
          "Content-Type":"application/json",
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
  getAdminProjects=async(token)=> {


    try {
      const res = await fetch(`${url.BASE_URL}/api/adminproject`,{
          method:"GET",
          headers:{
              "Content-Type":"application/json",
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
