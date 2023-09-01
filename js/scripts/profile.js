import dataReceieved from "../fetchData.js";
import {
  Project,
} from "../links.js";
// JS for profile.html

// onLoad I want to fecth data and display on profile.html page
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

  if (userRole === "admin" || !userRole) {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
  }
  userSpecificData();
  modifyDOM();
};

function modifyDOM() {
  navHandle();
  headerHandle();
  infoHandle();
  aboutHandle();
  projectHandle(projectsArr);
  experienceHandle(experienceArr);
  educationHandle(educationArr);
  skillsHandle();
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

  console.log(aboutArr);
  console.log(contactArr);
  console.log(usersArr);
}
function navHandle() {
  let user_name = document.getElementById("user_name");
  const name = usersArr[0].lastName;
  let str = `<a href="/index.html" class="logo_link">${name}</a>`;
  user_name.innerHTML = str;
}

function headerHandle() {
  let socials_header = document.getElementById("socials_header");
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
              <div class="header_social_item contact_item">
              <a href="${i}"><i class="fa-brands fa-${social_names[i]}"></i></a>
              <span class="header_social_link contact_detail"><a href="${i}">${Links[i]}</a></span>
          </div>
              `;
    }
  }

  socials_header.innerHTML = str;
}

function infoHandle() {
  let info_id = document.getElementById("info_id");

  const name = usersArr[0].firstName + " " + usersArr[0].lastName;
  let infoStr = `
    <div class="info_start_container">
        <h3 class="info_name">${name}</h3>
        <h4 class="info_designation">${user_infoArr[0].designation}</h4>
    </div>
    <div class="recent_education_container">
        <p class="recent_university_name">${educationArr[0].instituteName}</p>
        <p class="university_location">${educationArr[0].location}</p>
    </div>
    <div class="personal_contact_container">
        <div class="personal_contact_item contact_item">
            <i class="fa-solid fa-location contact_icon"></i>
            <span class="header_social_link"><a>${user_infoArr[0].location}</a></span>
        </div>
        <div class="personal_contact_item contact_item">
            <i class="fa-solid fa-envelope contact_icon"></i>
            <span class="header_social_link"><a>${contactArr[0].email}</a></span>
        </div>
        <div class="personal_contact_item contact_item">
            <i class="fa-solid fa-phone contact_icon"></i>
            <span class="header_social_link"><a>${contactArr[0].phone}</a></span>
        </div>
    </div>
  
  
  `;

  info_id.innerHTML = infoStr;
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
function aboutHandle() {
  let about_profile = document.getElementById("about_profile");

  about_profile.innerText = aboutArr[0].desc;
}

function projectHandle(project) {
  let profile_project_items = document.getElementById("profile_project_items");
  let pro_str = "";

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
                   <img src=${project[i].file} width="150">
    </div>
      `;
    }
    pro_str =
      pro_str +
      `
      <div class="fetched_item">
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
        <hr class="item_divider">
    </div>
    
    `;
  }


  profile_project_items.innerHTML = pro_str;
}

function experienceHandle(experience) {
  let profile_experience_items = document.getElementById(
    "profile_experience_items"
  );

  let experienceStr = "";

  for (let i = 0; i < experience.length; i++) {
    experienceStr =
      experienceStr +
      `

        <div class="fetched_item">
        
        <p class="item_heading">${experience[i].companyName}</p>
        <p class="item_sub_heading">${experience[i].role}</p>
        <h3 class="item_date">${dateSlice(
          experience[i].startDate
        )} - ${dateSlice(experience[i].endDate)}</h3>
        <p class="item_p">${experience[i].desc}</p>
        <hr class="item_divider">
        </div>
        
        `;
  }

  profile_experience_items.innerHTML = experienceStr;
}

function educationHandle(education) {
  let profile_education_items = document.getElementById(
    "profile_education_items"
  );

  let educationStr = "";

  for (let i = 0; i < education.length; i++) {
    educationStr =
      educationStr +
      `
    
            <div class="fetched_item">
        
            <p class="item_heading">${education[i].instituteName}</p>
            <p class="item_sub_heading">${education[i].degree}</p>
            <h3 class="item_date">${dateSlice(
              education[i].startDate
            )} - ${dateSlice(education[i].endDate)}</h3>
            <p class="item_p">${education[i].desc}</p>
            <hr class="item_divider">
            </div>
            
            `;
  }

  profile_education_items.innerHTML = educationStr;
}

function skillsHandle() {
  let profile_skills_items = document.getElementById("profile_skills_items");
  let skill_str = "";

  console.log(skillsArr);

  for (let i = 0; i < skillsArr.length; i++) {
    skill_str =
      skill_str +
      `
        
        <div class="fetched_item">
        <p class="item_heading">${skillsArr[i].skillName}</p>
        <h3 class="item_date">${dateSlice(
          skillsArr[i].startDate
        )} - ${dateSlice(skillsArr[i].endDate)}</h3>
        <hr class="item_divider">
        </div>
        `;
  }

  profile_skills_items.innerHTML = skill_str;
}

