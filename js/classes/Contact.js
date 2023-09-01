import contactData from "../Api/Contact.json" assert { type: "json" };

export class Contact {
  // initialize values in constructor

  constructor() {
    this.contactId = 0;
    this.userId = 0;
    this.email = "";
    this.phone = "";
    this.linkedin = "";
    this.instagram = "";
    this.twitter = "";
    this.github = "";
  }
  // Perform CRUD

  addContact(contact) {
    // read JSON file and append new Contact

    // get data from .json
    const ContactArr = this.getContacts();
    const size = ContactArr.length;
    // add id
    contact.contactId = size + 1;
    // push to the fetched array
    ContactArr.push(contact);
    // download the file
    this.#download(ContactArr);
  }
  updateContact(userid, upContact) {
    // search particular Contact id then update data then save json

    // get data from .json
    const ContactArr = this.getContacts();

    // search for specific index, one having userId=userid and contactId=id
    console.log(ContactArr);
    let ContactIn = -1;

    for (let i = 0; i < ContactArr.length; i++) {
      if ( ContactArr[i].userId === userid) {
        ContactIn = i;
        break;
      }
    }
    console.log("index:" + ContactIn);

    // update object
    const updatedVersion = {
      contactId:ContactArr[ContactIn].contactId,
      userId: userid,
      email: upContact.email,
      phone: upContact.phone,
      linkedin: upContact.linkedin,
      instagram: upContact.instagram,
      twitter: upContact.twitter,
      github: upContact.github,
    };
    ContactArr[ContactIn] = updatedVersion;
    console.log(ContactArr);
    // download the file
    this.#download(ContactArr);
  }
  deleteContact(id) {
    // delete Contact with particular id and then save
    // getting array of objects
    const ContactArr = this.getContacts();

    // filter array where contactId!=id

    const filteredResult = ContactArr.filter((curr) => {
      return curr.contactId != id;
    });

    // download the file
    this.#download(filteredResult);
  }
  getContacts() {
    // get all Contact
    try {
      const data = contactData;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  getSingleContact(userid, id) {
    // get single Contact by id

    // getting array of objects
    const ContactArr = this.getContacts();

    // search for specific one having userId=userid and contactId=id

    return ContactArr.filter((curr) => {
      return curr.contactId === id && curr.userId === userid;
    })[0];
  }
  #download(arr) {
    const fileName = "Contact.json";
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
