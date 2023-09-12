import projectData from "../Api/Projects.json" assert { type: "json" };
export class Project {
  // initialize values in constructor
  constructor() {
    this.project_id = 0;
    this.user_id = 0;
    this.file = "";
    this.exe = "";
    this.title = "";
    this.start_date = "";
    this.end_date = "";
    this.desc = "";
    this.source_link = "";
    this.live_link = "";
    this.languages=[];
    this.tags=[];
  }
  // Perform CRUD

  addProject(project) {
    // read JSON file and append new Project

    // get data from .json
    const ProjectArr = this.getProjects();
    const size = ProjectArr.length;
    // add id
    project.projectId = size + 1;
    // push to the fetched array
    ProjectArr.push(project);
    // download the file
    this.#download(ProjectArr);
  }
  updateProject(userid, id, upProject) {
    // search particular Project id then update data then save json

    // get data from .json
    const ProjectArr = this.getProjects();

    // search for specific index, one having userId=userid and projectId=id
    console.log(ProjectArr);
    let ProjectIn = -1;

    for (let i = 0; i < ProjectArr.length; i++) {
      if (ProjectArr[i].projectId === id && ProjectArr[i].userId === userid) {
        ProjectIn = i;
        break;
      }
    }
    console.log("index:" + ProjectIn);

    console.log("Updated version--------")
    console.log(upProject)
    // update object
    const updatedVersion = {
      projectId: id,
      userId: userid,
      file: upProject.file,
      exe: upProject.exe,
      title: upProject.title,
      startDate: upProject.startDate,
      endDate: upProject.endDate,
      desc: upProject.desc,
      sourceLink: upProject.sourceLink,
      liveLink: upProject.liveLink,
      languages:upProject.languages,
      tags:upProject.tags,

    };
    ProjectArr[ProjectIn] = updatedVersion;
    console.log(ProjectArr);
    // download the file
    this.#download(ProjectArr);
  }
  deleteProject(id) {
    // delete Project with particular id and then save
    // getting array of objects
    const ProjectArr = this.getProjects();

    // filter array where projectId!=id

    const filteredResult = ProjectArr.filter((curr) => {
      return curr.projectId != id;
    });

    // download the file
    this.#download(filteredResult);
  }
  getProjects() {
    // get all Project
    try {
      const data = projectData;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getSingleProject(userid, id) {
    // get single Project by id

    // getting array of objects
    const ProjectArr = this.getProjects();

    // search for specific one having userId=userid and projectId=id

    return ProjectArr.filter((curr) => {
      return curr.projectId === id && curr.userId === userid;
    })[0];
  }
  #download(arr) {
    const fileName = "Project.json";
    let jsonText = JSON.stringify(arr);
    let ele = document.createElement("a");
    ele.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(jsonText)
    );

    ele.setAttribute("download", fileName);
    ele.style.display = "none";
    document.body.appendChild(ele);
    console.log(ele);
    ele.click();
    document.body.removeChild(ele);
  }
}
