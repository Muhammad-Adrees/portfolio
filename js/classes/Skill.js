import skillData from "../Api/Skills.json" assert { type: "json" };
export class Skill {
  // initialize values in constructor
  constructor() {
    this.skillId = 0;
    this.userId = 0;
    this.skillName = "";
    this.startDate = "";
    this.endDate = "";
    this.expertisePer = 0;
  }
  // Perform CRUD

  addSkill(skill) {
    // read JSON file and append new Skill

    // get data from .json
    const SkillArr = this.getSkills();
    const size = SkillArr.length;
    // add id
    skill.skillId = size + 1;
    // push to the fetched array
    SkillArr.push(skill);
    // download the file
    this.#download(SkillArr);
  }
  updateSkill(userid, id, upSkill) {
    // search particular Skill id then update data then save json

    // get data from .json
    const SkillArr = this.getSkills();

    // search for specific index, one having userId=userid and skillId=id
    console.log(SkillArr);
    let SkillIn = -1;

    for (let i = 0; i < SkillArr.length; i++) {
      if (SkillArr[i].skillId === id && SkillArr[i].userId === userid) {
        SkillIn = i;
        break;
      }
    }

    // update object
    const updatedVersion = {
      skillId: id,
      userId: userid,
      skillName: upSkill.skillName,
      startDate: upSkill.startDate,
      endDate: upSkill.endDate,
      expertisePer: upSkill.expertisePer,
    };
    SkillArr[SkillIn] = updatedVersion;
    console.log(SkillArr);
    // download the file
    this.#download(SkillArr);
  }
  deleteSkill(id) {
    // delete Skill with particular id and then save
    // getting array of objects
    const SkillArr = this.getSkills();

    // filter array where skillId!=id

    const filteredResult = SkillArr.filter((curr) => {
      return curr.skillId != id;
    });

    // download the file
    this.#download(filteredResult);
  }
  getSkills() {
    // get all Skill
    try {
      const data = skillData;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getSingleSkill(userid, id) {
    // get single Skill by id

    // getting array of objects
    const SkillArr = this.getSkills();

    // search for specific one having userId=userid and skillId=id

    return SkillArr.filter((curr) => {
      return curr.skillId === id && curr.userId === userid;
    })[0];
  }
  #download(arr) {
    const fileName = "Skill.json";
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
