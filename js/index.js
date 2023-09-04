import dataReceieved from "./fetchData.js";

// JS for index.html

// onLoad I want to fecth data and display on index.html page
let user_infoArr = [];
let aboutArr = [];
let contactArr = [];
let educationArr = [];
let experienceArr = [];
let projectsArr = [];
let skillsArr = [];
let usersArr = [];

let userId = 0;
let userRole = "";
let model_content_handle = document.getElementById("model_content_handle");
let myModal = document.getElementById("myModal");
window.onload = function () {
  // I have to get id from local storage after login and then find data from dataReceived based on id
  // and then passed to each function
  userId = parseInt(localStorage.getItem("userId"));
  userRole = localStorage.getItem("userRole");
  console.log(userId);
  console.log(userRole);

  if (userRole === "admin" || !userRole) {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
  }

  // userId = ;

  userSpecificData();
  modifyDOM();

  // if the user is not loggedin then show 2 buttons on header login,signup

  // change header based on user role
};

function modifyDOM() {
  navHandle();
  headerHandle();
  aboutHandle();
  projectHandle(projectsArr);
  experienceHandle(experienceArr);
  skillsHandle();
  contactHandle();
  footerHandle();
}

function userSpecificData() {
  // specific user data
  aboutArr = dataReceieved.aboutData.filter((item) => {
    return item.userId === userId;
  });

  user_infoArr = dataReceieved.user_infoArr.filter((item) => {
    return item.userId === userId;
  });

  contactArr = dataReceieved.contactArr.filter((item) => {
    return item.userId === userId;
  });

  educationArr = dataReceieved.educationArr.filter((item) => {
    return item.userId === userId;
  });

  experienceArr = dataReceieved.experienceArr.filter((item) => {
    return item.userId === userId;
  });

  skillsArr = dataReceieved.skillArr.filter((item) => {
    return item.userId === userId;
  });

  projectsArr = dataReceieved.projectArr.filter((item) => {
    return item.userId === userId;
  });

  usersArr = dataReceieved.User_registration.filter((item) => {
    return item.userId === userId;
  });
}

function navHandle() {
  let user_name = document.getElementById("user_name");
  const name = usersArr[0].lastName;
  let str = `<a href="/index.html" class="logo_link">${name}</a>`;
  user_name.innerHTML = str;
}

