let users = [];
let data_show = document.querySelector("#here_card");
async function getNames() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await response.json();
    if (!response.ok) {
    throw new Error("Failed to fetch users");
}

    data.forEach((user) => {
      users.push(user);
    });
    console.log(users);
    renderCard(users);}
   catch (error) {
    console.log(error);
  }
}

function renderCard(usersList) {
  data_show.innerHTML = "";
  usersList.forEach((user) => {
    console.log(user);
    let delete_btn = document.createElement("button");
    delete_btn.innerText = "Delete";
    delete_btn.classList = "del_btn";
    let edit_btn = document.createElement("button");
    edit_btn.innerText = "Edit";
    edit_btn.classList = "edi_btn";
    let myDiv = document.createElement("div");
    myDiv.classList = "card_ele";
    myDiv.innerHTML = `<p>👤Name :${user.name}</p>
   <p>  📱 Phone :${user.phone}</p>
  <p>   📧Email :${user.email}</p>
  <div class="btn_list"> </div>
    `;
    let btns = myDiv.querySelector(".btn_list");
    btns.appendChild(delete_btn);
    btns.appendChild(edit_btn);
    data_show.appendChild(myDiv);

    delete_btn.addEventListener("click", () => {
      deleteUser(user);
    });
    edit_btn.addEventListener("click", () => {
      editUser(user);
    
    });
  });
}
let srh_text = document.getElementById("srh_bar");
function searchCard() {
  let search = srh_text.value;
  let filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  });
  console.log(filteredUsers);

  renderCard(filteredUsers);
}
getNames();
let search_btn = document.querySelector("#srh_btn");
search_btn.addEventListener("click", () => {
  searchCard();
});

async function deleteUser(person) {
  try {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${person.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    } else {
      users = users.filter((user) => user.id !== person.id);
      console.log(person);
      renderCard(users);
    }
  } catch (error) {
    console.log(error);
  }
}


let isEditing = false;
let selectedUserID = null;


function editUser(person) {
  isEditing = true;
    selectedUserID = person.id;
  form_section.style.display = "flex";
  document.querySelector("#form_name").value = person.name;
  document.querySelector("#form_email").value = person.email;
  document.querySelector("#form_numb").value = person.phone;

}
async function addUser() {
  let input_name = document.querySelector("#form_name").value;
  let input_email = document.querySelector("#form_email").value;
  let input_Numb = document.querySelector("#form_numb").value;
  let person = {
    name: input_name,
    email: input_email,
    phone: input_Numb,
  };

  if (isEditing === false) {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      } else {
        let data = await response.json();
        users.push(data);
        console.log(data);
        renderCard(users);
        user_form.reset();
form_section.style.display = "none";
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      let response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${selectedUserID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      } else {
        let data = await response.json();

      users = users.map((user) =>
        user.id === selectedUserID
          ? data
          : user
      );

 isEditing = false
selectedUserID = null
      renderCard(users);
      user_form.reset();
form_section.style.display = "none";
    }

    } catch (error) {
      console.log(error);
    }
  }
}
let user_form = document.querySelector("#user_form");
user_form.addEventListener("submit", (e) => {
  e.preventDefault();
  addUser();

 
});
let form_section=document.querySelector("#form_sec")
let add_user=document.querySelector("#add_btn")
add_user.addEventListener('click',()=>{
  isEditing = false;
selectedUserID = null;
user_form.reset();
  if(form_section.style.display ==="flex"){
form_section.style.display = "none";
}
else{
  form_section.style.display = "flex";
}
})