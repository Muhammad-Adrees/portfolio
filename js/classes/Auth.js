
export class Auth {
  // initialize values in constructor
  constructor() {
  }
  // Perform CRUD

  userLogin=async(loginObj) =>{

    // logic for user login

    try {
        const res = await fetch(`http://localhost:4000/user/auth/login`, {
          method: "post",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(loginObj),
        });
  

        if (res.status===500 || res.status===404) 
        {
            return res.status; // in case if the response is not correct
            // server err or not found
        }
  
        // get auth token and save to local storage
        const result = await res.json();
        localStorage.setItem("auth_token",result.data.token);
        localStorage.setItem("userRole",result.data.user_role);

        return 200;
      } catch (err) {
        alert(err)
        return 500;
      }

   
  }
 userRegister=async(regObj) =>{
    // logic for user register

    try {
        const res = await fetch(`http://localhost:4000/user/auth/register`, {
          method: "post",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(regObj),
        });
        const result = await res.json();
        if(res.status===500 )
        {
            // server error
            alert("Server Err!!!!!!!!!")
            return false;
        }
        else if(res.status===400)
        {
            alert("Some of the data is not correct!!!!!")
        }
        else if(res.status===200)
        {
            // success
            
            return true;
        }
      } catch (err) {
        alert(err.message);
        return false;
      }


  }
}
