import dataReceieved from "../fetchData.js";
import {
  Project,
  Contact,
  User_Info,
  About,
  Experience,
  Education
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


userId = parseInt(localStorage.getItem("userId"));
userRole = localStorage.getItem("userRole");

if (userRole === "admin" || !userRole) {
  localStorage.removeItem("userId");
  localStorage.removeItem("userRole");

  location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
}
let myModal = document.getElementById("myModal");
  window.onload = function () {
  // I have to get id from local storage after login and then find data from dataReceived based on id
  // and then passed to each function
  document.getElementById("loading").style.display="none"

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
                   <img src=${project[i].file} width="150">
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
        ${lan_str}
        ${tag_str}
        <hr class="item_divider">
    </div>
    
    `;
  }
  console.log(profile_project_items)

  profile_project_items.innerHTML = pro_str;
}

function experienceHandle(experience) {
  let profile_experience_items = document.getElementById(
    "profile_experience_items"
  );

  let experienceStr = "";
  if(experience.length===0)
  {
    experienceStr=
    `
    <p class="no_result_text">No experience found</p>
    `
    profile_experience_items.innerHTML=experienceStr
    return;
  }

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
  if(education.length===0)
  {
    educationStr=
    `
    <p class="no_result_text">No education found</p>
    `
    profile_education_items.innerHTML=educationStr
    return;
  }

  for (let i = 0; i < education.length; i++) {
    educationStr =
      educationStr +
      `
    
            <div class="fetched_item">
        
            <p class="item_heading">${education[i].instituteName}</p>
            <p class="item_sub_heading">${education[i].degree}</p>
            <p class="item_sub_heading">${education[i].location}</p>
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
  let str=`<form id="socials_edit_form">
  <div>
  <label for="email" class="label_input">Enter Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value=${contactArr[0].email}
        class='input_field'
        required
      />
  </div>
  <div>
  <label for="phone" class="label_input">Enter Phone Number</label>
      <input
        type="text"
        id="phone"
        name="phone"
        value=${contactArr[0].phone}
        class='input_field'           
       placeholder='Enter Phone Number'
        required
      />
    </div>
  <div className=''>
  <label for="instagram" class="label_input">Enter Instagram Link</label>
    <input
      type="text"
      id="instagram"
      value=${contactArr[0].instagram}
      name="instagram"
      class='input_field'
    />
  </div>
  <div className=''>
  <label for="twitter" class="label_input">Enter Twitter Link</label>
      <input
      type="text"
      id="twitter"
      name="twitter"
      value=${contactArr[0].twitter}
      class='input_field'
      
    />
  </div>
  <div className=''>
  <label for="linkedin" class="label_input">Enter Linkedin Link</label>
      <input
      type="text"
      id="linkedin"
      name="linkedin"
      value=${contactArr[0].linkedin}
      class='input_field'
      required
    />
  </div>
  <div className=''>
  <label for="github" class="label_input">Enter Github Link</label>
      <input
      type="text"
      id="github"
      name="github"
      value=${contactArr[0].github}
      class='input_field'
      placeholder='Enter Link for github'
      
    />
  </div>

  <button type="submit" class='social_submit filled_btn' id="social_submit_btn">Edit socials</button>
</form>`



  model_content_handle.innerHTML=str;

  myModal.style.display="block"

  let socials_edit_form=document.getElementById("socials_edit_form")
  socials_edit_form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);
    const updatedVersion={
      email: obj.email,
      phone: obj.phone,
      linkedin: obj.linkedin,
      instagram: obj.instagram,
      twitter: obj.twitter,
      github: obj.github,
    }
    
    const conObj=new Contact();
    
    conObj.updateContact(userId,updatedVersion);
    
    
    
    myModal.style.display="none"

  })

})


let info_handle=document.getElementById("info_handle")

