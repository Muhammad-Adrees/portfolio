import url from "../../utils/config.json" assert { type: "json" };

export class Experience {
  // initialize values in constructor
  constructor() {
    this.experience_id = 0;
    this.user_id = 0;
    this.company_name = "";
    this.role = "";
    this.start_date = "";
    this.end_date = "";
    this.years = 0;
    this.description = "";
  }
  // Perform CRUD

  addExperience=async(token,experience) =>{
    // read JSON file and append new Experience
    try {
      const res = await fetch(`${url.BASE_URL}/api/experience`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "authorization":`Bearer ${token}`
        },
        body: JSON.stringify(experience),
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
  updateExperience=async(token,ExperienceId, upExperience) =>{
    try {
      const res = await fetch(`${url.BASE_URL}/api/experience/${ExperienceId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "authorization":`Bearer ${token}`
        },
        body: JSON.stringify(upExperience),
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
  deleteExperience=async(token,id)=> {
    try {
      const res = await fetch(`${url.BASE_URL}/api/experience/${id}`, {
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
  getExperiences=async(token)=> {


    try {
      const res = await fetch(`${url.BASE_URL}/api/experience`,{
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
  getSingleExperience=async(token,id)=> {
    

    try {
      const res = await fetch(`${url.BASE_URL}/api/experience/${id}`,{
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
