// Whenever the page relaod it fetch data from db and show on the page
import {
  About,
  Contact,
  Education,
  Experience,
  Project,
  Skill,
  User_Info,
  User_registration,
} from "./links.js";

const dataReceieved = {
  aboutData: "",
  contactArr: [],
  educationArr: [],
  experienceArr: [],
  projectArr: [],
  skillArr: [],
  user_infoArr: [],
  User_registration: [],
};
//   fetch data from db and render on page

const aboutObj = new About();
const contactObj = new Contact();
const educationObj = new Education();
const experienceObj = new Experience();
const projectObj = new Project();
const skillObj = new Skill();
const user_infobj = new User_Info();
const User_registrationobj = new User_registration();

(function fetchData(
  aboutObj,
  contactObj,
  educationObj,
  experienceObj,
  projectObj,
  skillObj,
  user_infobj,
  User_registrationobj
) {
  dataReceieved.aboutData = aboutObj.getAbouts();
  dataReceieved.contactArr = contactObj.getContacts();
  dataReceieved.educationArr = educationObj.getEducations();
  dataReceieved.experienceArr = experienceObj.getExperiences();
  dataReceieved.projectArr = projectObj.getProjects();
  dataReceieved.skillArr = skillObj.getSkills();
  dataReceieved.user_infoArr = user_infobj.getuserInfos();
  dataReceieved.User_registration = User_registrationobj.getUsers();
  
})(
  aboutObj,
  contactObj,
  educationObj,
  experienceObj,
  projectObj,
  skillObj,
  user_infobj,
  User_registrationobj
);

export default dataReceieved;
