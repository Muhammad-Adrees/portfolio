import aboutData from "../Api/About.json" assert { type: "json" };

export class About {
  // initialize values in constructor
  constructor() {
    this.aboutId = 0;
    this.userId = 0;
    this.dec = "";
  }
  // Perform CRUD

  addAbout(about) {
    // read JSON file and append new About

    // get data from .json
    const aboutArr = this.getAbouts();
    const size = aboutArr.length;
    // add id
    about.aboutId = size + 1;
    // push to the fetched array
    aboutArr.push(about);
    // download the file
    this.#download(aboutArr);
  }
  updateAbout(userid, upAbout) {
    // search particular About id then update data then save json

    // get data from .json
    const aboutArr = this.getAbouts();

    // search for specific index, one having userId=userid and aboutid=id
    console.log(aboutArr);
    let aboutIn = -1;

    for (let i = 0; i < aboutArr.length; i++) {
      if (aboutArr[i].userId === userid) {
        aboutIn = i;
        break;
      }
    }

    // update object
    const updatedVersion = {
      aboutId:aboutArr[aboutIn].aboutId,
      userId: userid,
      desc: upAbout.desc,
    };
    aboutArr[aboutIn] = updatedVersion;
    console.log(aboutArr);
    // download the file
    this.#download(aboutArr);
  }
  deleteAbout(id) {
    // delete About with particular id and then save
    // getting array of objects
    const aboutArr = this.getAbouts();

    // filter array where aboutId!=id

    const filteredResult = aboutArr.filter((curr) => {
      return curr.aboutId != id;
    });

    // download the file
    this.#download(filteredResult);
  }
  getAbouts() {
    // get all About
    try {
      const data = aboutData;
      console.log(data[0]);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getSingleAbout(userid, id) {
    // get single About by id

    // getting array of objects
    const aboutArr = this.getAbouts();

    // search for specific one having userId=userid and aboutid=id

    return aboutArr.filter((curr) => {
      return curr.aboutId === id && curr.userId === userid;
    })[0];
  }
  #download(arr) {
    const fileName = "About.json";
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
