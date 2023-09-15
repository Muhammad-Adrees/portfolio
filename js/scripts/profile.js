
import {
  About,
  Contact,
  Education,
  Experience,
  Project,
  project_language,
  project_tag,
  Skill,
  User_Info
} from "../links.js";
import fetchDate from "../fetchData.js";

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
// JS for profile.html

// onLoad I want to fecth data and display on profile.html page
let userRole = "";
let model_content_handle = document.getElementById("model_content_handle");


let auth_token = localStorage.getItem("auth_token");
userRole = localStorage.getItem("userRole");

if (userRole === "admin" || !userRole) {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("userRole");

  location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
}
let myModal = document.getElementById("myModal");
  window.onload = async function () {
  // I have to get id from local storage after login and then find data from dataReceived based on id
  // and then passed to each function
  document.getElementById("loading").style.display="none"

  await fetchDate.run();
  initialize()
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
  let socials_header = document.getElementById("socials_header");

  if(contactArr.length>0)
  {
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
                <a href="${Links[i]}"><i class="fa-brands fa-${social_names[i]}"></i></a>
                <span class="header_social_link contact_detail"><a href="${i}">${Links[i]}</a></span>
            </div>
                `;
      }
    }
  
    socials_header.innerHTML = str;

  }else
  {
    socials_header.innerHTML = `
    <p class="no_result_text white_text">Add socials</p>
    `;
  }
}

function infoHandle() {
  let info_id = document.getElementById("info_id");

  if(user_infoArr.length===0 || educationArr.length===0 || contactArr.length===0)
  {
    info_id.innerHTML=`
    <p class="no_result_text">Add information</p>
    
    `
    return;
  }

  const name = current_user[0].first_name + " " + current_user[0].last_name;
  let infoStr = `
    <div class="info_start_container">
        <h3 class="info_name">${name}</h3>
        <h4 class="info_designation">${user_infoArr[0].designation}</h4>
    </div>
    <div class="recent_education_container">
        <p class="recent_university_name">${educationArr[0].institute_name}</p>
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
  if(aboutArr.length===0)
  {
    about_profile.innerHTML=`
    <p class="no_result_text white_text">Add about</p>
    
    `
    return;
  }
  about_profile.innerText = aboutArr[0].description;
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
    const p_id=project[i].project_id;
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
      <div class="fetched_item">
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
        
        <p class="item_heading">${experience[i].company_name}</p>
        <p class="item_sub_heading">${experience[i].role}</p>
        <h3 class="item_date">${dateSlice(
          experience[i].start_date
        )} - ${dateSlice(experience[i].end_date)}</h3>
        <p class="item_p">${experience[i].description}</p>
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
        
            <p class="item_heading">${education[i].institute_name}</p>
            <p class="item_sub_heading">${education[i].degree}</p>
            <p class="item_sub_heading">${education[i].location}</p>
            <h3 class="item_date">${dateSlice(
              education[i].start_date
            )} - ${dateSlice(education[i].end_date)}</h3>
            <p class="item_p">${education[i].description}</p>
            <hr class="item_divider">
            </div>
            
            `;
  }

  profile_education_items.innerHTML = educationStr;
}

function skillsHandle() {
  let profile_skills_items = document.getElementById("profile_skills_items");
  let skill_str = "";

  if(skillsArr.length===0)
  {
    profile_skills_items.innerHTML = `
    <p class="no_result_text">No skill found</p>
    
    `;

    return;
  }

  console.log(skillsArr);

  for (let i = 0; i < skillsArr.length; i++) {
    skill_str =
      skill_str +
      `
        
        <div class="fetched_item">
        <p class="item_heading">${skillsArr[i].skill_name}</p>
        <h3 class="item_date">${dateSlice(
          skillsArr[i].start_date
        )} - ${dateSlice(skillsArr[i].end_date)}</h3>
        <hr class="item_divider">
        </div>
        `;
  }

  profile_skills_items.innerHTML = skill_str;
}

function footerHandle() {
  let footer_socials = document.getElementById("footer_socials");

  if(contactArr.length===0)
  {
    footer_socials.innerHTML = `
    
    <p class="no_result_text white_text">No contact found</p>
    `;

    return;
  }
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
          <a href="${Links[i]}"><i class="fa-brands fa-${social_names[i]}"></i></a>
          `;
    }
  }

  console.log();

  footer_socials.innerHTML = str;
}

let logout_btn_handle = document.getElementById("logout_btn_handle");

logout_btn_handle.addEventListener("click", () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("userRole");

  location.href = "http://127.0.0.1:5501/src/pages/Login/login.html";
});



