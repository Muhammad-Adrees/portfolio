import { Auth } from "../links.js";
const login_form = document.getElementById("login_form");


window.onload=function()
{
  document.getElementById("loading").style.display="none"
}

// login form 
login_form.addEventListener("submit", async(e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const user = Object.fromEntries(data);
  // console.log(user);
  await checkUser(user);
});

const checkUser=async(user) =>{

  const userAuth = new Auth();
  const userStatus =await userAuth.userLogin(user);

  // if (typeof userFind != undefined) {
  if (userStatus===200) {

    // user found and auth token saved in local storage

      const userRole=localStorage.getItem("userRole")

      if (userRole === "user") {
        location.href = "http://127.0.0.1:5501/index.html";
      } else {
        location.href = "http://127.0.0.1:5501/src/pages/Admin/Admin.html";
      }
      return;
   
  } else if(userStatus===404){
    alert("User not found!!!!!!!")

  }else
  {
    alert("Server Error!!!!!!!")
  }
  login_form.reset();
  return;
}

window.onload = function () {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("userRole");
};
