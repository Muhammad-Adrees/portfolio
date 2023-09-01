import educationData from "../Api/Education.json" assert { type: "json" };

export class Education {
  // initialize values in constructor
  constructor() {
    this.educationId = 0;
    this.userId = 0;
    this.instituteName = "";
    this.degree = "";
    this.location = "";
    this.startDate = "";
    this.endDate = "";
    this.desc = "";
  }
  // Perform CRUD

  addEducation(education) {
    // read JSON file and append new Education

    // get data from .json
    const EducationArr = this.getEducations();
    const size = EducationArr.length;
    // add id
    education.educationId = size + 1;
    // push to the fetched array
    EducationArr.push(education);
    // download the file
    this.#download(EducationArr);
  }
  updateEducation(userid, id, upEducation) {
    // search particular Education id then update data then save json

    // get data from .json
    const EducationArr = this.getEducations();

    // search for specific index, one having userId=userid and educationId=id
    console.log(EducationArr);
    let EducationIn = -1;

    for (let i = 0; i < EducationArr.length; i++) {
      if (
        EducationArr[i].educationId === id &&
        EducationArr[i].userId === userid
      ) {
        EducationIn = i;
        break;
      }
    }
    console.log("index:" + EducationIn);

    // update object
    const updatedVersion = {
      educationId: id,
      userId: userid,
      instituteName: upEducation.instituteName,
      degree: upEducation.degree,
      location: upEducation.locaton,
      startDate: upEducation.startDate,
      endDate: upEducation.endDate,
      desc: upEducation.dec,
    };
    EducationArr[EducationIn] = updatedVersion;
    console.log(EducationArr);
    // download the file
    this.#download(EducationArr);
  }
  deleteEducation(id) {
    // delete Education with particular id and then save
    // getting array of objects
    const EducationArr = this.getEducations();

    // filter array where educationId!=id

    const filteredResult = EducationArr.filter((curr) => {
      return curr.educationId != id;
    });

    // download the file
    this.#download(filteredResult);
  }
  getEducations() {
    // get all Education
    try {
      const data = educationData;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getSingleEducation(userid, id) {
    // get single Education by id

    // getting array of objects
    const EducationArr = this.getEducations();

    // search for specific one having userId=userid and educationId=id

    return EducationArr.filter((curr) => {
      return curr.educationId === id && curr.userId === userid;
    })[0];
  }
  #download(arr) {
    const fileName = "Education.json";
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
