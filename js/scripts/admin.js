import adminfetchDate from "../adminfetchData.js";
import { User_registration } from "../classes/User_registration.js";
import { Admin_project } from "../classes/Admin_project.js";
  
let projectsArr, activeUsersArr,current_userArr 

const initialize=()=>{
  projectsArr = adminfetchDate.dataReceieved.projectsArr;
  activeUsersArr = adminfetchDate.dataReceieved.usersArr;
  current_userArr=adminfetchDate.dataReceieved.current_userArr;
}
let auth_token="";
let userRole = "";


let model_content_handle = document.getElementById("model_content_handle");
let myModal = document.getElementById("myModal");


auth_token = localStorage.getItem("auth_token");
userRole = localStorage.getItem("userRole");
if (!userRole) {
  location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
}
  if (userRole === "user") {
    location.href = "http://127.0.0.1:5501/index.html";
  }

window.onload = async function () {
  document.getElementById("loading").style.display="none"
    await adminfetchDate.run();
    initialize()
    modifyDOM();
};

function modifyDOM() {
  navHandle();
  userHandle(activeUsersArr);
  projectHandle(projectsArr);
}

// user handle
const userAdd=async(upUser)=>{
  // add user

  const user_obj=new User_registration();

  // add new user
  await user_obj.addUser(auth_token,upUser);

  // get users
  activeUsersArr=await user_obj.getUsers(auth_token)

  // update dom
  userHandle(activeUsersArr);

}
const userUpdate=async(upUser,userid)=>{
   // add user

   const user_obj=new User_registration();

   // add new user
   await user_obj.updateUser(auth_token,userid,upUser);
 
   // get users
   activeUsersArr=await user_obj.getUsers(auth_token)
 
   // update dom
   userHandle(activeUsersArr);

}
const userDelete=async(userid)=>{
  // add user

  const user_obj=new User_registration();

  // add new user
  await user_obj.deleteSingleUser(auth_token,userid);

  // get users
  activeUsersArr=await user_obj.getUsers(auth_token)

  // update dom
  userHandle(activeUsersArr);

}

// project handle

const deleteProject=async(pId)=>{
  const project_obj=new Admin_project();

  await project_obj.deleteAdminProject(auth_token,pId);

  projectsArr=await project_obj.getAdminProjects(auth_token);

  projectHandle(projectsArr)

}


function navHandle() {
  let user_name = document.getElementById("user_name");
  const name = current_userArr[0].last_name;
  let str = `<a href="/src/pages/Admin/Admin.html" class="logo_link">${name}</a>`;
  user_name.innerHTML = str;
}

function userHandle(users) {
  let admin_project_items = document.getElementById("admin_project_items");
  let user_str = "";

  if(users.length>0)
  {
    

    
    for (let i = 0; i < users.length; i++) {
      user_str =
        user_str +
        `
      <div class="user_fetched_item">
      <input style="display: none;" value="${users[i].user_id}">
        <div class="user_item_info">
            <span class="item_info">${users[i].first_name}</span>
            <span class="item_info">${users[i].last_name}</span>
            <span class="item_info">${users[i].email}</span>
            <span class="item_info">${users[i].user_role}</span>
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
      deleteClickedUser(item.parentNode.parentNode.children[0].getAttribute("value"))
    })
    }
    const user_update = document.getElementsByClassName('user_update');
    for(let item of user_update){
    item.addEventListener("click",(e)=>{
      updateForm(item.parentNode.parentNode.children[0].getAttribute("value"))
    })
    }
  }
  else
  {
    user_str=`
    <p class="no_result_text">No user found</p>
    <div class="section_container_css add_user">
        <button class="filled_btn add_pro_btn" id="Add_user_btn">Add User </button>
        
    </div>
  
    `
    admin_project_items.innerHTML = user_str;
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
            <source src=${project[i].file} type="video/mp4">
            </video>
        </div>
      `;
    } else {
      media_str = `
      <div class="item_media">
         <img src=${project[i].file} width="100">
      </div>
      `;
    }

    pro_str =
      pro_str +
      `
      <div class="project_fetched_item">
        <input style="display: none;" value="${project[i].project_id}">
        <div class="item_detail_section">
            ${media_str}
            <div class="item_info">
            <p class="item_heading">${project[i].title}</p>
            <h3 class="item_date">${dateSlice(
              project[i].start_date
            )} - ${dateSlice(project[i].end_date)}</h3>
            </div>
        </div>
        <p class="item_p">${project[i].description}</p>

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



async function deleteClickedUser(id)
{
    await userDelete(id)
}

function updateForm(id)
{
  let str='';
  let receivedId=undefined;
  if(id)
  {

    receivedId=parseInt(id)
    const clickedUser = activeUsersArr.filter((item) => {
      return  item.user_id === receivedId;
    });
    str=`<form id="user_form">
    <div className=''>
    <label for="firstName" class="label_input">First Name:</label>
    <input
        type="text"
        id="firstName"
        name="firstName"
        value=${clickedUser[0].first_name}
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
        value=${clickedUser[0].last_name}
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
    <label for="password" class="label_input">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          class='input_field'
          placeholder='Enter password Here'
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

  user_form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);
    let updatedVersion;

    if(receivedId)
    {
      updatedVersion={
        first_name: obj.firstName,
        last_name: obj.lastName,
        email: obj.email,
        user_role: obj.userRole,
      }

    }
    else
    {
      updatedVersion={
        first_name: obj.firstName,
        last_name: obj.lastName,
        email: obj.email,
        password: obj.password,
        user_role: obj.userRole,
      }
    }


    if(receivedId)
    {
      await userUpdate(updatedVersion,receivedId)
      
    }
    else
    {
      await userAdd(updatedVersion)
    }
    
    myModal.style.display = "none";

  })
}