function footerHandle() {
  let footer_socials = document.getElementById("footer_socials");
  console.log(footer_socials);
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

  console.log();

  footer_socials.innerHTML = str;
}

let logout_btn_handle = document.getElementById("logout_btn_handle");

logout_btn_handle.addEventListener("click", () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userRole");

  location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
});



// -------------- Handle different sections edit

let socials_handle=document.getElementById("socials_handle")
socials_handle.addEventListener("click",()=>{
  // handle socials edit model
  console.log("Social edit clicked")
})


let info_handle=document.getElementById("info_handle")

info_handle.addEventListener("click",()=>{
  // handle info section edit model
  console.log("info edit clicked")
})


let about_handle=document.getElementById("about_handle")

about_handle.addEventListener("click",()=>{
  // handle about section edit model
  console.log("about edit clicked")
})


let experience_handle=document.getElementById("experience_handle")
experience_handle.addEventListener("click",()=>{
   // handle experience section edit model
   console.log("experience edit clicked")

})


let education_handle=document.getElementById("education_handle")
education_handle.addEventListener("click",()=>{
   // handle education section edit model
   console.log("education edit clicked")

})

let project_handle=document.getElementById("project_handle")

project_handle.addEventListener("click",()=>{
   // handle project section edit model
   let pro_str = "";

   for (let i = 0; i < projectsArr.length; i++) {
     let media_str = "";
     if (projectsArr[i].exe === ".mp4") {
       media_str = `
       <div class="item_media">
         <video class="project_media" controls>
             <source src=${projectsArr[i].file} type="video/mp4">
             </video>
         </div>
       `;
     } else {
       media_str = `
       <div class="item_media">
                    <img src=${projectsArr[i].file} width="150">
     </div>
       `;
     }
     pro_str =
       pro_str +
       `
       <div class="fetched_item section_container_css">
       <input style="display: none;" value="${projectsArr[i].projectId}">
       <div class="project_item_controls edit_btn">
       <i class="fa-solid fa-pen  project_model_item_edit_handle"></i>
       <i class="fa-solid fa-trash project_model_item_delete_handle" ></i>
       </div>
         <div class="item_detail_section">
            ${media_str}
             <div class="item_info">

                 <p class="item_heading">${projectsArr[i].title}</p>
                 <h3 class="item_date">${dateSlice(
                  projectsArr[i].startDate
                 )} - ${dateSlice(projectsArr[i].endDate)}</h3>
             </div>
         </div>
         <p class="item_p">${projectsArr[i].desc}</p>
         <hr class="item_divider">
     </div>
     
     `;
   }

  pro_str=`
  <div class="section_container_css">
      <button class="filled_btn add_pro_btn" id="Add_project_btn">Add Project </button>
      ${pro_str}
  </div>
  `
   model_content_handle.innerHTML=pro_str
   myModal.style.display="block"

   const items = document.getElementsByClassName('project_model_item_edit_handle');
  for(let item of items){
  item.addEventListener("click",(e)=>{
    projectForm(item.parentNode.parentNode.children[0].getAttribute("value"))
  })
  }
   const items2 = document.getElementsByClassName('project_model_item_delete_handle');
  for(let item of items2){
  item.addEventListener("click",(e)=>{
    projectDeleteHandle(item.parentNode.parentNode.children[0].getAttribute("value"))
  })
  }

  const Add_project_btn=document.getElementById("Add_project_btn")
  Add_project_btn.addEventListener("click",()=>{
    projectForm(undefined)
  })

})

let skills_handle=document.getElementById("skills_handle")
skills_handle.addEventListener("click",()=>{
   // handle skills section edit model
   console.log("skills edit clicked")

})


let close_model_handle=document.getElementById("close_model_handle")

close_model_handle.addEventListener("click",()=>{
  myModal.style.display="none"
})



