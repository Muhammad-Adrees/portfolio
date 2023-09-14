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
          "authorization":`Bearer ${token}`
        },
        body: JSON.stringify(education),
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
  updateEducation=async(token,EducationId, upEducation) =>{
    try {
      const res = await fetch(`${url.BASE_URL}/api/education/${EducationId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "authorization":`Bearer ${token}`
        },
        body: JSON.stringify(upEducation),
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
  deleteEducation=async(token,id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/education/${id}`, {
        method: "DELETE", 
        headers: {
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
  getEducations=async(token)=> {


    try {
      const res = await fetch(`${url.BASE_URL}/api/education`,{
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
  getSingleEducation=async(token,id)=> {
    

    try {
      const res = await fetch(`${url.BASE_URL}/api/education/${id}`,{
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