async function projectDelete(id)
{
  await deleteProject(id)
}

let logout_btn = document.getElementById("logout_btn");

logout_btn.addEventListener("click", () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("userRole");

  location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
});


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
      return checkInTitle(Array(item),input_val).length>0 || checkInDesc(Array(item),input_val).length>0 
    });
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
      return checkInTitle(Array(item),input_val).length>0 || checkInDesc(Array(item),input_val).length>0 
    });
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
      return checkInTitle(Array(item),input_val).length>0 || checkInDesc(Array(item),input_val).length>0 
    });
  }
  projectHandle(searchedProjectArr)
}



function checkInDesc(projectsArr,input_val){
  return   projectsArr.filter((item) => {
    return item.description.toLowerCase().includes(input_val.toLowerCase());
  });
}
function checkInTitle(projectsArr,input_val){
 const searchedProjectArr = projectsArr.filter((item) => {
    return item.title.toLowerCase().includes(input_val.toLowerCase());
  });
  return searchedProjectArr;
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
    searchedUserArr = searchInfirstName(activeUsersArr,input_val);
  }
  else if(select_val==="lastName")
  {
    searchedUserArr = searchInlastName(activeUsersArr,input_val)
  }
  else if(select_val==="email")
  {
    searchedUserArr = searchInEmail(activeUsersArr,input_val)
  }
  else if(select_val==="userRole")
  {
    searchedUserArr = searchInuserRole(activeUsersArr,input_val)
  }else if(select_val==="all")
  {
    searchedUserArr= activeUsersArr.filter((item) => {
      return searchInEmail(Array(item),input_val).length>0 || searchInfirstName(Array(item),input_val).length>0 
      || searchInlastName(Array(item),input_val).length>0 || searchInuserRole(Array(item),input_val).length>0
    });
  }
  userHandle(searchedUserArr)


})

search_user_keyword_input.onchange=function(){
  
  let input_val=search_user_keyword_input.value;
  let select_val=userKeyword.value;
  if(select_val==="firstName")
  {
    searchedUserArr = searchInfirstName(activeUsersArr,input_val);
  }
  else if(select_val==="lastName")
  {
    searchedUserArr = searchInlastName(activeUsersArr,input_val)
  }
  else if(select_val==="email")
  {
    searchedUserArr = searchInEmail(activeUsersArr,input_val)
  }
  else if(select_val==="userRole")
  {
    searchedUserArr = searchInuserRole(activeUsersArr,input_val)
  }else if(select_val==="all")
  {
    searchedUserArr= activeUsersArr.filter((item) => {
      return searchInEmail(Array(item),input_val).length>0 || searchInfirstName(Array(item),input_val).length>0 
      || searchInlastName(Array(item),input_val).length>0 || searchInuserRole(Array(item),input_val).length>0
    });
  }
  userHandle(searchedUserArr)
 
}
userKeyword.onchange=function(){
  let input_val=search_user_keyword_input.value;
  let select_val=userKeyword.value;
  if(select_val==="firstName")
  {
    searchedUserArr = searchInfirstName(activeUsersArr,input_val);
  }
  else if(select_val==="lastName")
  {
    searchedUserArr = searchInlastName(activeUsersArr,input_val)
  }
  else if(select_val==="email")
  {
    searchedUserArr = searchInEmail(activeUsersArr,input_val)
  }
  else if(select_val==="userRole")
  {
    searchedUserArr = searchInuserRole(activeUsersArr,input_val)
  }else if(select_val==="all")
  {
    searchedUserArr= activeUsersArr.filter((item) => {
      return searchInEmail(Array(item),input_val).length>0 || searchInfirstName(Array(item),input_val).length>0 
      || searchInlastName(Array(item),input_val).length>0 || searchInuserRole(Array(item),input_val).length>0
    });
  }
  userHandle(searchedUserArr)
}


function searchInEmail(activeArr,input_val){
  return activeArr.filter((item) => {
    return item.email.toLowerCase().includes(input_val.toLowerCase());
  });
}
function searchInfirstName(activeArr,input_val){
  return activeArr.filter((item) => {
    return item.first_name.toLowerCase().includes(input_val.toLowerCase());
  });
}
function searchInlastName(activeArr,input_val){
  return activeArr.filter((item) => {
    return item.last_name.toLowerCase().includes(input_val.toLowerCase());
  });
}
function searchInuserRole(activeArr,input_val){
  return activeArr.filter((item) => {
    return item.user_role.toLowerCase().includes(input_val.toLowerCase());
  });
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
