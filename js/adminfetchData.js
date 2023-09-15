// Whenever the page relaod it fetch data from db and show on the page
import { User_registration } from "./classes/User_registration.js";
import { Admin_project } from "./classes/Admin_project.js";
import { Current_user } from "./classes/Current_user.js";
  
  const dataReceieved = {
    projectsArr: [],
    usersArr: [],
    current_userArr:[]
  };
  //   fetch data from db and render on page
  
  const projectObj = new Admin_project();
  const User_registrationobj = new User_registration();
  const Current_userobj = new Current_user();
  
async function fetchData(
    projectObj,
    User_registrationobj,
    Current_userobj
  ) {
  
    const token =localStorage.getItem("auth_token");
  
    dataReceieved.projectsArr =await projectObj.getAdminProjects(token);
    dataReceieved.usersArr =await User_registrationobj.getUsers(token);
    dataReceieved.current_userArr =await Current_userobj.getcurrentUser(token)
    
  }
  
  const run=async()=>{
    await fetchData  (
      projectObj,
      User_registrationobj,
      Current_userobj
    );
   
   }
  
  

  
  export default {dataReceieved,run};
  