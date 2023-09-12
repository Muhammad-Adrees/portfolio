import url from "../../utils/config.json" assert { type: "json" };
export class User_Info {
  // initialize values in constructor
  constructor() {
    this.user_info_id = 0;
    this.user_id = 0;
    this.designation = "";
    this.location = "";
  }
  // Perform CRUD

  addUserInfo=async(token,UserInfo) =>{
    // read JSON file and append new UserInfo
    try {
      const res = await fetch(`${url.BASE_URL}/api/userinfo`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth_token":token
        },
        body: JSON.stringify(UserInfo),
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
  updateUserInfo=async(token,UserInfoId, upUserInfo) =>{
    try {
      const res = await fetch(`${url.BASE_URL}/api/userinfo/${UserInfoId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth_token":token
        },
        body: JSON.stringify(upUserInfo),
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
  deleteUserInfo=async(token,id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/userinfo/${id}`, {
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
  getUserInfo=async(token)=> {


    try {
      const response = await fetch(`${url.BASE_URL}/api/userinfo`,{
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
  getSingleUserInfo=async(token,id)=> {
    

    try {
      const response = await fetch(`${url.BASE_URL}/api/userinfo/${id}`,{
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
