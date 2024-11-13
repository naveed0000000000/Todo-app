let input = document.getElementById("inp");
let text = document.querySelector(".text");

let currentUser = JSON.parse(window.localStorage.getItem("user"));
var db = firebase.database();
getTodo();

function add() {
  if (input.value == "") {
    alert("Please Enter Task");
  } else {
    let newElement = document.getElementById("list");
    let li = document.createElement("li");
    li.innerHTML = `${input.value} <i class="fa-solid fa-trash"></i>`;
    newElement.appendChild(li);
    addTodo(input.value);
    input.value = "";

    li.querySelector("i").addEventListener("click", () => {
      li.remove();
    });
  }
}

function addTodo(todo) {
  let userData = db.ref(`/todos/${currentUser.uid}`);

  let newTodo = userData.push();

  newTodo
    .set(todo)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

function getTodo() {
  db.ref(`todos/${currentUser.uid}`)
    .once("value")
    .then((snapshots) => {
      let text = document.querySelector(".text");
      let newElement = document.getElementById("list");
      snapshots.forEach((snapshot) => {
        let li = document.createElement("li");
        li.innerHTML = `${snapshot.val()} <i class="fa-solid fa-trash"></i>`;
        li.querySelector("i").addEventListener("click", () => {
          li.remove();
          deleteTodo(snapshot.key);
        });
        newElement.appendChild(li);
      });
      //   text.appendChild(newElement);
    })
    .catch((err) => console.log(err));
}

function deleteTodo(key) {
  let deleteTodo = db.ref(`todos/${currentUser.uid}/${key}`);

  deleteTodo
    .remove()
    .than((data) => console.log(data))
    .catch((err) => console.log(err));
}
