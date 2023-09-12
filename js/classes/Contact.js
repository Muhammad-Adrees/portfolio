import url from "../../utils/config.json" assert { type: "json" };


export class Contact {
  // initialize values in constructor

  constructor() {
    this.contact_id = 0;
    this.user_id = 0;
    this.email = "";
    this.phone = "";
    this.linkedin = "";
    this.instagram = "";
    this.twitter = "";
    this.github = "";
  }
  // Perform CRUD

  addContact=async(token,contact) =>{
    // read JSON file and append new Contact
    try {
      const res = await fetch(`${url.BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth_token":token
        },
        body: JSON.stringify(contact),
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
  updateContact=async(token,ContactId, upContact) =>{
    try {
      const res = await fetch(`${url.BASE_URL}/api/contact/${ContactId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth_token":token
        },
        body: JSON.stringify(upContact),
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
  deleteContact=async(token,id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/contact/${id}`, {
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
  getContact=async(token)=> {


    try {
      const response = await fetch(`${url.BASE_URL}/api/contact`,{
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
  getSingleContact=async(token,id)=> {
    

    try {
      const response = await fetch(`${url.BASE_URL}/api/contact/${id}`,{
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
