import dataReceieved from "../fetchData.js";
import {
  Project,
  User_registration
} from "../links.js";
let projectsArr = dataReceieved.projectArr;
let currArr = [];
let activeUsersArr = dataReceieved.User_registration;

let userId = 0;
let userRole = "";
let model_content_handle = document.getElementById("model_content_handle");
let myModal = document.getElementById("myModal");

window.onload = function () {
  document.getElementById("loading").style.display="none"
  userId = parseInt(localStorage.getItem("userId"));
  userRole = localStorage.getItem("userRole");
  if (!userRole) {
    location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
  }
    if (userRole === "user") {
      location.href = "http://127.0.0.1:5501/index.html";
    }

  userSpecificData();
  modifyDOM();
};

function userSpecificData() {
  // specific user data
  currArr = dataReceieved.User_registration.filter((item) => {
    return item.userId === userId;
  });
}
function modifyDOM() {
  navHandle();
  userHandle(activeUsersArr);
  projectHandle(projectsArr);
}

function navHandle() {
  let user_name = document.getElementById("user_name");
  const name = currArr[0].lastName;
  let str = `<a href="/src/pages/Admin/Admin.html" class="logo_link">${name}</a>`;
  user_name.innerHTML = str;
}

function userHandle(users) {
  let admin_project_items = document.getElementById("admin_project_items");
  let user_str = "";

  for (let i = 0; i < users.length; i++) {
    user_str =
      user_str +
      `
    <div class="user_fetched_item">
    <input style="display: none;" value="${users[i].userId}">
      <div class="user_item_info">
          <span class="item_info">${users[i].firstName}</span>
          <span class="item_info">${users[i].lastName}</span>
          <span class="item_info">${users[i].email}</span>
          <span class="item_info">${users[i].userRole}</span>
      </div>
      <div class="user_btn_container">
          <button class="btn_border user_delete">Delete User</button>
          <button class="filled_btn user_update">Update User</button>
      </div>
    </div>
    
    `;
  }

  user_str=`
  ${user_str}
  <div class="section_container_css add_user">
      <button class="filled_btn add_pro_btn" id="Add_user_btn">Add User </button>
      
  </div>

  `
  admin_project_items.innerHTML = user_str;
  const user_delete = document.getElementsByClassName('user_delete');
  for(let item of user_delete){
  item.addEventListener("click",(e)=>{
    userDelete(item.parentNode.parentNode.children[0].getAttribute("value"))
  })
  }
  const user_update = document.getElementsByClassName('user_update');
  for(let item of user_update){
  item.addEventListener("click",(e)=>{
    updateForm(item.parentNode.parentNode.children[0].getAttribute("value"))
  })
  }

  const Add_user_btn=document.getElementById("Add_user_btn")
  Add_user_btn.addEventListener("click",()=>{
    updateForm(undefined)
  })
}
function dateSlice(dt) {
  const date = new Date(dt);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `
    ${monthNames[date.getMonth()]}  ${date.getFullYear()}
    `;
}

