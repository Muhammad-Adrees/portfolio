import { User_registration } from "../links.js";

const user_reg_form = document.getElementById("user_reg_form");
window.onload=function()
{
  document.getElementById("loading").style.display="none"
}
user_reg_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const user = Object.fromEntries(data);
  if (user.password != user.confirmPassword) {
    alert("Some of the field is not valid");
    user_reg_form.reset();
  } else {
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      userRole: "user",
    };
    addUser(newUser);
    const loggedInUser = getUser("anonymousboypersonal@gmail.com");
    localStorage.setItem("user", {
      userId: loggedInUser.userId,
      userRole: loggedInUser.userRole,
    });
  }

  location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
});

function addUser(user) {
  const User = new User_registration();
  User.addUser(user);
}
function getUser(email) {
  const User = new User_registration();
  return User.getSingleUserByEmail(email);
}

window.onload = function () {
  localStorage.removeItem("userId");
  localStorage.removeItem("userRole");
};