// function handle CRUD and update dom--------------

// about

const aboutUpdate=async(upObj)=>{
  const aboutObj=new About();
    // update about
  await aboutObj.updateAbout(auth_token,aboutArr[0].about_id,upObj);
  // get updated about
  aboutArr= await aboutObj.getAbouts(auth_token);
  // update dom
  aboutHandle();
}
const aboutAdd=async(upObj)=>{
  const aboutObj=new About();
    // update about
  await aboutObj.addAbout(auth_token,upObj);
  // get updated about
  aboutArr= await aboutObj.getAbouts(auth_token);
  // update dom
  aboutHandle();
}
// experience

const experienceUpdate=async(upObj,id)=>{

  const experienceObj=new Experience();
    // update about
  await experienceObj.updateExperience(auth_token,id,upObj);
  // get updated about
  experienceArr= await experienceObj.getExperiences(auth_token);
  // update dom
  experienceHandle(experienceArr);

}
const experienceDelete=async(id)=>{
  const experienceObj=new Experience();
  // update about
  await experienceObj.deleteExperience(auth_token,id);
  // get updated about
  experienceArr= await experienceObj.getExperiences(auth_token);
  // update dom
  experienceHandle(experienceArr);

 

}
const experienceAdd=async(obj)=>{
  const experienceObj=new Experience();
  // update about
  await experienceObj.addExperience(auth_token,obj);
  // get updated about
  experienceArr= await experienceObj.getExperiences(auth_token);
  // update dom
  experienceHandle(experienceArr);

}
// education

const educationUpdate=async(upObj,id)=>{

  const educationObj=new Education();
    // update about
  await educationObj.updateEducation(auth_token,id,upObj);
  // get updated about
  educationArr= await educationObj.getEducations(auth_token);
  // update dom
  educationHandle(educationArr);
  infoHandle()

}
const educationDelete=async(id)=>{ 
  const educationObj=new Education();
    // update 
  await educationObj.deleteEducation(auth_token,id);
  // get updated 
  educationArr= await educationObj.getEducations(auth_token);
  // update dom
  educationHandle(educationArr);
  infoHandle()

}
const educationAdd=async(obj)=>{
  const educationObj=new Education();
  // update 
  await educationObj.addEducation(auth_token,obj);
  // get updated 
  educationArr= await educationObj.getEducations(auth_token);
  // update dom
  educationHandle(educationArr);
  infoHandle()

}
// contact

const contactUpdate=async(upObj)=>{
  const contactObj=new Contact();
  // update about
  await contactObj.updateContact(auth_token,contactArr[0].contact_id,upObj);
  // get updated about
  contactArr= await contactObj.getContacts(auth_token);
  // update dom
  headerHandle();
  infoHandle();
}
const contactAdd=async(upObj)=>{
  const contactObj=new Contact();
  // update about
  await contactObj.addContact(auth_token,upObj);
  // get updated about
  contactArr= await contactObj.getContacts(auth_token);
  // update dom
  headerHandle();
  infoHandle();
  footerHandle();
}
// project

const projectUpdate=async(upObj,id)=>{

  const projectObj=new Project();
    // update about
  await projectObj.updateProject(auth_token,id,upObj);
  // get updated about
  projectsArr= await projectObj.getProjects(auth_token);
  // update dom
  projectHandle(projectsArr);

}
const projectDelete=async(id)=>{

  const projectObj=new Project();
    // update about
  await projectObj.deleteProject(auth_token,id);
  // get updated about
  projectsArr= await projectObj.getProjects(auth_token);
  // update dom
  projectHandle(projectsArr);

}
const projectAdd=async(upObj)=>{

  const projectObj=new Project();
    // update about
  const response=await projectObj.addProject(auth_token,upObj);
  console.log(response)
  console.log(response.lastid)
  // get updated about
  projectsArr= await projectObj.getProjects(auth_token);
  // update dom
  projectHandle(projectsArr);

  return response.lastid

}


// user_info

const userinfoUpdate=async(upObj)=>{
  const userinfoObj=new User_Info();
  // update 
  await userinfoObj.updateUserInfo(auth_token,user_infoArr[0].user_info_id,upObj);
  // get updated 
  user_infoArr= await userinfoObj.getUserInfos(auth_token);
  // update dom
  infoHandle();
}
const userinfoAdd=async(upObj)=>{
  const userinfoObj=new User_Info();
  // update 
  await userinfoObj.addUserInfo(auth_token,upObj);
  // get updated 
  user_infoArr= await userinfoObj.getUserInfos(auth_token);
  // update dom
  infoHandle();
}
// skill