function headerHandle() {
  // header title part------------

  let header_title = document.getElementById("header_title");
  const name = usersArr[0].firstName + " " + usersArr[0].lastName;
  const designation = user_infoArr[0].designation;
  header_title.innerHTML = `
  
  Hi, My name is <span class="name" id="user_full_name">${name}</span><br>I am a ${designation}
  
  `;

  // socials part ---------------
  //  Each user have one social instance in .json

  const header_socials = document.getElementById("header_socials");

  // if social hase no data then it will not show

  const Links = [
    contactArr[0].linkedin,
    contactArr[0].twitter,
    contactArr[0].github,
    contactArr[0].instagram,
  ];
  console.log(Links);
  const social_names = ["linkedin", "twitter", "github", "instagram"];
  let str = "";
  for (let i = 0; i < Links.length; i++) {
    if (Links[i].length != 0) {
      str =
        str +
        `
        <a href="${i}"><i class="fa-brands fa-${social_names[i]}"></i></a>
        `;
    }
  }
  console.log(str);
  header_socials.innerHTML = str;

  // change counters----------------

  let projects_counter = document.getElementById("projects_counter");
  let companies_counter = document.getElementById("companies_counter");
  let experience_counter = document.getElementById("experience_counter");

  projects_counter.innerText = projectsArr.length + "+";
  companies_counter.innerText = experienceArr.length + "+";
  let years = 0;
  for (let i = 0; i < experienceArr.length; i++) {
    years = years + experienceArr[i].years;
  }
  experience_counter.innerText = years + "+";
}
function aboutHandle() {
  // about ---------------

  let about_designation = document.getElementById("about_designation");
  let about_desc = document.getElementById("about_desc");

  about_desc.innerText = aboutArr[0].desc;
  about_designation.innerText =
    "Passionate" + " " + user_infoArr[0].designation;

  // education ------------------

  let about_education_list = document.getElementById("about_education_list");
  let edu_str = "";
  for (let i = 0; i < educationArr.length; i++) {
    edu_str =
      edu_str +
      `
    <li id="about_degree">${educationArr[i].degree} from <span class="about_uni" id="about_university">${educationArr[i].instituteName}</span> </li>
    
    `;
  }

  about_education_list.innerHTML = edu_str;
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

function DescSlice(currentDesc) {
  return `${currentDesc.substr(0, 200)}......`;
}
function projectHandle(projects) {
  // projects----------

  let project_items = document.getElementById("project_items");

  let pro_str = "";

  for (let i = 0; i < projects.length; i++) {
    let media_str = "";
    if (projects[i].exe === ".mp4") {
      media_str = `
      <div class="video_container">
          <video controls>
              <source src=${projects[i].file} type="video/mp4">
            </video>
      </div>
      `;
    } else {
      media_str = `
      <div class="media_container">
        <img src=${projects[i].file}>
      </div>
      `;
    }
    pro_str =
      pro_str +
      `
      <div class="project_item_container">
      <div class="project_info_container info_project" id="testId">
          <input style="display: none;" value="${projects[i].projectId}">
          <p class="project_title">${projects[i].title}</p>
          <p class="project_detail">${DescSlice(projects[i].desc)}</p>
          <div class="project_btn_container">
              <a href="${
                projects[i].sourceLink
              }" class="btn_border">See Live</a>
              <a href="${
                projects[i].liveLink
              }" id="source_btn1" class="filled_btn source_btn">Source Code</a>
          </div>
      </div>
      ${media_str}
  </div>
    
    `;
  }
  project_items.innerHTML = pro_str;
  // info_project
  const items = document.getElementsByClassName('info_project');
  for(let item of items){
  item.addEventListener("click",(e)=>{
    projectView(item.children[0].getAttribute("value"))
    // console.log(e.target)
    // const ele=
    // console.log(ele.getAttribute("value"))
  
  })
  }
}
function experienceHandle(experience) {
  // experience section

  let experience_items = document.getElementById("experience_items");

  let exp_st = "";

  for (let i = 0; i < experience.length; i++) {
    exp_st =
      exp_st +
      `
      <div class="experience_item">
          <input style="display: none;" value="${experience[i].experienceId}">
          <h3 class="experience_title">${experience[i].companyName}</h3>
          <p class="experience_role">${experience[i].role} | <span>${
            experience[i].years
      } years</span></p>
          <p class="experience_detail">${DescSlice(experience[i].desc)}</p>
          <button class="read_experience_btn btn_border read_more_handle">Read More</button>
      </div>
    
    `;
  }

  experience_items.innerHTML = exp_st;

  const items = document.getElementsByClassName('read_more_handle');
  for(let item of items){
  item.addEventListener("click",(e)=>{
    console.log(item.parentNode.children[0])
    experienceView(item.parentNode.children[0].getAttribute("value"))
  })
  }
}
function skillsHandle() {}

function contactHandle() {
  let contact_detail = document.getElementById("contact_detail");
  let name = `${usersArr[0].firstName} ${usersArr[0].lastName}`;
  const con_str = `
  <h3 class="contact_name">${name}</h3>
  <p class="tag_contact_name">${user_infoArr[0].designation}</p>
  <div class="location_contact">
      <i class="fa-solid fa-location-dot" ></i>
      <span>${user_infoArr[0].location}</span>
  </div>
  <div class="email_contact">
      <i class="fa-solid fa-envelope"></i>
      <span><a class="text_link" href="mailto:${contactArr[0].email}" >${contactArr[0].email}</a></span>
  </div>
  <div class="phone_contact">
      <i class="fa-solid fa-phone"></i>
      <span><a href="https://web.whatsapp.com/" class="text_link">${contactArr[0].phone}</a></span>
  </div>

  
  `;

  contact_detail.innerHTML = con_str;



}

function footerHandle() {
  let footer_socials = document.getElementById("footer_socials");

  const Links = [
    contactArr[0].linkedin,
    contactArr[0].twitter,
    contactArr[0].github,
    contactArr[0].instagram,
  ];
  console.log(Links);
  const social_names = ["linkedin", "twitter", "github", "instagram"];
  let str = "";
  for (let i = 0; i < Links.length; i++) {
    if (Links[i].length != 0) {
      str =
        str +
        `
        <a href="${i}"><i class="fa-brands fa-${social_names[i]}"></i></a>
        `;
    }
  }

  footer_socials.innerHTML = str;
}

function projectView(id) {
  // console.log("id clicked:"+parseInt(id))
  const receivedId=parseInt(id)
  const clickedProject = dataReceieved.projectArr.filter((item) => {
    return item.projectId === receivedId && item.userId === userId;
  });

  console.log(clickedProject)
  let media_str=""
  if (clickedProject[0].exe === ".mp4") {
    media_str = `
    <div class="video_container">
        <video width="400" controls>
            <source src=${clickedProject[0].file} type="video/mp4">
          </video>
    </div>
    `;
  } else {
    media_str = `
    <div class="media_container">
        <img src=${clickedProject[0].file} width="350">
    </div>
    `;
  }
  let str =`
  ${media_str}
  <p class="model_title">${clickedProject[0].title}</p>
  <p class="model_detail">${clickedProject[0].desc}</p>`


  model_content_handle.innerHTML = str;
  myModal.style.display = "block";

  // console.log(obj)
}
function experienceView(id) {
  // console.log("id clicked:"+parseInt(id))
  const receivedId=parseInt(id)
  const clickedProject = dataReceieved.experienceArr.filter((item) => {
    return item.experienceId === receivedId && item.userId === userId;
  });

  console.log(clickedProject)
  let str =`
  <p class="model_title">${clickedProject[0].companyName}</p>
  <p class="model_sub_title">${clickedProject[0].role}</p>
  <p class="model_date">${dateSlice(
    experienceArr[0].startDate
  )} - ${dateSlice(experienceArr[0].endDate)}</p>
  <p class="model_detail">${clickedProject[0].desc}</p>`


  model_content_handle.innerHTML = str;
  myModal.style.display = "block";

  // console.log(obj)
}



let logout_btn_handle = document.getElementById("logout_btn_handle");

logout_btn_handle.addEventListener("click", () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userRole");

  location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
});

