import { Auth } from "../links.js";

const user_reg_form = document.getElementById("user_reg_form");
// window.onload=function()
// {
//   document.getElementById("loading").style.display="none"
// }
user_reg_form.addEventListener("submit", async(e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const user = Object.fromEntries(data);

  if (user.password != user.confirmPassword) {
    alert("Some of the field is not valid");
    user_reg_form.reset();
  } else if(user.password.length<9){

    alert("Password should be of 9 or more characters long")
    user_reg_form.reset();

  }else {

    const newUser = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
      user_role: "user",
      auth_token:""
    };
    const reqStatus= await addUser(newUser)
    if(!reqStatus)
    {
      user_reg_form.reset();
    }
    else
    {
      location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
    }
  }

});

const addUser=async(user)=> {
  console.log(user)
  const userAuth = new Auth();
  const reqStatus=await userAuth.userRegister(user);
  return reqStatus;
}

window.onload = function () {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("userRole");
};