const skillAdd=async(upObj)=>{
  const skillObj=new Skill();
  // update 
  await skillObj.addSkill(auth_token,upObj);
  // get updated 
  skillsArr= await skillObj.getSkills(auth_token);
  // update dom
  skillsHandle();
}
const skillDelete=async(id)=>{
  const skillObj=new Skill();
  // update 
  await skillObj.deleteSkill(auth_token,id);
  // get updated 
  skillsArr= await skillObj.getSkills(auth_token);
  // update dom
  skillsHandle();
}
const skillUpdate=async(upObj,id)=>{
  const skillObj=new Skill();
  // update 
  await skillObj.updateSkill(auth_token,id,upObj);
  // get updated 
  skillsArr= await skillObj.getSkills(auth_token);
  // update dom
  skillsHandle();
}
// project_language

const projectlanguageAdd=async(adObj,pid)=>{
  const planguageObj=new project_language();

  // add
   await planguageObj.addprojectLanguage(auth_token,pid,adObj);
  //  update 
   project_languageArr=await planguageObj.getprojectLanguages(auth_token);
}
const projectlanguageDelete=async(pid)=>{
  const planguageObj=new project_language();

  // delete
   await planguageObj.deleteAllprojectLanguage(auth_token,pid);
  //  update 
   project_languageArr=await planguageObj.getprojectLanguages(auth_token);
}


// project_tag

const projecttagAdd=async(adObj,pid)=>{
  const ptagObj=new project_tag();

  // add
   await ptagObj.addProjectTag(auth_token,pid,adObj);
  //  update 
   project_tagArr=await ptagObj.getProjectTags(auth_token);
}
const projecttagDelete=async(apid)=>{
  const ptagObj=new project_tag();
 
  // delete
   await ptagObj.deleteAllProjectTag(auth_token,apid);
  //  update 
   project_tagArr=await ptagObj.getProjectTags(auth_token);
}

// -------------- Handle different sections edit--------------

let socials_handle=document.getElementById("socials_handle")
socials_handle.addEventListener("click",()=>{

  let cArr=[]
  if(contactArr.length===0)
  {
    cArr={
        email:'',
        phone:'',
        instagram:'',
        linkedin:'',
        twitter:'',
        github:'',
      }
  }
  else
  {
    cArr={
        email:contactArr[0].email,
        phone:contactArr[0].phone,
        instagram:contactArr[0].instagram,
        linkedin:contactArr[0].linkedin,
        twitter:contactArr[0].twitter,
        github:contactArr[0].github,
      }
  }
  // handle socials edit model
  let str=`<form id="socials_edit_form">
  <div>
  <label for="email" class="label_input">Enter Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value='${cArr.email}'
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
        value='${cArr.phone}'
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
      value='${cArr.instagram}'
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
      value='${cArr.twitter}'
      class='input_field'
      
    />
  </div>
  <div className=''>
  <label for="linkedin" class="label_input">Enter Linkedin Link</label>
      <input
      type="text"
      id="linkedin"
      name="linkedin"
      value='${cArr.linkedin}'
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
      value='${cArr.github}'
      class='input_field'
      placeholder='Enter Link for github'
      
    />
  </div>

  <button type="submit" class='social_submit filled_btn' id="social_submit_btn">Edit socials</button>
</form>`



  model_content_handle.innerHTML=str;

  myModal.style.display="block"

  let socials_edit_form=document.getElementById("socials_edit_form")
  socials_edit_form.addEventListener("submit",async(e)=>{
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
    
    if(contactArr.length===0)
    {
      await contactAdd(updatedVersion)
    }
    else
    {

      await contactUpdate(updatedVersion)
    }
    
    myModal.style.display="none"

  })

})


let info_handle=document.getElementById("info_handle")

info_handle.addEventListener("click",()=>{

  let iArr={};

  if(user_infoArr.length===0)
  {
    iArr={
      designation:"",
      location:""
    }
  }
  else
  {
    iArr={
      designation:user_infoArr[0].designation,
      location:user_infoArr[0].location
    }
  }

  let str=`
  <h2> Update User info </h2>
  <form id="info_update_form">
  <div className=''>
  <label for="designation" class="label_input">Enter Designation</label>
      <input
        type="text"
        id="designation"
        name="designation"
        value='${iArr.designation}'
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
          value='${iArr.location}'
          class='input_field'
          placeholder='Enter location separated by commas'
          
        />
      </div>
    
      <button type="submit" class='info_submit filled_btn' id="info_submit_btn">Edit info</button>
    </form>`

  model_content_handle.innerHTML=str;

  myModal.style.display="block"

  let info_update_form=document.getElementById("info_update_form")
  info_update_form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);
    const updateuserInfo={
      designation: obj.designation,
      location: obj.location,
    }
    
    if(user_infoArr.length===0)
    {
      await userinfoAdd(updateuserInfo)
    }
    else
    {
      await userinfoUpdate(updateuserInfo)
    }

    myModal.style.display="none"
 
})
})