let close_model_handle=document.getElementById("close_model_handle")

close_model_handle.addEventListener("click",()=>{
  myModal.style.display="none"
})

window.onclick = function(event) {
  if (event.target == myModal) {
    myModal.style.display = "none";
  }
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
    searchedProjectArr = projectsArr.filter((item) => {
      return item.title.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="desc")
  {
    searchedProjectArr = projectsArr.filter((item) => {
      return item.desc.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  projectHandle(searchedProjectArr)


})

search_project_keyword_input.onchange=function(){

  let input_val=search_project_keyword_input.value;
  let select_val=projectKeyword.value;
  if(select_val==="title")
  {
    searchedProjectArr = projectsArr.filter((item) => {
      return item.title.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="desc")
  {
    searchedProjectArr = projectsArr.filter((item) => {
      return item.desc.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  projectHandle(searchedProjectArr)
 
}
projectKeyword.onchange=function(){
  let input_val=search_project_keyword_input.value;
  let select_val=projectKeyword.value;
 
  if(select_val==="title")
  {
    searchedProjectArr = projectsArr.filter((item) => {
      return item.title.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="desc")
  {
    searchedProjectArr = projectsArr.filter((item) => {
      return item.desc.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  projectHandle(searchedProjectArr)
}




// Experience search handling-----------

let experience_search_form=document.getElementById("experience_search_form");
let search_experience_keyword_input=document.getElementById("search_experience_keyword_input");
let experienceKeyword=document.getElementById("experienceKeyword");
let searchedExperienceArr=[]

experience_search_form.addEventListener("submit",(e)=>{

  e.preventDefault();
  let input_val=search_experience_keyword_input.value;
  let select_val=experienceKeyword.value;
  if(select_val==="companyName")
  {
    searchedExperienceArr = experienceArr.filter((item) => {
      return item.companyName.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="role")
  {
    searchedExperienceArr = experienceArr.filter((item) => {
      return item.role.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="desc")
  {
    searchedExperienceArr = experienceArr.filter((item) => {
      return item.desc.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  experienceHandle(searchedExperienceArr)


})

search_experience_keyword_input.onchange=function(){

  let input_val=search_experience_keyword_input.value;
  let select_val=experienceKeyword.value;
  if(select_val==="companyName")
  {
    searchedExperienceArr = experienceArr.filter((item) => {
      return item.companyName.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="role")
  {
    searchedExperienceArr = experienceArr.filter((item) => {
      return item.role.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="desc")
  {
    searchedExperienceArr = experienceArr.filter((item) => {
      return item.desc.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  experienceHandle(searchedExperienceArr)
 
}
experienceKeyword.onchange=function(){
  e.preventDefault();
  let input_val=search_experience_keyword_input.value;
  let select_val=experienceKeyword.value;
  if(select_val==="companyName")
  {
    searchedExperienceArr = experienceArr.filter((item) => {
      return item.companyName.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="role")
  {
    searchedExperienceArr = experienceArr.filter((item) => {
      return item.role.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="desc")
  {
    searchedExperienceArr = experienceArr.filter((item) => {
      return item.desc.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  experienceHandle(searchedExperienceArr)
}