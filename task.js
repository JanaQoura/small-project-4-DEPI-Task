let formStu = document.getElementById("formstu");
let formName = document.getElementById("name");
let formEmail = document.getElementById("email");
let formMobile = document.getElementById("mobile");
let tableBody = document.querySelector("#example tbody");

let btnSubmit = document.getElementById("submit");
let btnHidden = document.getElementById("contIdEdit");

class student {
  constructor(id, name, email, mobile) {
    this.id = id;
    this.Name = name;
    this.Email = email;
    this.Mobile = mobile;
  }

  showData() {
    student.showHtml(this.id, this.Name, this.Email, this.Mobile);
    return this;
  }

  storeData() {
    let allData = JSON.parse(localStorage.getItem("student")) ?? [];
    allData.push({
      id: this.id,
      name: this.Name,
      email: this.Email,
      mobile: this.Mobile,
    });
    localStorage.setItem("student", JSON.stringify(allData));
  }

  static showStudents() {
    tableBody.innerHTML ='';
    if (localStorage.getItem("student")) {
      JSON.parse(localStorage.getItem("student")).forEach((item) => {
        student.showHtml(item.id, item.name, item.email, item.mobile);
      });
    }
  }

  updateStudent(id) {
    const numericId = parseInt(id);
    let newItem = {
      id: numericId,
      name: this.Name,
      email: this.Email,
      mobile: this.Mobile,
    };
    const updateData = JSON.parse(localStorage.getItem("student")).map(
      (item) => {
        if (item.id ===numericId) {
          return newItem;
        }
        return item;
      }
    );

    localStorage.setItem("student", JSON.stringify(updateData));
  }

  static showHtml(id, name, email, mobile) {
    let trEl = document.createElement("tr");
    trEl.innerHTML = `
              <td>${name}</td>
              <td>${email}</td>
              <td>${mobile}</td>
              <td>
                <button class="btn btn-danger delete text-center" data-id="${id}">
                DELETE
                 </button>
                <button class="btn btn-primary edit text-center" data-id="${id}">
                EDIT
                 </button>
              </td>
        `;
    tableBody.appendChild(trEl);
  }
}

student.showStudents();

formStu.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!contIdEdit.value) {
    let id = Math.floor(Math.random() * 100000);
    const studentOne = new student(
      id,
      formName.value,
      formEmail.value,
      formMobile.value
    );

    studentOne.showData().storeData();
  } else {
    const id = parseInt(contIdEdit.value);
    const newStu = new student(
      id,
      formName.value,
      formEmail.value,
      formMobile.value
    );
    newStu.updateStudent(id);
    btnSubmit.value = " ADD New Student ";
    contIdEdit.value = "";
    student.showStudents();
  }

  formName.value = "";
  formEmail.value = "";
  formMobile.value = "";
});

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    //remove from localstorage
    let id = parseInt(e.target.getAttribute("data-id"));
    let students = JSON.parse(localStorage.getItem("student"));
    let newData = students.filter((item) => item.id != id);
    localStorage.setItem("student", JSON.stringify(newData));

    //remove from HTML
    e.target.parentElement.parentElement.remove();
  }

  if (e.target.classList.contains("edit")) {
    //remove from localstorage
    let id = parseInt(e.target.getAttribute("data-id"));
    let item = JSON.parse(localStorage.getItem("student")).find(
      (item) => item.id === id
    );

    formName.value = item.name;
    formEmail.value = item.email;
    formMobile.value = item.mobile;
    contIdEdit.value = id;
    btnSubmit.value = " Edit This Item ";
  }
});
