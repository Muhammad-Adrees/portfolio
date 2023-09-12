import { User_registration } from "../links.js";
const login_form = document.getElementById("login_form");


window.onload=function()
{
  document.getElementById("loading").style.display="none"
}
login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const user = Object.fromEntries(data);
  // console.log(user);
  checkUser(user);
});

function checkUser(user) {
  const User = new User_registration();
  const userFind = User.getSingleUserByEmail(user.email);
  console.log("Email-----");
  console.log(userFind);
  // if (typeof userFind != undefined) {
  if (userFind) {
    // found user
    console.log("Inside not undefine");
    if (user.password === userFind.password) {
      // correct user redirect to home page
      console.log("inside equal pass");
      localStorage.setItem("userId", userFind.userId);
      localStorage.setItem("userRole", userFind.userRole);

      if (userFind.userRole === "user") {
        location.href = "http://127.0.0.1:5501/index.html";
      } else {
        location.href = "http://127.0.0.1:5501/src/pages/Admin/Admin.html";
      }
    } else {
      alert("Some of the data is incorrect!!");
      login_form.reset();
    }
  } else {
    alert("Some of the data is incorrect!!");
    login_form.reset();
  }
}

window.onload = function () {
  localStorage.removeItem("userId");
  localStorage.removeItem("userRole");
};