function projectHandle(project) {
  let profile_project_items = document.getElementById("profile_project_items");
  let pro_str = "";
  if(project.length===0)
  {
    pro_str=
    `
    <p class="no_result_text">No project found</p>
    `
    profile_project_items.innerHTML=pro_str
    return;
  }

  for (let i = 0; i < project.length; i++) {
    let media_str = "";
    if (project[i].exe === ".mp4") {
      media_str = `
      <div class="item_media">
        <video class="project_media" controls>
            <source src="../../../public/project.mp4" type="video/mp4">
            </video>
        </div>
      `;
    } else {
      media_str = `
      <div class="item_media">
         <img src="../../../public/contact.jpg" width="100">
    </div>
      `;
    }


    let lan_str='',tag_str=''

    if(project[i].languages.length>0)
    {
      for (let j = 0; j < project[i].languages.length; j++) 
      {

        lan_str=lan_str+`
        
        <div class="lan_item">
            <span class="lan_item_lan">${project[i].languages[j].lanName} <span  class="lan_item_per">${project[i].languages[j].lanPer}%</span></span>
            <progress class="lan_item_pro" value='${project[i].languages[j].lanPer}' max="100"></progress>
        </div>
        
        `
      }
    }
    if(project[i].tags.length>0)
    {
      for (let k = 0; k < project[i].tags.length; k++) 
      {
        if(k==0)
        {
          tag_str=tag_str+`
          <div class="tag_container">
          <p class="tag_head"> Tags:</p>
          `
        }
        tag_str=tag_str+`
        
        <span class="tag_item">${project[i].tags[k].tagName}</span>
        
        `
      }

      tag_str=tag_str+`
      </div>
      `
    }
    pro_str =
      pro_str +
      `
      <div class="project_fetched_item">
        <input style="display: none;" value="${project[i].projectId}">
        <div class="item_detail_section">
            ${media_str}
            <div class="item_info">
            <p class="item_heading">${project[i].title}</p>
            <h3 class="item_date">${dateSlice(
              project[i].startDate
            )} - ${dateSlice(project[i].endDate)}</h3>
            </div>
        </div>
        <p class="item_p">${project[i].desc}</p>
        ${lan_str}
        ${tag_str}

        <button class="filled_btn project_delete_btn">Delete Project</button>
        <hr class="item_divider">
      </div>
    
    `;
  }
  profile_project_items.innerHTML = pro_str;

  let project_delete_btn=document.getElementsByClassName("project_delete_btn")
  for(let item of project_delete_btn){
    item.addEventListener("click",(e)=>{
      console.log("clicked")
      projectDelete(item.parentNode.children[0].getAttribute("value"))
    })
    }
}



function userDelete(id)
{
  let userObj=new User_registration()
  userObj.deleteUser(id)
  console.log("clicked delete user:"+id)
}

function updateForm(id)
{
  let str='';
  let receivedId=undefined;
  if(id)
  {

    receivedId=parseInt(id)
    const clickedUser = activeUsersArr.filter((item) => {
      return  item.userId === receivedId;
    });
    str=`<form id="user_form">
    <div className=''>
    <label for="firstName" class="label_input">First Name:</label>
    <input
        type="text"
        id="firstName"
        name="firstName"
        value=${clickedUser[0].firstName}
        class='input_field'
        placeholder='Enter First Name Here'
        required
      />
    </div>
    <div className=''>
    <label for="lastName" class="label_input">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value=${clickedUser[0].lastName}
        class='input_field'
        placeholder='Enter Last Name Here'
        required
      />
    </div>
    <div className=''>
    <label for="email" class="label_input">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value=${clickedUser[0].email}
          class='input_field'
          placeholder='Enter Email Here'
          required
        />
      </div>
        <div className=''>
        <label for="userRole" class="label_input">Select User Role:</label>
        <select name="userRole" id="userRole" class="input_field">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        </div>
      
        <button type="submit" class='user_submit filled_btn' id="user_submit_btn">Update User</button>
      </form>
`
  }
  else
  {
    str=`<form id="user_form">
    <div className=''>
    <label for="firstName" class="label_input">First Name:</label>
    <input
        type="text"
        id="firstName"
        name="firstName"
        class='input_field'
        placeholder='Enter First Name Here'
        required
      />
    </div>
    <div className=''>
    <label for="lastName" class="label_input">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        class='input_field'
        placeholder='Enter Last Name Here'
        required
      />
    </div>
    <div className=''>
    <label for="email" class="label_input">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          class='input_field'
          placeholder='Enter Email Here'
          required
        />
      </div>
        <div className=''>
        <label for="userRole" class="label_input">Select User Role:</label>
        <select name="userRole" id="userRole" class="input_field">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        </div>
      
        <button type="submit" class='user_submit filled_btn' id="user_submit_btn">Add User</button>
      </form>
`
  }
  console.log(`update id::`+id)

  model_content_handle.innerHTML=str;
  myModal.style.display="block";


  let user_form=document.getElementById("user_form")

  user_form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);
    const updatedVersion={
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      password: obj.password,
      userRole: obj.userRole,
    }


    let pObj=new User_registration();
    if(receivedId)
    {
      pObj.updateUser(receivedId,updatedVersion);
      
    }
    else
    {
      pObj.addUser(updatedVersion);
    }
    
    myModal.style.display = "none";

  })
}

