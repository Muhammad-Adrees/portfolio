import experienceData from "../Api/Experience.json" assert { type: "json" };

export class Experience {
  // initialize values in constructor
  constructor() {
    this.experienceId = 0;
    this.userId = 0;
    this.companyName = "";
    this.role = "";
    this.startDate = "";
    this.endDate = "";
    this.years = 0;
    this.desc = "";
  }
  // Perform CRUD

  addExperience(experience) {
    // read JSON file and append new Experience

    // get data from .json
    const ExperienceArr = this.getExperiences();
    const size = ExperienceArr.length;
    // add id
    experience.experienceId = size + 1;
    // push to the fetched array
    ExperienceArr.push(experience);
    // download the file
    this.#download(ExperienceArr);
  }
  updateExperience(userid, id, upExperience) {
    // search particular Experience id then update data then save json

    // get data from .json
    const ExperienceArr = this.getExperiences();

    // search for specific index, one having userId=userid and experienceId=id
    console.log(ExperienceArr);
    let ExperienceIn = -1;

    for (let i = 0; i < ExperienceArr.length; i++) {
      if (
        ExperienceArr[i].experienceId === id &&
        ExperienceArr[i].userId === userid
      ) {
        ExperienceIn = i;
        break;
      }
    }
    console.log("index:" + ExperienceIn);

    // update object
    const updatedVersion = {
      experienceId: id,
      userId: userid,
      companyName: upExperience.companyName,
      role: upExperience.role,
      startDate: upExperience.startDate,
      endDate: upExperience.endDate,
      years: upExperience.years,
      desc: upExperience.desc,
    };
    ExperienceArr[ExperienceIn] = updatedVersion;
    console.log(ExperienceArr);
    // download the file
    this.#download(ExperienceArr);
  }
  deleteExperience(id) {
    // delete Experience with particular id and then save
    // getting array of objects
    const ExperienceArr = this.getExperiences();

    // filter array where experienceId!=id

    const filteredResult = ExperienceArr.filter((curr) => {
      return curr.experienceId != id;
    });

    // download the file
    this.#download(filteredResult);
  }
  getExperiences() {
    // get all Experience
    try {
      const data = experienceData;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getSingleExperience(userid, id) {
    // get single Experience by id

    // getting array of objects
    const ExperienceArr = this.getExperiences();

    // search for specific one having userId=userid and experienceId=id

    return ExperienceArr.filter((curr) => {
      return curr.experienceId === id && curr.userId === userid;
    })[0];
  }
  #download(arr) {
    const fileName = "Experience.json";
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
