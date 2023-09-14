import url from "../../utils/config.json" assert { type: "json" };

export class project_language {
  // initialize values in constructor
  constructor() {
    this.project_language_id = 0;
    this.user_id = 0;
    this.project_id = "";
    this.lan_name = "";
    this.lan_percentage = "";
  }
  // Perform CRUD

  addprojectLanguage=async(token,project_id,projectlanguage) =>{
    // read JSON file and append new projectLanguage
    try {
      const res = await fetch(`${url.BASE_URL}/api/projectlanguage`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "authorization":`Bearer ${token}`,
          "project_id":project_id
        },
        body: JSON.stringify(projectlanguage),
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
  updateprojectLanguage=async(token,projectLanguageId, upprojectLanguage) =>{
    try {
      const res = await fetch(`${url.BASE_URL}/api/projectlanguage/${projectLanguageId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "authorization":`Bearer ${token}`, 
        },
        body: JSON.stringify(upprojectLanguage),
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
  deleteAllprojectLanguage=async(token,project_id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/projectlanguage/`, {
        method: "DELETE", 
        headers: {
          "content-type":"application/json",
          "authorization":`Bearer ${token}`,
          "project_id":project_id
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
  getprojectLanguages=async(token)=> {


    try {
      const res = await fetch(`${url.BASE_URL}/api/projectlanguage`,{
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
  getSingleprojectLanguage=async(token,id)=> {
    

    try {
      const res = await fetch(`${url.BASE_URL}/api/projectlanguage/${id}`,{
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
