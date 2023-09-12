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
          "content-type": "application/x-www-form-urlencoded",
          "auth_token":token
        },
        body: JSON.stringify(about),
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
  updateAbout=async(token,aboutId, upAbout) =>{
    try {
      const res = await fetch(`${url.BASE_URL}/api/about/${aboutId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth_token":token
        },
        body: JSON.stringify(upAbout),
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
  deleteAbout=async(token,id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/about/${id}`, {
        method: "DELETE",
        headers: {
          "content-type":"application/json",
          "auth_token":token
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
  getAbout=async(token)=> {


    try {
      const response = await fetch(`${url.BASE_URL}/api/about`,{
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
  getSingleAbout=async(token,id)=> {
    

    try {
      const response = await fetch(`${url.BASE_URL}/api/about/${id}`,{
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