let about_handle=document.getElementById("about_handle")

about_handle.addEventListener("click",()=>{
  // handle about section edit model

  let aArr={};
  if(aboutArr.length===0)
  {
    aArr={
      description:""
    }
  }
  else
  {
    aArr={
      description:aboutArr[0].description
    }
  }
  let str=`
  <h2> Edit About </h2>
  <form id="about_edit_form">
  <div className=''>
  <label for="desc" class="label_input">Enter Description</label>
  <textarea id="desc" name="desc" class="input_field" rows="4" cols="50">${aArr.description}</textarea>
  <br>
    </div>
    
      <button type="submit" class='about_submit filled_btn' id="about_submit_btn">Edit about</button>
    </form>
  
  `

  model_content_handle.innerHTML=str;

  myModal.style.display="block"

  let about_edit_form=document.getElementById("about_edit_form")
  about_edit_form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);
    const updatedVersion={
      description: obj.desc,
    }
  
    if(aboutArr.length===0)
    {
      await aboutAdd(updatedVersion);
    }
    else
    {
      await aboutUpdate(updatedVersion)
    }

    myModal.style.display="none"

  })

  console.log("about edit clicked")
})


let experience_handle=document.getElementById("experience_handle")
experience_handle.addEventListener("click",()=>{
  let experienceStr = "";

  console.log(experienceArr)
  console.log(experienceArr.length)

  if(experienceArr.length>0)
  {

      for (let i = 0; i < experienceArr.length; i++) {
        experienceStr =
          experienceStr +
          `
    
            <div class="fetched_item section_container_css">
              <input style="display: none;" value="${experienceArr[i].experience_id}">
              <div class="item_controls edit_btn">
                <i class="fa-solid fa-pen  experience_model_item_edit_handle"></i>
                <i class="fa-solid fa-trash experience_model_item_delete_handle" ></i>
              </div>
              <p class="item_heading">${experienceArr[i].company_name}</p>
              <p class="item_sub_heading">${experienceArr[i].role}</p>
              <h3 class="item_date">${dateSlice(
                experienceArr[i].start_date
              )} - ${dateSlice(experienceArr[i].end_date)}</h3>
              <p class="item_p">${experienceArr[i].description}</p>
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
      myModal.style.display="none"
    })
    }
  }
  else
  {
    
    experienceStr=`
    <div class="section_container_css add_btn_container">
        <button class="filled_btn add_btn" id="Add_experience_btn">Add Experience </button>
        <p class="no_result_text">No experience found</p>
    </div>
    `
    model_content_handle.innerHTML=experienceStr
      myModal.style.display="block"
  }


 const Add_experience_btn=document.getElementById("Add_experience_btn")
 Add_experience_btn.addEventListener("click",()=>{
  experienceForm(undefined)
 })

})

async function experienceDeleteHandle(id)
{
  await experienceDelete(id)
 
}

function experienceForm(id)
{
  
  let str='';
  let receivedId=undefined;
  if(id)
  {
    console.log("Inside update sec")

    receivedId=parseInt(id)
    const clickedProject = experienceArr.filter((item) => {
      return item.experience_id === receivedId;
    });
    str=` <form id="experience_add_form">
    <div className=''>
    <label for="companyName" class="label_input">Enter Company Name</label>
    <input
        type="text"
        id="companyName"
        name="companyName"
        value='${clickedProject[0].company_name}'
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
          value='${clickedProject[0].start_date}'
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
            value='${clickedProject[0].end_date}'
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
                value='${clickedProject[0].description}'
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

  model_content_handle.innerHTML=str;
  myModal.style.display="block";


  let experience_add_form=document.getElementById("experience_add_form")

  experience_add_form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);

    let sDate=new Date(obj.startDate)
    let eDate=new Date(obj.endDate)

    let year=eDate.getFullYear()-sDate.getFullYear();

    if(year<0)
    {
      alert("Enter valid end date")
      experience_add_form.reset();
      return;
    }

    const updatedVersion={
      company_name: obj.companyName,
      role: obj.role,
      start_date: obj.startDate,
      end_date: obj.endDate,
      years: year,
      description: obj.desc,
    }

    

    // let expObj=new Experience();
    if(id)
    {
      console.log("update experience")
      await experienceUpdate(updatedVersion,receivedId);
    }
    else
    {
      console.log("add experience")
      await experienceAdd(updatedVersion)   
     
    }
    
    myModal.style.display = "none";

  })
}



