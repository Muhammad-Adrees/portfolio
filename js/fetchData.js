// Whenever the page relaod it fetch data from db and show on the page
import {
  About,
  Contact,
  Education,
  Experience,
  Project,
  Skill,
  User_Info,
  project_language,
  project_tag,
  Current_user
} from "./links.js";

const dataReceieved = {
  aboutArr: "",
  contactArr: [],
  educationArr: [],
  experienceArr: [],
  projectsArr: [],
  skillsArr: [],
  user_infoArr: [],
  project_languageArr:[],
  project_tagArr:[],
  current_user:[]
};
//   fetch data from db and render on page

const aboutObj = new About();
const contactObj = new Contact();
const educationObj = new Education();
const experienceObj = new Experience();
const projectObj = new Project();
const skillObj = new Skill();
const user_infobj = new User_Info();
const project_languageobj = new project_language();
const project_tagobj = new project_tag();
const current_user = new Current_user();

async function fetchData(
  current_user,
  aboutObj,
  contactObj,
  educationObj,
  experienceObj,
  projectObj,
  skillObj,
  user_infobj,
  project_languageobj,
  project_tagobj
) {

  const token =localStorage.getItem("auth_token");


  dataReceieved.aboutArr = await aboutObj.getAbouts(token);

  dataReceieved.current_user = await current_user.getcurrentUser(token);
  dataReceieved.contactArr =await contactObj.getContacts(token);
  dataReceieved.educationArr =await educationObj.getEducations(token);
  dataReceieved.experienceArr =await experienceObj.getExperiences(token);
  dataReceieved.projectsArr =await projectObj.getProjects(token);
  dataReceieved.skillsArr =await skillObj.getSkills(token);
  dataReceieved.user_infoArr =await user_infobj.getUserInfos(token);
  dataReceieved.project_languageArr=await project_languageobj.getprojectLanguages(token);
  console.log(dataReceieved.project_languageArr)
  dataReceieved.project_tagArr=await project_tagobj.getProjectTags(token);
  console.log(dataReceieved.project_tagArr)
  
}


const run=async()=>{
 await fetchData(
   current_user,
   aboutObj,
   contactObj,
   educationObj,
   experienceObj,
   projectObj,
   skillObj,
   user_infobj,
   project_languageobj,
   project_tagobj
 );

}

export default {dataReceieved,run};