function projectDelete(id)
{
  const pObj=new Project();

  pObj.deleteProject(id);

}

let logout_btn = document.getElementById("logout_btn");

logout_btn.addEventListener("click", () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userRole");

  location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
});

function userDeleteHandle(id) {
  console.log("Active id:" + id);
}
function projectDeleteHandle(id) {
  console.log("Active project:" + id);
}
function userupdateHandle(id) {
  console.log("Active id:" + id);
}



// Project search handling-----------

let project_search_form=document.getElementById("project_search_form");
let search_project_keyword_input=document.getElementById("search_project_keyword_input");
let projectKeyword=document.getElementById("projectKeyword");
let searchedProjectArr=[]

project_search_form.addEventListener("submit",(e)=>{

  e.preventDefault();
  let input_val=search_project_keyword_input.value;
  let select_val=projectKeyword.value;
  if(select_val==="title")
  {
    searchedProjectArr=checkInTitle(projectsArr,input_val)
  }
  else if(select_val==="desc")
  {

    searchedProjectArr=checkInDesc(projectsArr,input_val)
  }else if(select_val==="all")
  {
    searchedProjectArr = projectsArr.filter((item) => {
      return checkInTitle(Array(item),input_val).length>0 || checkInDesc(Array(item),input_val).length>0 || checkInLan(Array(item),input_val).length>0  || checkInTag(Array(item),input_val).length>0 
    });
    console.log(searchedProjectArr)
  }else if(select_val==="lanName")
  {
    searchedProjectArr =checkInLan(projectsArr,input_val)
  }
  else if(select_val==="tagName")
  {
    searchedProjectArr = checkInTag(projectsArr,input_val)
  }
  projectHandle(searchedProjectArr)

})

search_project_keyword_input.onchange=function(){

  let input_val=search_project_keyword_input.value;
  let select_val=projectKeyword.value;
  if(select_val==="title")
  {
    searchedProjectArr=checkInTitle(projectsArr,input_val)
  }
  else if(select_val==="desc")
  {

    searchedProjectArr=checkInDesc(projectsArr,input_val)
  }else if(select_val==="all")
  {
    searchedProjectArr = projectsArr.filter((item) => {
      return checkInTitle(Array(item),input_val).length>0 || checkInDesc(Array(item),input_val).length>0 || checkInLan(Array(item),input_val).length>0  || checkInTag(Array(item),input_val).length>0 
    });
    console.log(searchedProjectArr)
  }else if(select_val==="lanName")
  {
    searchedProjectArr =checkInLan(projectsArr,input_val)
  }
  else if(select_val==="tagName")
  {
    searchedProjectArr = checkInTag(projectsArr,input_val)
  }
  projectHandle(searchedProjectArr)
 
}
projectKeyword.onchange=function(){
  let input_val=search_project_keyword_input.value;
  let select_val=projectKeyword.value;
  if(select_val==="title")
  {
    searchedProjectArr=checkInTitle(projectsArr,input_val)
  }
  else if(select_val==="desc")
  {

    searchedProjectArr=checkInDesc(projectsArr,input_val)
  }else if(select_val==="all")
  {
    searchedProjectArr = projectsArr.filter((item) => {
      return checkInTitle(Array(item),input_val).length>0 || checkInDesc(Array(item),input_val).length>0 || checkInLan(Array(item),input_val).length>0  || checkInTag(Array(item),input_val).length>0 
    });
    console.log(searchedProjectArr)
  }else if(select_val==="lanName")
  {
    searchedProjectArr =checkInLan(projectsArr,input_val)
  }
  else if(select_val==="tagName")
  {
    searchedProjectArr = checkInTag(projectsArr,input_val)
  }
  projectHandle(searchedProjectArr)
}



