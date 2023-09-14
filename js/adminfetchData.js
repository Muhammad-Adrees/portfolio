// Whenever the page relaod it fetch data from db and show on the page
import { User_registration } from "./classes/User_registration.js";
import { Admin_project } from "./classes/Admin_project.js";
  
  const dataReceieved = {
    projectsArr: [],
    usersArr: [],

  };
  //   fetch data from db and render on page
  
  const projectObj = new Admin_project();
  const User_registrationobj = new User_registration();
  
  (async function fetchData(
    projectObj,
    User_registrationobj
  ) {
  
    const token =localStorage.getItem("auth_token");
  
    dataReceieved.projectsArr =await projectObj.getAdminProjects(token);
    dataReceieved.usersArr =await User_registrationobj.getUsers(token);
    
  })(
    projectObj,
    User_registrationobj,
  );
  
  export default dataReceieved;
  