import fetchDate from "./fetchData.js";

// JS for index.html

// onLoad I want to fecth data and display on index.html page
let user_infoArr, aboutArr,contactArr,
educationArr,experienceArr,projectsArr,
skillsArr,project_languageArr,project_tagArr,current_user;
const initialize=()=>{
  user_infoArr = fetchDate.dataReceieved.user_infoArr;
  aboutArr = fetchDate.dataReceieved.aboutArr;
  contactArr = fetchDate.dataReceieved.contactArr;
  educationArr = fetchDate.dataReceieved.educationArr;
  experienceArr = fetchDate.dataReceieved.experienceArr;
  projectsArr = fetchDate.dataReceieved.projectsArr;
  skillsArr = fetchDate.dataReceieved.skillsArr;
   project_languageArr=fetchDate.dataReceieved.project_languageArr;
  project_tagArr=fetchDate.dataReceieved.project_tagArr;
  current_user=fetchDate.dataReceieved.current_user;
}

console.log(current_user)


let userRole = "";
let model_content_handle = document.getElementById("model_content_handle");
let myModal = document.getElementById("myModal");

let auth_token = localStorage.getItem("auth_token");
userRole = localStorage.getItem("userRole");
console.log(auth_token);
console.log(userRole);

if (userRole === "admin" || !userRole) {
  localStorage.removeItem("userId");
  localStorage.removeItem("auth_token");

  location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
}


