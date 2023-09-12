import url from "../../utils/config.json" assert { type: "json" };

export class Education {
  // initialize values in constructor
  constructor() {
    this.education_id = 0;
    this.user_id = 0;
    this.institute_name = "";
    this.degree = "";
    this.location = "";
    this.start_date = "";
    this.end_date = "";
    this.description = "";
  }
  // Perform CRUD

  addEducation=async(token,education) =>{
    // read JSON file and append new Education
    try {
      const res = await fetch(`${url.BASE_URL}/api/education`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth_token":token
        },
        body: JSON.stringify(education),
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
  updateEducation=async(token,EducationId, upEducation) =>{
    try {
      const res = await fetch(`${url.BASE_URL}/api/education/${EducationId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth_token":token
        },
        body: JSON.stringify(upEducation),
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
  deleteEducation=async(token,id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/education/${id}`, {
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
  getEducation=async(token)=> {


    try {
      const response = await fetch(`${url.BASE_URL}/api/education`,{
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
  getSingleEducation=async(token,id)=> {
    

    try {
      const response = await fetch(`${url.BASE_URL}/api/education/${id}`,{
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