info_handle.addEventListener("click",()=>{

  let str=`
  <h2> Update User info </h2>
  <form id="info_update_form">
  <div className=''>
  <label for="designation" class="label_input">Enter Designation</label>
      <input
        type="text"
        id="designation"
        name="designation"
        value='${user_infoArr[0].designation}'
        class='input_field'
        placeholder='Enter designation'
        required
      />
    </div>
      <div className=''>
      <label for="location" class="label_input">Enter Location</label>
          <input
          type="text"
          id="location"
          name="location"
          value='${user_infoArr[0].location}'
          class='input_field'
          placeholder='Enter location separated by commas'
          
        />
      </div>
    
      <button type="submit" class='info_submit filled_btn' id="info_submit_btn">Edit info</button>
    </form>`

  model_content_handle.innerHTML=str;

  myModal.style.display="block"

  let info_update_form=document.getElementById("info_update_form")
  info_update_form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);
    const updateuserInfo={
      designation: obj.designation,
      location: obj.location,
    }
    
    const userInfoObj=new User_Info();
    
    userInfoObj.updateuserInfo(userId,updateuserInfo);

    myModal.style.display="none"
 
})
})


let about_handle=document.getElementById("about_handle")

about_handle.addEventListener("click",()=>{
  // handle about section edit model

  let str=`
  <h2> Edit About </h2>
  <form id="about_edit_form">
  <div className=''>
  <label for="desc" class="label_input">Enter Description</label>
  <textarea id="desc" name="desc" class="input_field" rows="4" cols="50">${aboutArr[0].desc}</textarea>
  <br>
    </div>
    
      <button type="submit" class='about_submit filled_btn' id="about_submit_btn">Edit about</button>
    </form>
  
  `

  model_content_handle.innerHTML=str;

  myModal.style.display="block"

  let about_edit_form=document.getElementById("about_edit_form")
  about_edit_form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);
    const updatedVersion={
      desc: obj.desc,
    }
    
    const aboutObj=new About();
    
    aboutObj.updateAbout(userId,updatedVersion);
    
    
    
    myModal.style.display="none"

  })

  console.log("about edit clicked")
})


let experience_handle=document.getElementById("experience_handle")
experience_handle.addEventListener("click",()=>{
  let experienceStr = "";

  for (let i = 0; i < experienceArr.length; i++) {
    experienceStr =
      experienceStr +
      `

        <div class="fetched_item section_container_css">
          <input style="display: none;" value="${experienceArr[i].experienceId}">
          <div class="item_controls edit_btn">
            <i class="fa-solid fa-pen  experience_model_item_edit_handle"></i>
            <i class="fa-solid fa-trash experience_model_item_delete_handle" ></i>
          </div>
          <p class="item_heading">${experienceArr[i].companyName}</p>
          <p class="item_sub_heading">${experienceArr[i].role}</p>
          <h3 class="item_date">${dateSlice(
            experienceArr[i].startDate
          )} - ${dateSlice(experienceArr[i].endDate)}</h3>
          <p class="item_p">${experienceArr[i].desc}</p>
          <hr class="item_divider">
        </div>
        
        `;
  }


  experienceStr=`
 <div class="section_container_css add_btn_container">
     <button class="filled_btn add_btn" id="Add_experience_btn">Add Experience </button>
     ${experienceStr}
 </div>
 `
  model_content_handle.innerHTML=experienceStr
  myModal.style.display="block"

  const items = document.getElementsByClassName('experience_model_item_edit_handle');
 for(let item of items){
 item.addEventListener("click",(e)=>{
  experienceForm(item.parentNode.parentNode.children[0].getAttribute("value"))
 })
 }
  const items2 = document.getElementsByClassName('experience_model_item_delete_handle');
 for(let item of items2){
 item.addEventListener("click",(e)=>{
  experienceDeleteHandle(item.parentNode.parentNode.children[0].getAttribute("value"))
 })
 }

 const Add_experience_btn=document.getElementById("Add_experience_btn")
 Add_experience_btn.addEventListener("click",()=>{
  experienceForm(undefined)
 })

})

function experienceDeleteHandle(id)
{
  const expObj=new Experience();
  expObj.deleteExperience(id)
}

