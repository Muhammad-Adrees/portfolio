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

  addUser=async(auth_token,User) =>{
    // read JSON file and append new User
    try {
      const res = await fetch(`${url.BASE_URL}/api/user`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "authorization":`Bearer ${auth_token}`
        },
        body: JSON.stringify(User),
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
  updateUser=async(auth_token,id, upUser) =>{
    try {
      const res = await fetch(`${url.BASE_URL}/api/user/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "authorization":`Bearer ${auth_token}`
        },
        body: JSON.stringify(upUser),
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
  deleteUser=async(auth_token)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/user`, {
        method: "DELETE", 
        headers: {
          "content-type":"application/json",
          "authorization":`Bearer ${auth_token}`
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
  deleteSingleUser=async(auth_token,id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/user/${id}`, {
        method: "DELETE", 
        headers: {
          "content-type":"application/json",
          "authorization":`Bearer ${auth_token}`
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
  getUsers=async(auth_token)=> {


    try {
      const res = await fetch(`${url.BASE_URL}/api/user`,{
          method:"GET",
          headers:{
              "content-type":"application/json",
              "authorization":`Bearer ${auth_token}`
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
  getSingleUser=async(auth_token,id)=> {
    

    try {
      const res = await fetch(`${url.BASE_URL}/api/user/${id}`,{
          method:"GET",
          headers:{
              "content-type":"application/json",
              "authorization":`Bearer ${auth_token}`
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
