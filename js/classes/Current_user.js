import url from "../../utils/config.json" assert { type: "json" };


export class Current_user {
  // initialize values in constructor

  constructor() {
  }
  // Perform CRUD

  getcurrentUser=async(token)=> {
    

    try {
      const res = await fetch(`${url.BASE_URL}/api/currentuser`,{
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
