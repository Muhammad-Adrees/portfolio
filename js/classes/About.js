import url from "../../utils/config.json" assert { type: "json" };

export class About {
  // initialize values in constructor
  constructor() {
    this.about_id = 0;
    this.user_id = 0;
    this.description = "";
  }
  // Perform CRUD

  addAbout=async(token,about) =>{
    // read JSON file and append new About
    try {
      const res = await fetch(`${url.BASE_URL}/api/about`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "authorization":`Bearer ${token}`
        },
        body: JSON.stringify(about),
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
  updateAbout=async(token,aboutId, upAbout) =>{
    try {
      const res = await fetch(`${url.BASE_URL}/api/about/${aboutId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "authorization":`Bearer ${token}`
        },
        body: JSON.stringify(upAbout),
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
  deleteAbout=async(token,id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/about/${id}`, {
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
  getAbouts=async(token)=> {


    try {
      const res = await fetch(`${url.BASE_URL}/api/about`,{
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
  getSingleAbout=async(token,id)=> {
    

    try {
      const res = await fetch(`${url.BASE_URL}/api/about/${id}`,{
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