let project_handle=document.getElementById("project_handle")

project_handle.addEventListener("click",()=>{
   // handle project section edit model
   let pro_str = "";

   if(projectsArr.length>0)
   {
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
        const p_id=projectsArr[i].project_id;
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
          <div class="fetched_item section_container_css">
            <input style="display: none;" value="${projectsArr[i].project_id}">
            <div class="project_item_controls edit_btn">
                <i class="fa-solid fa-pen  project_model_item_edit_handle"></i>
                <i class="fa-solid fa-trash project_model_item_delete_handle" ></i>
            </div>
              <div class="item_detail_section">
                  ${media_str}
                  <div class="item_info">
    
                      <p class="item_heading">${projectsArr[i].title}</p>
                      <h3 class="item_date">${dateSlice(
                        projectsArr[i].start_date
                      )} - ${dateSlice(projectsArr[i].end_date)}</h3>
                  </div>
              </div>
              <p class="item_p">${projectsArr[i].description}</p>
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
        myModal.style.display="none"
      })
      }
   }
   else
   {
    pro_str=`
      <div class="section_container_css">
          <button class="filled_btn add_pro_btn" id="Add_project_btn">Add Project </button>
          <p class="no_result_text">No project found</p>
      </div>
      `
      model_content_handle.innerHTML=pro_str
      myModal.style.display="block"
   }


  const Add_project_btn=document.getElementById("Add_project_btn")
  Add_project_btn.addEventListener("click",()=>{
    projectForm(undefined)
  })

})