window.onload = async function () {
  // I have to get id from local storage after login and then find data from dataReceived based on id
  // and then passed to each function
  document.getElementById("loading").style.display="none"
  // userId = ;
 
  await fetchDate.run();
  initialize()
  modifyDOM();

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

const getProjectTag=(id)=>{
  id=parseInt(id)
  return project_tagArr.filter((item) => {
          return item.project_id === id;
        });
}
const getProjectLanguages=(id)=>{
  id=parseInt(id)
  return project_languageArr.filter((item) => {
    return item.project_id === id;
  });
}
function navHandle() {
  let user_name = document.getElementById("user_name");
  const name = current_user[0].last_name;
  let str = `<a href="/index.html" class="logo_link">${name}</a>`;
  user_name.innerHTML = str;
}

function headerHandle() {
  // header title part------------
  let header_title = document.getElementById("header_title");
  if(user_infoArr.length>0)
    {
      const name = current_user[0].first_name + " " + current_user[0].last_name;
      const designation = user_infoArr[0].designation;
      header_title.innerHTML = `
      
      Hi, My name is <span class="name" id="user_full_name">${name}</span><br>I am a ${designation}
      
      `;
    }
    else
    {
      const h_str=`<p class="no_result_text">Add user info</p>`;
      header_title.innerHTML=h_str;
    }

  // socials part ---------------
  //  Each user have one social instance in .json

  const header_socials = document.getElementById("header_socials");

  // if social hase no data then it will not show
    if(contactArr.length>0)
    {
      const Links = [
        contactArr[0].linkedin,
        contactArr[0].twitter,
        contactArr[0].github,
        contactArr[0].instagram,
      ];
      const social_names = ["linkedin", "twitter", "github", "instagram"];
      let str = "";
      for (let i = 0; i < Links.length; i++) {
        if (Links[i].length != 0) {
          str =
            str +
            `
            <a href="${Links[i]}"><i class="fa-brands fa-${social_names[i]}"></i></a>
            `;
        }
      }
      header_socials.innerHTML = str;
    }

  // change counters----------------
    if(projectsArr.length>0 && experienceArr.length>0)
    {
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
}
function aboutHandle() {
  // about ---------------
  let about_designation = document.getElementById("about_designation");
  let about_desc = document.getElementById("about_desc");

  const ab_str=`<p class="no_result_text white_text">No about found</p>`
  const e_str=`<p class="no_result_text white_text">No education found</p>`
  if(aboutArr.length>0)
  {
    about_desc.innerText = aboutArr[0].description;
  }
  else{
    about_desc.innerHTML = ab_str;
  }
  if(user_infoArr.length>0)
  {

    about_designation.innerText =
      "Passionate" + " " + user_infoArr[0].designation;
  }
  
  

  // education ------------------

  if(educationArr.length>0)
  {
    
    let about_education_list = document.getElementById("about_education_list");
    let edu_str = "";
    for (let i = 0; i < educationArr.length; i++) {
      edu_str =
        edu_str +
        `
      <li id="about_degree">${educationArr[i].degree} from <span class="about_uni" id="about_university">${educationArr[i].institute_name}</span> </li>
      
      `;
    }
  
    about_education_list.innerHTML = edu_str;
  }
  else
  {
    about_education_list.innerHTML = e_str;
  }

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
  if(projects.length===0)
  {
    console.log("inside 0 projects")
    pro_str=
    `
    <p class="no_result_text">No project found</p>
    `
    project_items.innerHTML=pro_str
    return;
  }


  for (let i = 0; i < projects.length; i++) 
  {
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
    // for languages and tags
    let lan_str='',tag_str=''
    const p_id=projects[i].project_id;
    console.log("p_id:"+p_id)
    const project_specific_tag_Arr=getProjectTag(p_id);

    const project_specific_lan_Arr=getProjectLanguages(p_id);
    if(project_specific_lan_Arr.length>0)
    {
      for (let j = 0; j < project_specific_lan_Arr.length; j++) 
      {

        lan_str=lan_str+`
        
        <div class="lan_item">
            <span class="lan_item_lan">${project_specific_lan_Arr[j].lan_name} <span  class="lan_item_per">${project_specific_lan_Arr[j].lan_percentage}%</span></span>
            <progress class="lan_item_pro" value='${project_specific_lan_Arr[j].lan_percentage}' max="100"></progress>
        </div>
        
        `
      }
    }
    if(project_specific_tag_Arr.length>0)
    {
      for (let k = 0; k < project_specific_tag_Arr.length; k++) 
      {
        if(k==0)
        {
          tag_str=tag_str+`
          <div class="tag_container">
          <p class="tag_head"> Tags:</p>
          `
        }
        tag_str=tag_str+`
        
        <span class="tag_item">${project_specific_tag_Arr[k].tag_name}</span>
        
        `
      }

      tag_str=tag_str+`
      </div>
      `
    }

    pro_str =
      pro_str +
      `
      <div class="project_item_container">
      <div class="project_info_container info_project" id="testId">
          <input style="display: none;" value="${projects[i].project_id}">
          <p class="project_title">${projects[i].title}</p>
          <p class="project_detail">${DescSlice(projects[i].description)}</p>
          ${lan_str}
          ${tag_str}
          <div class="project_btn_container">
              <a href="${
                projects[i].source_link
              }" class="btn_border">See Live</a>
              <a href="${
                projects[i].live_link
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
  
  })
  }
}



function experienceHandle(experience) {
  // experience section

  let experience_items = document.getElementById("experience_items");
  console.log(experience)
  let exp_st = "";
  if(experience.length===0)
  {
    exp_st=
    `
    <p class="no_result_text">No experience found</p>
    `
    experience_items.innerHTML=exp_st
    return;
  }

  for (let i = 0; i < experience.length; i++) {
    exp_st =
      exp_st +
      `
      <div class="experience_item">
          <input style="display: none;" value="${experience[i].experience_id}">
          <h3 class="experience_title">${experience[i].company_name}</h3>
          <p class="experience_role">${experience[i].role} | <span>${
            experience[i].years
      } years</span></p>
          <p class="experience_detail">${DescSlice(experience[i].description)}</p>
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
  if(contactArr.length===0 || user_infoArr.length===0)
  {
    const con_str=`   <p class="no_result_text white_text">No contact found</p>`
    contact_detail.innerHTML = con_str;
      return;
  }
  
  let name = `${current_user[0].first_name} ${current_user[0].last_name}`;
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
  if(contactArr.length===0)
  {
    const con_str=`   <p class="no_result_text white_text">No socials found</p>`
    footer_socials.innerHTML = con_str;
    return;
  }
  

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
        <a href="${Links[i]}"><i class="fa-brands fa-${social_names[i]}"></i></a>
        `;
    }
  }

  footer_socials.innerHTML = str;
}

function projectView(id) {
  // console.log("id clicked:"+parseInt(id))
  const receivedId=parseInt(id)
  const clickedProject = projectsArr.filter((item) => {
    return item.project_id === receivedId;
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
  let lan_str='',tag_str=''
  console.log("click:"+id)
  const project_specific_tag_Arr=getProjectTag(id);
  console.log(project_specific_tag_Arr)
  const project_specific_lan_Arr=getProjectLanguages(id);
  console.log(project_specific_lan_Arr)
  if(project_specific_lan_Arr.length>0)
  {
    for (let j = 0; j < project_specific_lan_Arr.length; j++) 
    {

      lan_str=lan_str+`
      
      <div class="lan_item">
          <span class="lan_item_lan">${project_specific_lan_Arr[j].lan_name} <span  class="lan_item_per">${project_specific_lan_Arr[j].lan_percentage}%</span></span>
          <progress class="lan_item_pro" value='${project_specific_lan_Arr[j].lan_percentage}' max="100"></progress>
      </div>
      
      `
    }
  }
  if(project_specific_tag_Arr.length>0)
  {
    for (let k = 0; k < project_specific_tag_Arr.length; k++) 
    {
      if(k==0)
      {
        tag_str=tag_str+`
        <div class="tag_container">
        <p class="tag_head"> Tags:</p>
        `
      }
      tag_str=tag_str+`
      
      <span class="tag_item">${project_specific_tag_Arr[k].tag_name}</span>
      
      `
    }

    tag_str=tag_str+`
    </div>
    `
  }
  let str =`
  ${media_str}
  <p class="model_title">${clickedProject[0].title}</p>
  <p class="model_detail">${clickedProject[0].description}</p>
  ${lan_str}
  ${tag_str}
  `


  model_content_handle.innerHTML = str;
  myModal.style.display = "block";

  // console.log(obj)
}
function experienceView(id) {
  // console.log("id clicked:"+parseInt(id))
  const receivedId=parseInt(id)
  const clickedProject = experienceArr.filter((item) => {
    return item.experience_id === receivedId ;
  });

  console.log(clickedProject)
  let str =`
  <p class="model_title">${clickedProject[0].company_name}</p>
  <p class="model_sub_title">${clickedProject[0].role}</p>
  <p class="model_date">${dateSlice(
    experienceArr[0].start_date
  )} - ${dateSlice(experienceArr[0].end_date)}</p>
  <p class="model_detail">${clickedProject[0].description}</p>`


  model_content_handle.innerHTML = str;
  myModal.style.display = "block";

  // console.log(obj)
}



let logout_btn_handle = document.getElementById("logout_btn_handle");

logout_btn_handle.addEventListener("click", () => {
  localStorage.removeItem("auth_token");
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
    searchedProjectArr=checkInTitle(projectsArr,input_val)
  }
  else if(select_val==="desc")
  {

    searchedProjectArr=checkInDesc(projectsArr,input_val)
  }else if(select_val==="all")
  {
    searchedProjectArr = projectsArr.filter((item) => {
      const tArr=getProjectTag(item.project_id);
      const lArr=getProjectLanguages(item.project_id);
      return checkInTitle(Array(item),input_val).length>0 || checkInDesc(Array(item),input_val).length>0 || checkInLan(lArr,input_val).length>0  || checkInTag(tArr,input_val).length>0 
    });
    console.log(searchedProjectArr)
  }else if(select_val==="lanName")
  {
    searchedProjectArr =checkInLan(project_languageArr,input_val)
  }
  else if(select_val==="tagName")
  {
    searchedProjectArr = checkInTag(project_tagArr,input_val)
  }
  
  projectHandle(searchedProjectArr)


});

function getProjectsFromTag(tagArr){


  return projectsArr.filter((item)=>{
    for (let i = 0; i < tagArr.length; i++) {
     if(tagArr[i].project_id===item.project_id)
       { 
        return item;
      }
      
    }
  })

}
function getProjectsFromLan(lanArr){
  
  return projectsArr.filter((item)=>{
    for (let i = 0; i < lanArr.length; i++) {
     if(lanArr[i].project_id===item.project_id)
       { 
        return item;
      }
      
    }
  })

}

function checkInDesc(projectsArr,input_val){
  return   projectsArr.filter((item) => {
    return item.description.toLowerCase().includes(input_val.toLowerCase());
  });
}
function checkInTag(project_tagArr,input_val){
  const tArr= project_tagArr.filter((item) => {
      if(item.tag_name.toLowerCase().includes(input_val.toLowerCase()))
        {
          console.log(item)
          return item;
        }
  });
  return getProjectsFromTag(tArr)
}
function checkInTitle(projectsArr,input_val){
 const searchedProjectArr = projectsArr.filter((item) => {
    return item.title.toLowerCase().includes(input_val.toLowerCase());
  });
  return searchedProjectArr;
}
function checkInLan(project_languageArr,input_val){
  const pLan=project_languageArr.filter((item) => {
      if(item.lan_name.toLowerCase().includes(input_val.toLowerCase()))
        {
          console.log(item)
          return item;
        }
  });

  return getProjectsFromLan(pLan)
}

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
      const tArr=getProjectTag(item.project_id);
      const lArr=getProjectLanguages(item.project_id);
      return checkInTitle(Array(item),input_val).length>0 || checkInDesc(Array(item),input_val).length>0 || checkInLan(lArr,input_val).length>0  || checkInTag(tArr,input_val).length>0 
    });
    console.log(searchedProjectArr)
  }else if(select_val==="lanName")
  {
    searchedProjectArr =checkInLan(project_languageArr,input_val)
  }
  else if(select_val==="tagName")
  {
    searchedProjectArr = checkInTag(project_tagArr,input_val)
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
      const tArr=getProjectTag(item.project_id);
      const lArr=getProjectLanguages(item.project_id);
      return checkInTitle(Array(item),input_val).length>0 || checkInDesc(Array(item),input_val).length>0 || checkInLan(lArr,input_val).length>0  || checkInTag(tArr,input_val).length>0 
    });
    console.log(searchedProjectArr)
  }else if(select_val==="lanName")
  {
    searchedProjectArr =checkInLan(project_languageArr,input_val)
  }
  else if(select_val==="tagName")
  {
    searchedProjectArr = checkInTag(project_tagArr,input_val)
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
    searchedExperienceArr = checkInCompanyName(experienceArr,input_val)
  }
  else if(select_val==="role")
  {
    searchedExperienceArr = checkInCompanyRole(experienceArr,input_val)
  }
  else if(select_val==="desc")
  {
    searchedExperienceArr = checkInExperienceDesc(experienceArr,input_val)
  }
  else if(select_val==="all")
  {
    searchedExperienceArr= experienceArr.filter((item) => {
      return checkInCompanyName(Array(item),input_val).length>0 || checkInCompanyRole(Array(item),input_val).length>0 || checkInExperienceDesc(Array(item),input_val).length>0
    });
  }
  experienceHandle(searchedExperienceArr)


})

search_experience_keyword_input.onchange=function(){

  let input_val=search_experience_keyword_input.value;
  let select_val=experienceKeyword.value;
  if(select_val==="companyName")
  {
    searchedExperienceArr = checkInCompanyName(experienceArr,input_val)
  }
  else if(select_val==="role")
  {
    searchedExperienceArr = checkInCompanyRole(experienceArr,input_val)
  }
  else if(select_val==="desc")
  {
    searchedExperienceArr = checkInExperienceDesc(experienceArr,input_val)
  }
  else if(select_val==="all")
  {
    searchedExperienceArr= experienceArr.filter((item) => {
      return checkInCompanyName(Array(item),input_val).length>0 || checkInCompanyRole(Array(item),input_val).length>0 || checkInExperienceDesc(Array(item),input_val).length>0
    });
  }
  experienceHandle(searchedExperienceArr)
 
}
experienceKeyword.onchange=function(){
  let input_val=search_experience_keyword_input.value;
  let select_val=experienceKeyword.value;
  if(select_val==="companyName")
  {
    searchedExperienceArr = checkInCompanyName(experienceArr,input_val)
  }
  else if(select_val==="role")
  {
    searchedExperienceArr = checkInCompanyRole(experienceArr,input_val)
  }
  else if(select_val==="desc")
  {
    searchedExperienceArr = checkInExperienceDesc(experienceArr,input_val)
  }
  else if(select_val==="all")
  {
    searchedExperienceArr= experienceArr.filter((item) => {
      return checkInCompanyName(Array(item),input_val).length>0 || checkInCompanyRole(Array(item),input_val).length>0 || checkInExperienceDesc(Array(item),input_val).length>0
    });
  }
  experienceHandle(searchedExperienceArr)
}




function checkInExperienceDesc(expArr,input_val){
  return expArr.filter((item) => {
    return item.description.toLowerCase().includes(input_val.toLowerCase());
  });
}
function checkInCompanyName(expArr,input_val){
  return expArr.filter((item) => {
    return item.company_name.toLowerCase().includes(input_val.toLowerCase());
  });
}
function checkInCompanyRole(expArr,input_val){
  return expArr.filter((item) => {
    return item.role.toLowerCase().includes(input_val.toLowerCase());
  });
}