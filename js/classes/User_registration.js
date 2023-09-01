import user from "../Api/User.json" assert { type: "json" };
export class User_registration {
  // initialize values in constructor
  constructor() {
    this.userId = 0;
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.userRole = "user";
  }
  // Perform CRUD

  addUser(User) {
    // read JSON file and append new User

    // get data from .json
    const UserArr = this.getUsers();
    const size = UserArr.length;
    // add id
    User.userId = size + 1;
    // push to the fetched array
    UserArr.push(User);
    // download the file
    this.#download(UserArr);
  }
  updateUser(id, upUser) {
    // search particular User id then update data then save json

    // get data from .json
    const UserArr = this.getUsers();

    // search for specific index, one having userId=userId and userId=id
    console.log(UserArr);
    let UserIn = -1;

    for (let i = 0; i < UserArr.length; i++) {
      if (UserArr[i].userId === id) {
        UserIn = i;
        break;
      }
    }

    // update object
    const updatedVersion = {
      userId: id,
      firstName: upUser.firstName,
      lastName: upUser.lastName,
      email: upUser.email,
      password: upUser.password,
      userRole: upUser.userRole,
    };
    UserArr[UserIn] = updatedVersion;
    console.log(UserArr);
    // download the file
    this.#download(UserArr);
  }
  deleteUser(id) {
    // delete User with particular id and then save
    // getting array of objects
    const UserArr = this.getUsers();

    // filter array where userId!=id

    const filteredResult = UserArr.filter((curr) => {
      return curr.userId != id;
    });

    // download the file
    this.#download(filteredResult);
  }
  getUsers() {
    // get all User
    try {
      const data = user;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getSingleUser(id) {
    // get single User by id

    // getting array of objects
    const UserArr = this.getUsers();

    // search for specific one having userId=userId and userId=id

    return UserArr.filter((curr) => {
      return curr.userId === id;
    })[0];
  }
  getSingleUserByEmail(email) {
    // get single User by id

    // getting array of objects
    const UserArr = this.getUsers();
    // console.log("Get user___");
    // console.log(UserArr);
    // search for specific one having userId=userId and userId=id

    return UserArr.filter((curr) => {
      // console.log(curr);
      return curr.email == email;
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
