// ------***********---------------------

const addItemBtn = document.querySelector(".fa-plus");
const todoListul = document.querySelector(".todoList ul");
const inputValue = document.getElementById("addTodo");
const happyMsg = document.querySelector(".getDate");
const createLi = document.querySelectorAll(".createLi");
// ------***********---------------------

let todos = [];

const createTask = (e) => {
  if (!inputValue.value.trim()) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The input field cannot be empty.",
    });
  } else if (
    todos.some((todo) => todo.text === inputValue.value.trim().toLowerCase())
  ) {
    Swal.fire({
      icon: "warning",
      title: "Duplicate Task",
      text: "This task already exists!",
    });
  } else {
    let createLi = document.createElement("li");
    createLi.className = "createLi";
    todoListul.appendChild(createLi);
    createLi.innerHTML = `
    <div class="checkbox-wrapper-39">
  <label>
    <input type="checkbox"  class ="checkbx" />
    <span class="checkbox"></span>
  </label>
</div>
   <span class="todoText">${inputValue.value}</span> <i id="remove" style="display:none" class="fa-solid fa-trash-can"></i>  `;
    if ((e.target = "fa-plus")) {
      todos.push({
        text: inputValue.value,
        cheq: false,
        line: false,
        trash: false,
      });
      localStorage.setItem("todos", JSON.stringify(todos));
      inputValue.value = "";
    }
  }
};

todoListul.addEventListener("change", (e) => {
  if (e.target.classList.contains("checkbx")) {
    const liElement = e.target.closest("li");
    const liText = liElement.querySelector(".todoText");
    const removeBtn = liElement.querySelector(".fa-trash-can");

    const index = Array.from(todoListul.children).indexOf(liElement);

    todos[index].line = e.target.checked;
    todos[index].trash = e.target.checked;

    if (e.target.checked) {
      liText.style.textDecoration = todos[index].line ? "line-through" : "none";
      liText.style.color = "gray";
      removeBtn.style.display = todos[index].trash ? "flex" : "none";
      removeBtn.style.cursor = "pointer";
      todos[index].cheq = true;
    } else {
      liText.style.color = "black";
      liText.style.textDecoration = todos[index].line ? "none" : "line-through";
      liText.style.textDecoration = "none";
      removeBtn.style.cursor = "pointer";
      removeBtn.style.display = todos[index].trash ? "flex" : "none";
      todos[index].cheq = false;
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
});

todoListul.addEventListener("click", (e) => {
  const removeLi = e.target.closest("li");
  if (e.target.id === "remove") {
    const index = Array.from(todoListul.children).indexOf(removeLi);
    removeLi.remove();
    todos.splice(index, 1);
  }
  localStorage.setItem("todos", JSON.stringify(todos));
});

function getHappyDayMessage() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const dayName = days[date.getDay()];

  happyMsg.textContent = `Hello ${dayName}😍`;
}
getHappyDayMessage();

addItemBtn.addEventListener("click", createTask);
inputValue.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    createTask(e);
  }
});

function showList() {
  const savedTodos = localStorage.getItem("todos", todos);
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    todos.forEach((todoItem) => {
      const li = document.createElement("li");
      li.className = "createLi";
      li.innerHTML = `
      <div class="checkbox-wrapper-39">
      <label>
        <input type="checkbox" class ="checkbx" ${
          todoItem.cheq ? "checked" : ""
        } />
        <span class="checkbox" "></span>
      </label>
    </div>
       <span class="todoText" style="text-decoration:${
         todoItem.line ? "line-through" : "none"
       } ">
       ${todoItem.text}</span> <i id="remove" style="display: ${
        todoItem.trash ? "flex" : "none"
      }" class="fa-solid fa-trash-can"></i>`;
      todoListul.appendChild(li);
    });
  }
}

showList();