function checkInDesc(projectsArr,input_val){
  return   projectsArr.filter((item) => {
    return item.desc.toLowerCase().includes(input_val.toLowerCase());
  });
}
function checkInTag(projectsArr,input_val){
  return projectsArr.filter((item) => {
    for (let i = 0; i < item.tags.length; i++) {
      if(item.tags[i].tagName.toLowerCase().includes(input_val.toLowerCase()))
        {
          console.log(item)
          return item;
        }
      
    }
    
  });
}
function checkInTitle(projectsArr,input_val){
 const searchedProjectArr = projectsArr.filter((item) => {
    return item.title.toLowerCase().includes(input_val.toLowerCase());
  });
  return searchedProjectArr;
}
function checkInLan(projectsArr,input_val){
  return projectsArr.filter((item) => {
    for (let i = 0; i < item.languages.length; i++) {
      if(item.languages[i].lanName.toLowerCase().includes(input_val.toLowerCase()))
        {
          console.log(item)
          return item;
        }
      
    }
    
  });
}



// User search handling-----------

let user_search_form=document.getElementById("user_search_form");
let search_user_keyword_input=document.getElementById("search_user_keyword_input");
let userKeyword=document.getElementById("userKeyword");
let searchedUserArr=[]

user_search_form.addEventListener("submit",(e)=>{

  e.preventDefault();
  let input_val=search_user_keyword_input.value;
  let select_val=userKeyword.value;
  if(select_val==="firstName")
  {
    searchedUserArr = activeUsersArr.filter((item) => {
      return item.firstName.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="lastName")
  {
    searchedUserArr = activeUsersArr.filter((item) => {
      return item.lastName.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="email")
  {
    searchedUserArr = activeUsersArr.filter((item) => {
      return item.email.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="userRole")
  {
    searchedUserArr = activeUsersArr.filter((item) => {
      return item.userRole.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  userHandle(searchedUserArr)


})

search_user_keyword_input.onchange=function(){
  
  let input_val=search_user_keyword_input.value;
  let select_val=userKeyword.value;
  if(select_val==="firstName")
  {
    searchedUserArr = activeUsersArr.filter((item) => {
      return item.firstName.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="lastName")
  {
    searchedUserArr = activeUsersArr.filter((item) => {
      return item.lastName.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="email")
  {
    searchedUserArr = activeUsersArr.filter((item) => {
      return item.email.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="userRole")
  {
    searchedUserArr = activeUsersArr.filter((item) => {
      return item.userRole.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  userHandle(searchedUserArr)
 
}
userKeyword.onchange=function(){
  let input_val=search_user_keyword_input.value;
  let select_val=userKeyword.value;
  if(select_val==="firstName")
  {
    searchedUserArr = activeUsersArr.filter((item) => {
      return item.firstName.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="lastName")
  {
    searchedUserArr = activeUsersArr.filter((item) => {
      return item.lastName.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="email")
  {
    searchedUserArr = activeUsersArr.filter((item) => {
      return item.email.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="userRole")
  {
    searchedUserArr = activeUsersArr.filter((item) => {
      return item.userRole.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  userHandle(searchedUserArr)
}

window.onclick = function(event) {
  if (event.target == myModal) {
    myModal.style.display = "none";
  }
}

let close_model_handle=document.getElementById("close_model_handle")

close_model_handle.addEventListener("click",()=>{
  myModal.style.display="none"
})