// show form to edit project
function projectForm(id)
{
  let str='';
  let receivedId=undefined;
  if(id)
  {

    receivedId=parseInt(id)
    const clickedProject = projectsArr.filter((item) => {
      return item.projectId === receivedId && item.userId === userId;
    });
    str=`<form id="project_add_form">
  <div className=''>
  <input
      type="text"
      id="project_title"
      name="title"
      class='input_field'
      value='${clickedProject[0].title}'
      placeholder='Enter Project Title'
      required
    />
  </div>
  <div className=''>
    <input
      type="text"
      id="project_desc"
      name="desc"
      value='${clickedProject[0].desc}'
      class='input_field'
      placeholder='Enter Project Description'
      required
    />
  </div>
  <div className=''>
      <input
        type="date"
        id="project_s_date"
        name="startDate"
        class='input_field'
        value=${clickedProject[0].startDate}
        required
      />
    </div>
      <div className=''>
          <input
          type="date"
          id="project_e_date"
          name="endDate"
          value=${clickedProject[0].endDate}
          class='input_field'
          required
        />
      </div>
      <div className=''>
          <input
          type="file"
          id="project_file"
          name="file"
          class='input_field'
          accept=".png,.jpeg,.jpg,.mp4"
          required
        />
      </div>
      <div className=''>
          <input
              type="text"
              id="project_source_link"
              name="sourceLink"
              value='${clickedProject[0].sourceLink}'
              class='input_field'
              placeholder='Enter Project Code Link'
              required
            />
          </div>
          <div className=''>
              <input
              type="text"
              id="project_live_link"
              name="liveLink"
              value='${clickedProject[0].liveLink}'
              class='input_field'
              placeholder='Enter Project Live Link'
            />
              </div>

    
      <button type="submit" class='project_submit filled_btn' id="project_submit_btn">Update Project</button>
</form>
`
  }
  else
  {
    str=`<form id="project_add_form">
  <div className=''>
  <input
      type="text"
      id="project_title"
      name="title"
      class='input_field'
      placeholder='Enter Project Title'
      required
    />
  </div>
  <div className=''>
    <input
      type="text"
      id="project_desc"
      name="desc"
      class='input_field'
      placeholder='Enter Project Description'
      required
    />
  </div>
  <div className=''>
      <input
        type="date"
        id="project_s_date"
        name="startDate"
        class='input_field'
        required
      />
    </div>
      <div className=''>
          <input
          type="date"
          id="project_e_date"
          name="endDate"
          class='input_field'
          required
        />
      </div>
      <div className=''>
          <input
          type="file"
          id="project_file"
          name="file"
          class='input_field'
          accept=".png,.jpeg,.jpg,.mp4"
          required
        />
      </div>
      <div className=''>
          <input
              type="text"
              id="project_source_link"
              name="sourceLink"
              class='input_field'
              placeholder='Enter Project Code Link'
              required
            />
          </div>
          <div className=''>
              <input
              type="text"
              id="project_live_link"
              name="liveLink"
              class='input_field'
              placeholder='Enter Project Live Link'
            />
              </div>

    
      <button type="submit" class='project_submit filled_btn' id="project_submit_btn">Add project</button>
</form>
`
  }
  console.log(`update id::`+id)

  model_content_handle.innerHTML=str;
  myModal.style.display="block";


  let project_add_form=document.getElementById("project_add_form")

  project_add_form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);
    var fileExt = obj.file.name.split('.').pop();
    const updatedVersion={
      userId:userId,
      file: obj.file,
      exe: fileExt,
      title: obj.title,
      startDate: obj.startDate,
      endDate: obj.endDate,
      desc: obj.desc,
      sourceLink: obj.sourceLink,
      liveLink: obj.liveLink,
    }


    let pObj=new Project();
    if(receivedId)
    {
      pObj.updateProject(userId,receivedId,updatedVersion);
      
    }
    else
    {
      pObj.addProject(updatedVersion);
    }
    
    myModal.style.display = "none";

  })
}


function projectDeleteHandle(id){
  console.log("Delete id:"+id)
  const pObj=new Project();
  pObj.deleteProject(id)
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


// Education search handling-----------

let education_search_form=document.getElementById("education_search_form");
let search_education_keyword_input=document.getElementById("search_education_keyword_input");
let educationKeyword=document.getElementById("educationKeyword");
let searchedEducationArr=[]

education_search_form.addEventListener("submit",(e)=>{

  e.preventDefault();
  let input_val=search_education_keyword_input.value;
  let select_val=educationKeyword.value;
  if(select_val==="instituteName")
  {
    searchedEducationArr = educationArr.filter((item) => {
      return item.instituteName.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="degree")
  {
    searchedEducationArr = educationArr.filter((item) => {
      return item.degree.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="location")
  {
    searchedEducationArr = educationArr.filter((item) => {
      return item.location.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  educationHandle(searchedEducationArr)


})

search_education_keyword_input.onchange=function(){

  let input_val=search_education_keyword_input.value;
  let select_val=educationKeyword.value;
  if(select_val==="instituteName")
  {
    searchedEducationArr = educationArr.filter((item) => {
      return item.instituteName.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="degree")
  {
    searchedEducationArr = educationArr.filter((item) => {
      return item.degree.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="location")
  {
    searchedEducationArr = educationArr.filter((item) => {
      return item.location.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  educationHandle(searchedEducationArr)
 
}
educationKeyword.onchange=function(){
  let input_val=search_education_keyword_input.value;
  let select_val=educationKeyword.value;
  if(select_val==="instituteName")
  {
    searchedEducationArr = educationArr.filter((item) => {
      return item.instituteName.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="degree")
  {
    searchedEducationArr = educationArr.filter((item) => {
      return item.degree.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  else if(select_val==="location")
  {
    searchedEducationArr = educationArr.filter((item) => {
      return item.location.toLowerCase().includes(input_val.toLowerCase());
    });
  }
  educationHandle(searchedEducationArr)
}





window.onclick = function(event) {
  if (event.target == myModal) {
    myModal.style.display = "none";
  }
}