let education_handle=document.getElementById("education_handle")
education_handle.addEventListener("click",()=>{

  let educationStr = "";

  if(educationArr.length>0)
  {

      for (let i = 0; i < educationArr.length; i++) {
        educationStr =
          educationStr +
          `
                <div class="fetched_item section_container_css">
                  <input style="display: none;" value="${educationArr[i].education_id}">
                  <div class="item_controls edit_btn education_edits">
                    <i class="fa-solid fa-pen  education_model_item_edit_handle"></i>
                    <i class="fa-solid fa-trash education_model_item_delete_handle" ></i>
                  </div>
                  <p class="item_heading">${educationArr[i].institute_name}</p>
                  <p class="item_sub_heading">${educationArr[i].degree}</p>
                  <h3 class="item_date">${dateSlice(
                    educationArr[i].start_date
                  )} - ${dateSlice(educationArr[i].end_date)}</h3>
                  <p class="item_p">${educationArr[i].description}</p>
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
      myModal.style.display="none"
    })
    }
  }
  else
  {
    educationStr=`
    <div class="section_container_css add_btn_container">
      <button class="filled_btn add_btn" id="Add_education_btn">Add Experience </button>
      <p class="no_result_text">No education found</p>
  </div>
  `
    model_content_handle.innerHTML=educationStr
    myModal.style.display="block"
  }


 const Add_education_btn=document.getElementById("Add_education_btn")
 Add_education_btn.addEventListener("click",()=>{
  educationForm(undefined)
 })


})


function educationForm(id){
  let str='';
  let receivedId=undefined;
  if(id)
  {

    receivedId=parseInt(id)
    const clickedProject = educationArr.filter((item) => {
      return item.education_id === receivedId;
    });
    str=` <form id="education_add_form">
    <div className=''>
    <label for="institute_name" class="label_input">Enter Institute Name</label>
    <input
        type="text"
        id="institute_name"
        name="institute_name"
        value='${clickedProject[0].institute_name}'
        class='input_field'
        required
      />
    </div>
    <div className=''>
    <label for="degree" class="label_input">Enter Degree</label>
      <input
        type="text"
        id="degree"
        name="degree"
        class='input_field'
        value='${clickedProject[0].degree}'
        required
      />
    </div>
    <div className=''>
    <label for="location" class="label_input">Enter Location</label>
      <input
        type="text"
        id="location"
        name="location"
        class='input_field'
        value='${clickedProject[0].location}'
        required
      />
    </div>
    <div className=''>
    <label for="education_s_date" class="label_input">Add Start Date</label>
        <input
          type="date"
          id="education_s_date"
          name="startDate"
          value='${clickedProject[0].start_date}'
          class='input_field'
          required
        />
      </div>
        <div className=''>
        <label for="education_e_date" class="label_input">Add End Date</label>
            <input
            type="date"
            id="education_e_date"
            name="endDate"
            value='${clickedProject[0].end_date}'
            class='input_field'
            required
          />
        </div>
        <div className=''>
        <label for="description" class="label_input">Enter Description</label>
                <input
                type="text"
                id="description"
                name="description"
                value='${clickedProject[0].description}'
                class='input_field'
                required
              />
        </div>

      
        <button type="submit" class='education_submit filled_btn' id="education_submit_btn">Edit Education</button>
</form>
`
  }
  else
  {
    str=` <form id="education_add_form">
    <div className=''>
    <label for="institute_name" class="label_input">Enter Institute Name</label>
    <input
        type="text"
        id="institute_name"
        name="institute_name"
        class='input_field'
        required
      />
    </div>
    <div className=''>
    <label for="degree" class="label_input">Enter Degree</label>
      <input
        type="text"
        id="degree"
        name="degree"
        class='input_field'
        required
      />
    </div>
    <div className=''>
    <label for="location" class="label_input">Enter Location</label>
      <input
        type="text"
        id="location"
        name="location"
        class='input_field'
        required
      />
    </div>
    <div className=''>
    <label for="education_s_date" class="label_input">Add Start Date</label>
        <input
          type="date"
          id="education_s_date"
          name="startDate"
          class='input_field'
          required
        />
      </div>
        <div className=''>
        <label for="education_e_date" class="label_input">Add End Date</label>
            <input
            type="date"
            id="education_e_date"
            name="endDate"
            class='input_field'
            required
          />
        </div>
        <div className=''>
        <label for="description" class="label_input">Enter Description</label>
                <input
                type="text"
                id="description"
                name="description"
                class='input_field'
                required
              />
        </div>

      
        <button type="submit" class='education_submit filled_btn' id="education_submit_btn">Add Education</button>
</form>
`
  }

  model_content_handle.innerHTML=str;
  myModal.style.display="block";


  let education_add_form=document.getElementById("education_add_form")

  education_add_form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);

    let sDate=new Date(obj.startDate)
    let eDate=new Date(obj.endDate)

    let year=eDate.getFullYear()-sDate.getFullYear();

    if(year<0)
    {
      alert("Enter valid end date")
      education_add_form.reset();
      return;
    }

    const updatedVersion={
      institute_name: obj.institute_name,
      degree: obj.degree,
      location: obj.location,
      start_date: obj.startDate,
      end_date: obj.endDate,
      description: obj.description,
    }

    

    // let expObj=new Experience();
    if(id)
    {
      
      await educationUpdate(updatedVersion,receivedId);
    }
    else
    {
      await educationAdd(updatedVersion)   
     
    }
    
    myModal.style.display = "none";

  })
}

async function educationDeleteHandle(id){
  await educationDelete(id)
}

let skills_handle=document.getElementById("skills_handle")
skills_handle.addEventListener("click",()=>{
   // handle skills section edit model
  
   let skillStr = "";

   if(skillsArr.length>0)
   {
 
       for (let i = 0; i < skillsArr.length; i++) {
        skillStr =
        skillStr +
           `
                 <div class="fetched_item section_container_css">
                   <input style="display: none;" value="${skillsArr[i].skill_id}">
                   <div class="item_controls edit_btn skill_edits">
                     <i class="fa-solid fa-pen  skill_model_item_edit_handle"></i>
                     <i class="fa-solid fa-trash skill_model_item_delete_handle" ></i>
                   </div>
                   <div class="fetched_item">
                   <p class="item_heading">${skillsArr[i].skill_name}</p>
                   <h3 class="item_date">${dateSlice(
                     skillsArr[i].start_date
                   )} - ${dateSlice(skillsArr[i].end_date)}</h3>
                   <hr class="item_divider">
                   </div>
                 </div>
                 
                 `;
       }
     
       skillStr=`
       <div class="section_container_css add_btn_container">
         <button class="filled_btn add_btn" id="Add_skill_btn">Add Skill </button>
         ${skillStr}
     </div>
     `
       model_content_handle.innerHTML=skillStr
       myModal.style.display="block"
     
       const items = document.getElementsByClassName('skill_model_item_edit_handle');
     for(let item of items){
     item.addEventListener("click",(e)=>{
       skillForm(item.parentNode.parentNode.children[0].getAttribute("value"))
     })
     }
       const items2 = document.getElementsByClassName('skill_model_item_delete_handle');
     for(let item of items2){
     item.addEventListener("click",(e)=>{
       skillDeleteHandle(item.parentNode.parentNode.children[0].getAttribute("value"))
       myModal.style.display="none"
     })
     }
   }
   else
   {
    skillStr=`
     <div class="section_container_css add_btn_container">
       <button class="filled_btn add_btn" id="Add_skill_btn">Add Skill </button>
       <p class="no_result_text">No skill found</p>
   </div>
   `
     model_content_handle.innerHTML=skillStr
     myModal.style.display="block"
   }
 
 
  const Add_skill_btn=document.getElementById("Add_skill_btn")
  Add_skill_btn.addEventListener("click",()=>{
   skillForm(undefined)
  })

})


function skillForm(id){
  let str='';
  let receivedId=undefined;
  if(id)
  {

    receivedId=parseInt(id)
    const clickedProject = skillsArr.filter((item) => {
      return item.skill_id === receivedId;
    });
    str=` <form id="skill_add_form">
    <div className=''>
    <label for="skill_name" class="label_input">Enter Skill Name</label>
    <input
        type="text"
        id="skill_name"
        name="skill_name"
        value='${clickedProject[0].skill_name}'
        class='input_field'
        required
      />
    </div>
    <div className=''>
    <label for="skill_s_date" class="label_input">Add Start Date</label>
        <input
          type="date"
          id="skill_s_date"
          name="startDate"
          value='${clickedProject[0].start_date}'
          class='input_field'
          required
        />
      </div>
        <div className=''>
        <label for="skill_e_date" class="label_input">Add End Date</label>
            <input
            type="date"
            id="skill_e_date"
            name="endDate"
            value='${clickedProject[0].end_date}'
            class='input_field'
            required
          />
        </div>
        <div className=''>
        <label for="experience_per" class="label_input">Enter Experience in %</label>
                <input
                type="number"
                id="experience_per"
                name="experience_per"
                value='${clickedProject[0].experience_per}'
                class='input_field'
                required
              />
        </div>

      
        <button type="submit" class='skill_submit filled_btn' id="skill_submit_btn">Edit Skill</button>
</form>
`
  }
  else
  {
    str=` <form id="skill_add_form">
    <div className=''>
    <label for="skill_name" class="label_input">Enter Skill Name</label>
    <input
        type="text"
        id="skill_name"
        name="skill_name"
        class='input_field'
        required
      />
    </div>
    <div className=''>
    <label for="skill_s_date" class="label_input">Add Start Date</label>
        <input
          type="date"
          id="skill_s_date"
          name="startDate"
          class='input_field'
          required
        />
      </div>
        <div className=''>
        <label for="skill_e_date" class="label_input">Add End Date</label>
            <input
            type="date"
            id="skill_e_date"
            name="endDate"
            class='input_field'
            required
          />
        </div>
        <div className=''>
        <label for="experience_per" class="label_input">Enter Experience in %</label>
                <input
                type="number"
                id="experience_per"
                name="experience_per"
                class='input_field'
                required
              />
        </div>

      
        <button type="submit" class='skill_submit filled_btn' id="skill_submit_btn">Add Skill</button>
</form>
`
  }

  model_content_handle.innerHTML=str;
  myModal.style.display="block";


  let skill_add_form=document.getElementById("skill_add_form")

  skill_add_form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);

    let sDate=new Date(obj.startDate)
    let eDate=new Date(obj.endDate)

    let year=eDate.getFullYear()-sDate.getFullYear();

    if(year<0)
    {
      alert("Enter valid end date")
      skill_add_form.reset();
      return;
    }

    const updatedVersion={
      skill_name: obj.skill_name,
      start_date: obj.startDate,
      end_date: obj.endDate,
      experience_per: obj.experience_per,
    }

    

    // let expObj=new Experience();
    if(id)
    {
      
      await skillUpdate(updatedVersion,receivedId);
    }
    else
    {
      await skillAdd(updatedVersion)   
     
    }
    
    myModal.style.display = "none";

  })
}
async function skillDeleteHandle(id){
  await skillDelete(id)
}

let close_model_handle=document.getElementById("close_model_handle")

close_model_handle.addEventListener("click",()=>{
  myModal.style.display="none"
})


const convertBase64=async(file)=>{
    const fileReader = new FileReader();

    return new Promise(resolve=>{
      fileReader.readAsDataURL(file);
      fileReader.onload=(e)=>{
        resolve(e.target.result);

      }
    })  
}



// show form to edit project
function projectForm(id)
{
  let str='';
  let receivedId=undefined;
  if(id)
  {

    receivedId=parseInt(id)
    const clickedProject = projectsArr.filter((item) => {
      return item.project_id === receivedId;
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
      value='${clickedProject[0].description}'
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
        value=${clickedProject[0].start_date}
        required
      />
    </div>
      <div className=''>
      <label for="project_e_date" class="label_input">Edit project end date</label>
          <input
          type="date"
          id="project_e_date"
          name="endDate"
          value=${clickedProject[0].end_date}
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
              value='${clickedProject[0].source_link}'
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
              value='${clickedProject[0].live_link}'
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


  project_add_form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data);
    var fileExt = obj.file.name.split('.').pop();
    // convert file into base64

    const file_base64=await convertBase64(obj.file)

    const lang_arr= convertLangArr(lan_item_model)
    const tag_arr=convertTagArr(tag_item_model)


    console.log("lan arr")
    console.log(lang_arr)
    console.log("tag arr")
    console.log(tag_arr)


    
    const updatedVersion={
      file: file_base64,
      exe: fileExt,
      title: obj.title,
      start_date: obj.startDate,
      end_date: obj.endDate,
      description: obj.desc,
      source_link: obj.sourceLink,
      live_link: obj.liveLink,
    }
    console.log(obj)

    console.log(updatedVersion)



    if(receivedId)
    {
      console.log("inside update")
      await projectUpdate(updatedVersion,receivedId)
     
      // first delete all tags and languages specific to project 

      await projectlanguageDelete(receivedId)
      await projecttagDelete(receivedId)

      // add updated onces
      for (const item of lang_arr) {
        await projectlanguageAdd(item,receivedId)
      }

      for (const item2 of tag_arr) {
        await projecttagAdd(item2,receivedId)
      }
      
    }
    else
    {
      console.log("inside add")
      const lastId=await projectAdd(updatedVersion);
      // After adding project get new project id
      console.log("lastId:"+lastId)
      // add languages in DB and update arr
      for (const item of lang_arr) {
        await projectlanguageAdd(item,lastId)
      }

      // add tags in DB and update arr
      for (const item2 of tag_arr) {
        await projecttagAdd(item2,lastId)
      }


    }
    projectHandle(projectsArr)
    
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
      lan_name:item.childNodes[1].innerText,
      lan_percentage:parseInt(item.childNodes[3].innerText)
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
      tag_name:item.childNodes[1].innerText,
    }
    tagArr.push(obj)
  }

  return tagArr;
}


function getLanguagesStr(currProject)
{
  let str='';
  const lanArr=getProjectLanguages(currProject.project_id)
  for (let i = 0; i < lanArr.length; i++) {
    if(i==0)
    {
      str=str+`
      <p class="p_model">Languages:</p>
      `
    }
    str=str+`
    <div class="lan_item_model model_item_con">
      <span class="lan_name_model item_model">${lanArr[i].lan_name}</span>
      <span class="lan_per_model item_model">${lanArr[i].lan_percentage}</span>
      <i class="fa-solid fa-xmark delete_lan_icon  icon_model" ></i>
    </div>
    
    `
  }

  return str;
}
function getTagsStr(currProject)
{
  let str="";
  const tagArr=getProjectTag(currProject.project_id)
  for (let i = 0; i < tagArr.length; i++) {
    if(i==0)
    {
      str=str+`
      <p class="p_model">Tags:</p>
      `
    }
    str=str+`
    <div class="tag_item_model model_item_con">
      <span class="tag_name_model item_model">${tagArr[i].tag_name}</span>
      <i class="fa-solid fa-xmark delete_tag_icon icon_model " ></i>
    </div>
    
    `
  }

  return str;
}

async function projectDeleteHandle(id){
  await projectDelete(id)
}

// Project search handling-----------

let project_search_form=document.getElementById("project_search_form");
let search_project_keyword_input=document.getElementById("search_project_keyword_input");
let projectKeyword=document.getElementById("projectKeyword");
let searchedProjectArr=[]


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

function checkInDesc(projectsArr,input_val){
  return   projectsArr.filter((item) => {
    return item.description.toLowerCase().includes(input_val.toLowerCase());
  });
}
function checkInTag(ptArr,input_val){
  const tArr= ptArr.filter((item) => {
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
function checkInLan(plArr,input_val){
  const pLan=plArr.filter((item) => {
    if(item.lan_name.toLowerCase().includes(input_val.toLowerCase()))
      {
        console.log(item)
        return item;
      }
});

return getProjectsFromLan(pLan)
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
    return item.institute_name.toLowerCase().includes(input_val.toLowerCase());
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