import userInfoData from "../Api/User_Info.json" assert { type: "json" };
export class User_Info {
  // initialize values in constructor
  constructor() {
    this.userInfoId = 0;
    this.userId = 0;
    this.designation = "";
    this.location = "";
  }
  // Perform CRUD

  adduserInfo(userInfo) {
    // read JSON file and append new userInfo

    // get data from .json
    const userInfoArr = this.getuserInfos();
    const size = userInfoArr.length;
    // add id
    userInfo.userInfoId = size + 1;
    // push to the fetched array
    userInfoArr.push(userInfo);
    // download the file
    this.#download(userInfoArr);
  }
  updateuserInfo(userid, upuserInfo) {
    // search particular userInfo id then update data then save json

    // get data from .json
    const userInfoArr = this.getuserInfos();

    // search for specific index, one having userId=userid and userInfoId=id
    console.log(userInfoArr);
    let userInfoIn = -1;

    for (let i = 0; i < userInfoArr.length; i++) {
      if (
        userInfoArr[i].userId === userid
      ) {
        userInfoIn = i;
        break;
      }
    }
    console.log("index:" + userInfoIn);

    // update object
    const updatedVersion = {
      userInfoId:userInfoArr[userInfoIn].userInfoId,
      userId: userid,
      designation: upuserInfo.designation,
      location: upuserInfo.location,
    };
    userInfoArr[userInfoIn] = updatedVersion;
    console.log(userInfoArr);
    // download the file
    this.#download(userInfoArr);
  }
  deleteuserInfo(id) {
    // delete userInfo with particular id and then save
    // getting array of objects
    const userInfoArr = this.getuserInfos();

    // filter array where userInfoId!=id

    const filteredResult = userInfoArr.filter((curr) => {
      return curr.userInfoId != id;
    });

    // download the file
    this.#download(filteredResult);
  }
  getuserInfos() {
    // get all userInfo
    try {
      const data = userInfoData;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getSingleuserInfo(userid, id) {
    // get single userInfo by id

    // getting array of objects
    const userInfoArr = this.getuserInfos();

    // search for specific one having userId=userid and userInfoId=id

    return userInfoArr.filter((curr) => {
      return curr.userInfoId === id && curr.userId === userid;
    })[0];
  }
  #download(arr) {
    const fileName = "user_Info.json";
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
