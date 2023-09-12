import url from "../../utils/config.json" assert { type: "json" };
export class User_registration {
  // initialize values in constructor
  constructor() {
    this.user_id = 0;
    this.first_name = "";
    this.last_name = "";
    this.email = "";
    this.password = "";
    this.user_role = "user";
  }
  // Perform CRUD

  addUser=async(token,User) =>{
    // read JSON file and append new User
    try {
      const res = await fetch(`${url.BASE_URL}/api/user`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth_token":token
        },
        body: JSON.stringify(User),
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
  updateUser=async(token,UserId, upUser) =>{
    try {
      const res = await fetch(`${url.BASE_URL}/api/user/${UserId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth_token":token
        },
        body: JSON.stringify(upUser),
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
  deleteUser=async(token,id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/user/${id}`, {
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
  getUser=async(token)=> {


    try {
      const response = await fetch(`${url.BASE_URL}/api/user`,{
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
  getSingleUser=async(token,id)=> {
    

    try {
      const response = await fetch(`${url.BASE_URL}/api/user/${id}`,{
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