function experienceForm(id)
{
  
  let str='';
  let receivedId=undefined;
  if(id)
  {

    receivedId=parseInt(id)
    const clickedProject = experienceArr.filter((item) => {
      return item.experienceId === receivedId && item.userId === userId;
    });
    str=` <form id="experience_add_form">
    <div className=''>
    <label for="companyName" class="label_input">Enter Company Name</label>
    <input
        type="text"
        id="companyName"
        name="companyName"
        value='${clickedProject[0].companyName}'
        class='input_field'
        required
      />
    </div>
    <div className=''>
    <label for="role" class="label_input">Enter Role In Company</label>
      <input
        type="text"
        id="role"
        name="role"
        class='input_field'
        value='${clickedProject[0].role}'
        required
      />
    </div>
    <div className=''>
    <label for="experience_s_date" class="label_input">Add Start Date</label>
        <input
          type="date"
          id="experience_s_date"
          name="startDate"
          value='${clickedProject[0].startDate}'
          class='input_field'
          required
        />
      </div>
        <div className=''>
        <label for="experience_e_date" class="label_input">Add End Date</label>
            <input
            type="date"
            id="experience_e_date"
            name="endDate"
            value='${clickedProject[0].endDate}'
            class='input_field'
            required
          />
        </div>
        <div className=''>
        <label for="desc" class="label_input">Enter Description</label>
                <input
                type="text"
                id="desc"
                name="desc"
                value='${clickedProject[0].desc}'
                class='input_field'
                required
              />
        </div>

      
        <button type="submit" class='experience_submit filled_btn' id="experience_submit_btn">Edit Experience</button>
</form>
`
  }
  else
  {
    str=` <form id="experience_add_form">
    <div className=''>
    <label for="companyName" class="label_input">Enter Company Name</label>
    <input
        type="text"
        id="companyName"
        name="companyName"
        class='input_field'
        required
      />
    </div>
    <div className=''>
    <label for="role" class="label_input">Enter Role In Company</label>
      <input
        type="text"
        id="role"
        name="role"
        class='input_field'
        placeholder='Enter Role in Company'
        required
      />
    </div>
    <div className=''>
    <label for="experience_s_date" class="label_input">Add Start Date</label>
        <input
          type="date"
          id="experience_s_date"
          name="startDate"
          class='input_field'
          required
        />
      </div>
        <div className=''>
        <label for="experience_e_date" class="label_input">Add End Date</label>
            <input
            type="date"
            id="experience_e_date"
            name="endDate"
            class='input_field'
            required
          />
        </div>

        <div className=''>
        <label for="desc" class="label_input">Enter Description</label>
                <input
                type="text"
                id="desc"
                name="desc"
                class='input_field'
                required
              />
        </div>

      
        <button type="submit" class='filled_btn experience_submit' id="experience_submit_btn">Add Experience</button>
</form>
`
  }
  console.log(`update id::`+id)

  model_content_handle.innerHTML=str;
  myModal.style.display="block";


  let experience_add_form=document.getElementById("experience_add_form")

  experience_add_form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);
    let sDate=new Date(obj.startDate)
    let eDate=new Date(obj.endDate)
    let year=eDate.getFullYear()-sDate.getFullYear();
    const updatedVersion={
      userId:userId,
      companyName: obj.companyName,
      role: obj.role,
      startDate: obj.startDate,
      endDate: obj.endDate,
      years: year,
      desc: obj.desc,
    }


    let expObj=new Experience();
    if(receivedId)
    {
      expObj.updateExperience(userId,receivedId,updatedVersion);
      
    }
    else
    {
      expObj.addExperience(updatedVersion);
    }
    
    myModal.style.display = "none";

  })
}



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

     let lan_str='',tag_str=''

     if(projectsArr[i].languages.length>0)
     {
       for (let j = 0; j < projectsArr[i].languages.length; j++) 
       {
 
         lan_str=lan_str+`
         
         <div class="lan_item">
             <span class="lan_item_lan">${projectsArr[i].languages[j].lanName} <span  class="lan_item_per">${projectsArr[i].languages[j].lanPer}%</span></span>
             <progress class="lan_item_pro" value='${projectsArr[i].languages[j].lanPer}' max="100"></progress>
         </div>
         
         `
       }
     }
     if(projectsArr[i].tags.length>0)
     {
       for (let k = 0; k < projectsArr[i].tags.length; k++) 
       {
         if(k==0)
         {
           tag_str=tag_str+`
           <div class="tag_container">
           <p class="tag_head"> Tags:</p>
           `
         }
         tag_str=tag_str+`
         
         <span class="tag_item">${projectsArr[i].tags[k].tagName}</span>
         
         `
       }
 
       tag_str=tag_str+`
       </div>
       `
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
          ${lan_str}
          ${tag_str}
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



let education_handle=document.getElementById("education_handle")
education_handle.addEventListener("click",()=>{
  let educationStr = "";

  for (let i = 0; i < educationArr.length; i++) {
    educationStr =
      educationStr +
      `
            <div class="fetched_item section_container_css">
              <input style="display: none;" value="${educationArr[i].educationId}">
              <div class="item_controls edit_btn education_edits">
                <i class="fa-solid fa-pen  education_model_item_edit_handle"></i>
                <i class="fa-solid fa-trash education_model_item_delete_handle" ></i>
              </div>
              <p class="item_heading">${educationArr[i].instituteName}</p>
              <p class="item_sub_heading">${educationArr[i].degree}</p>
              <h3 class="item_date">${dateSlice(
                educationArr[i].startDate
              )} - ${dateSlice(educationArr[i].endDate)}</h3>
              <p class="item_p">${educationArr[i].desc}</p>
              <hr class="item_divider">
            </div>
            
            `;
  }

  educationStr=`
  <div class="section_container_css add_btn_container">
     <button class="filled_btn add_btn" id="Add_education_btn">Add Experience </button>
     ${educationStr}
 </div>
 `
  model_content_handle.innerHTML=educationStr
  myModal.style.display="block"

  const items = document.getElementsByClassName('education_model_item_edit_handle');
 for(let item of items){
 item.addEventListener("click",(e)=>{
  educationForm(item.parentNode.parentNode.children[0].getAttribute("value"))
 })
 }
  const items2 = document.getElementsByClassName('education_model_item_delete_handle');
 for(let item of items2){
 item.addEventListener("click",(e)=>{
  educationDeleteHandle(item.parentNode.parentNode.children[0].getAttribute("value"))
 })
 }

 const Add_education_btn=document.getElementById("Add_education_btn")
 Add_education_btn.addEventListener("click",()=>{
  educationForm(undefined)
 })


})


function educationForm(id){

}

function educationDeleteHandle(id){
  const eduObj=new Education();
  eduObj.deleteEducation(id)
}

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
  <label for="project_title" class="label_input">Edit Project Title</label>
  <input
      type="text"
      id="project_title"
      name="title"
      class='input_field'
      value='${clickedProject[0].title}'
      required
    />
  </div>
  <div className=''>
  <label for="project_desc" class="label_input">Edit project description</label>
    <input
      type="text"
      id="project_desc"
      name="desc"
      value='${clickedProject[0].desc}'
      class='input_field'
      required
    />
  </div>
  <div className=''>
  <label for="project_s_date" class="label_input">Edit project start date</label>
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
      <label for="project_e_date" class="label_input">Edit project end date</label>
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
      <label for="project_file" class="label_input">Edit project image</label>
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
      <label for="project_source_link" class="label_input">Edit project source code link</label>
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
          <label for="project_live_link" class="label_input">Edit project live view url</label>
              <input
              type="text"
              id="project_live_link"
              name="liveLink"
              value='${clickedProject[0].liveLink}'
              class='input_field'
              placeholder='Enter Project Live Link'
            />
          </div>
      
      <fieldset>
      <legend>Tags and skills section:</legend>
        <div class="langs_add" id="langs_con">
          <div className=''>
            <label for="project_langs_name" class="label_input">Enter language</label>
            <input type="text" id="project_langs_name" name="lanName" class='input_field' />
            <label for="project_langs_per" class="label_input">Enter percentage of language use</label>
            <input type="number" min="0" max="100" id="project_langs_per" name="lanPer" class='input_field'  />
          </div>
          <button type="button" id="lan_add_btn" class="btn_border">Add language</button>
        </div>
        <div class="tags_add" id="tags_con">
          <div className=''>
            <label for="project_tags_name" class="label_input">Enter tag</label>
            <input type="text" id="project_tags_name" name="tagName" class='input_field' />
          </div>
          <button type="button" id="tag_add_btn" class="btn_border">Add tag</button>
        </div>
        <div id="lan_added" class="form_field_div">
        ${getLanguagesStr(clickedProject[0])}
        </div>
        <div id="tag_added" class="form_field_div">
        ${getTagsStr(clickedProject[0])}
        </div>
        </fieldset>
    
      <button type="submit" class='project_submit filled_btn' id="project_submit_btn">Update Project</button>
</form>
`
  }
  else
  {
    str=`<form id="project_add_form">
  <div className=''>
  <label for="project_title" class="label_input">Enter project title</label>
  <input
      type="text"
      id="project_title"
      name="title"
      class='input_field'
      required
    />
  </div>
  <div className=''>
  <label for="project_desc" class="label_input">Enter project description</label>
    <input
      type="text"
      id="project_desc"
      name="desc"
      class='input_field'
      required
    />
  </div>
  <div className=''>
  <label for="project_s_date" class="label_input">Add project start date</label>
      <input
        type="date"
        id="project_s_date"
        name="startDate"
        class='input_field'
        required
      />
    </div>
      <div className=''>
      <label for="project_e_date" class="label_input">Add project end date</label>
          <input
          type="date"
          id="project_e_date"
          name="endDate"
          class='input_field'
          required
        />
      </div>
      <div className=''>
      <label for="project_file" class="label_input">Add project image</label>
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
      <label for="project_source_link" class="label_input">Enter project source code link</label>
          <input
              type="text"
              id="project_source_link"
              name="sourceLink"
              class='input_field'
              required
            />
          </div>
          <div className=''>
          <label for="project_live_link" class="label_input">Enter project live view url</label>
              <input
              type="text"
              id="project_live_link"
              name="liveLink"
              class='input_field'
            />
              </div>

              <fieldset>
              <legend>Tags and skills section:</legend>
              <div class="langs_add" id="langs_con">
              <div className=''>
                <label for="project_langs_name" class="label_input">Enter language</label>
                <input type="text" id="project_langs_name" name="lanName" class='input_field' />
                <label for="project_langs_per" class="label_input">Enter percentage of language use</label>
                <input type="number" min="0" max="100" id="project_langs_per" name="lanPer" class='input_field'  />
              </div>
              <button type="button" id="lan_add_btn" class="btn_border">Add language</button>
            </div>
            <div class="tags_add" id="tags_con">
              <div className=''>
                <label for="project_tags_name" class="label_input">Enter tag</label>
                <input type="text" id="project_tags_name" name="tagName" class='input_field' />
              </div>
              <button type="button" id="tag_add_btn" class="btn_border">Add tag</button>
            </div>
            <div id="lan_added" class="form_field_div">
            </div>
            <div id="tag_added" class="form_field_div">
            </div>
            </fieldset>
    
      <button type="submit" class='project_submit filled_btn' id="project_submit_btn">Add project</button>
</form>
`
  }
  console.log(`update id::`+id)


  model_content_handle.innerHTML=str;
  myModal.style.display="block";

  let tag_add_btn=document.getElementById("tag_add_btn");
  let tag_added=document.getElementById("tag_added")
  let lan_added=document.getElementById("lan_added");
  let lan_add_btn=document.getElementById("lan_add_btn")
  let project_langs_name=document.getElementById("project_langs_name")
  let project_langs_per=document.getElementById("project_langs_per")
  const delete_lan_icon=document.getElementsByClassName("delete_lan_icon");
  const delete_tag_icon=document.getElementsByClassName("delete_tag_icon");


  let project_tags_name=document.getElementById("project_tags_name")


  tag_add_btn.addEventListener("click",()=>{
  

    if(project_tags_name.value==='' )
    {
      alert("Some of the fields are empty")
      return;
    }
    let tag_str=""
    if(tag_added.childNodes.length===1)
    {
      tag_str=tag_str+`
      <p class="p_model">Tags:</p>
      `
    }
    tag_str=tag_str+`
    <div class="tag_item_model model_item_con">
    <span class="tag_name_model item_model">${project_tags_name.value}</span>
    <i class="fa-solid fa-xmark delete_tag_icon icon_model " ></i>
  </div>
    
    `;
    tag_added.innerHTML+=tag_str;

    project_tags_name.value="";
    for (const item of delete_tag_icon) {
      item.addEventListener("click",()=>{
        item.parentNode.remove()
      })
    
  }

  })

  for (const item of delete_tag_icon) {
    item.addEventListener("click",()=>{
      item.parentNode.remove()
    })
  
}
  lan_add_btn.addEventListener("click",()=>{

    if(project_langs_name.value==='' ||project_langs_per.value==='' )
    {
      alert("Some of the fields are empty")
      return;
    }
    if(parseInt(project_langs_per.value)<0 || parseInt(project_langs_per.value)>100)
    {
      console.log("greater")
      alert("Enter percentage between 1-100")
      return;
    }

    let lan_str="";
    if(lan_added.childNodes.length===1)
    {
      lan_str=lan_str+`
      <p class="p_model">Languages:</p>
      `
    }
    lan_str=lan_str+`
    <div class="lan_item_model model_item_con">
        <span class="lan_name_model item_model">${project_langs_name.value}</span>
        <span class="lan_per_model item_model">${project_langs_per.value}</span>
        <i class="fa-solid fa-xmark delete_lan_icon  icon_model" ></i>
    </div>
    
    `;
    lan_added.innerHTML+=lan_str;

    project_langs_name.value="";
    project_langs_per.value="";
    for (const item of delete_lan_icon) {
      item.addEventListener("click",()=>{
        item.parentNode.remove()
      })
    
  }
    

  })

  for (const item of delete_lan_icon) {
    item.addEventListener("click",()=>{
      item.parentNode.remove()
    })
  
}


  let project_add_form=document.getElementById("project_add_form")
  const lan_item_model=document.getElementsByClassName("lan_item_model")
  const tag_item_model=document.getElementsByClassName("tag_item_model")


  project_add_form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);
    var fileExt = obj.file.name.split('.').pop();
    const lang_arr= convertLangArr(lan_item_model)
    const tag_arr=convertTagArr(tag_item_model)
    console.log("lan arr")
    console.log(lang_arr)
    console.log("tag arr")
    console.log(tag_arr)


    console.log(obj)
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
      languages:lang_arr,
      tags:tag_arr
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

function convertLangArr(ele)
{
  console.log("eleme lan get")
  console.log(ele)
  let lanArr=[];
  for (const item of ele) {
    console.log(item)
    console.log(item.childNodes[2])
    let obj={
      lanName:item.childNodes[1].innerText,
      lanPer:parseInt(item.childNodes[3].innerText)
    }
    lanArr.push(obj)
  }

  return lanArr;
}
function convertTagArr(ele)
{
  console.log("eleme tag get")
  console.log(ele)
  let tagArr=[];
  for (const item of ele) {
    let obj={
      tagName:item.childNodes[1].innerText,
    }
    tagArr.push(obj)
  }

  return tagArr;
}


function getLanguagesStr(currProject)
{
  let str='';
  for (let i = 0; i < currProject.languages.length; i++) {
    if(i==0)
    {
      str=str+`
      <p class="p_model">Languages:</p>
      `
    }
    str=str+`
    <div class="lan_item_model model_item_con">
      <span class="lan_name_model item_model">${currProject.languages[i].lanName}</span>
      <span class="lan_per_model item_model">${currProject.languages[i].lanPer}</span>
      <i class="fa-solid fa-xmark delete_lan_icon  icon_model" ></i>
    </div>
    
    `
  }

  return str;
}
function getTagsStr(currProject)
{
  let str="";
  for (let i = 0; i < currProject.tags.length; i++) {
    if(i==0)
    {
      str=str+`
      <p class="p_model">Tags:</p>
      `
    }
    str=str+`
    <div class="tag_item_model model_item_con">
      <span class="tag_name_model item_model">${currProject.tags[i].tagName}</span>
      <i class="fa-solid fa-xmark delete_tag_icon icon_model " ></i>
    </div>
    
    `
  }

  return str;
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

  e.preventDefault()
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
    return item.desc.toLowerCase().includes(input_val.toLowerCase());
  });
}
function checkInCompanyName(expArr,input_val){
  return expArr.filter((item) => {
    return item.companyName.toLowerCase().includes(input_val.toLowerCase());
  });
}
function checkInCompanyRole(expArr,input_val){
  return expArr.filter((item) => {
    return item.role.toLowerCase().includes(input_val.toLowerCase());
  });
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
    searchedEducationArr =  checkIninstituteName(educationArr,input_val)
  }
  else if(select_val==="degree")
  {
    searchedEducationArr = checkInDegree(educationArr,input_val)
  }
  else if(select_val==="location")
  {
    searchedEducationArr = checkInLocation(educationArr,input_val)
  }
  else if(select_val==="all")
  {
    searchedEducationArr= educationArr.filter((item) => {
      return checkIninstituteName(Array(item),input_val).length>0 || checkInDegree(Array(item),input_val).length>0 || checkInLocation(Array(item),input_val).length>0
    });
  }
  educationHandle(searchedEducationArr)


})

search_education_keyword_input.onchange=function(){

  let input_val=search_education_keyword_input.value;
  let select_val=educationKeyword.value;
  if(select_val==="instituteName")
  {
    searchedEducationArr =  checkIninstituteName(educationArr,input_val)
  }
  else if(select_val==="degree")
  {
    searchedEducationArr = checkInDegree(educationArr,input_val)
  }
  else if(select_val==="location")
  {
    searchedEducationArr = checkInLocation(educationArr,input_val)
  }
  else if(select_val==="all")
  {
    searchedEducationArr= educationArr.filter((item) => {
      return checkIninstituteName(Array(item),input_val).length>0 || checkInDegree(Array(item),input_val).length>0 || checkInLocation(Array(item),input_val).length>0
    });
  }
  educationHandle(searchedEducationArr)
 
}
educationKeyword.onchange=function(){
  let input_val=search_education_keyword_input.value;
  let select_val=educationKeyword.value;
  if(select_val==="instituteName")
  {
    searchedEducationArr =  checkIninstituteName(educationArr,input_val)
  }
  else if(select_val==="degree")
  {
    searchedEducationArr = checkInDegree(educationArr,input_val)
  }
  else if(select_val==="location")
  {
    searchedEducationArr = checkInLocation(educationArr,input_val)
  }
  else if(select_val==="all")
  {
    searchedEducationArr= educationArr.filter((item) => {
      return checkIninstituteName(Array(item),input_val).length>0 || checkInDegree(Array(item),input_val).length>0 || checkInLocation(Array(item),input_val).length>0
    });
  }
  educationHandle(searchedEducationArr)
}



function checkIninstituteName(eduArr,input_val){
  return eduArr.filter((item) => {
    return item.instituteName.toLowerCase().includes(input_val.toLowerCase());
  });
}
function checkInDegree(eduArr,input_val){
  return eduArr.filter((item) => {
    return item.degree.toLowerCase().includes(input_val.toLowerCase());
  });
}
function checkInLocation(eduArr,input_val){
  return eduArr.filter((item) => {
    return item.location.toLowerCase().includes(input_val.toLowerCase());
  });
}



window.onclick = function(event) {
  if (event.target == myModal) {
    myModal.style.display = "none";
  }
}