const todolist = document.getElementById("todo-list");
const user = JSON.parse(localStorage.getItem("user"));
if(!user)
   location = 'login.html'
const addBtn = document.querySelector(".add");
const newTodoInput = document.querySelector("input");
const completedCount = document.getElementById("tasks-counter");
const userId = user.userId;
const roles = document.querySelector("[role]").children;
let todos = [];
function getTodos() {
  axios
    .get(`https://todos-backend-1-w8je.onrender.com/todos/${userId}`)
    .then((res) => {
      todos = res.data.todos;
      buildUI(todos);
    })
    .catch(() => {
      todos = [];
      buildUI(todos);
    });
}
getTodos();
function buildUI(todos = []) {
  todolist.innerHTML = "";
  let count = 0;
  for (let i = 0; i < todos.length; i++) {
    const todo = `<div class="todo-item p-4 ${
      todos[i].completed ? "completed" : ""
    } flex items-center" id=${todos[i].id}>
    ${todos[i].completed ? '<i class="fa-solid fa-check text-green-600"></i>' : '<i class="fa-solid fa-spinner text-blue-600"></i>'}
        <span class="todo-text ml-3 flex-1 cursor-pointer" onclick = 'complete(${todos[i].id})'>${todos[i].title}</span>
        <div class="flex space-x-2">
            <button class="edit-todo-btn w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary" onclick='update(${
              todos[i].id
            })'>
                <i class="ri-pencil-line"></i>
            </button>
            <button class="delete-todo-btn w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500" onclick='deleteTodo(${
              todos[i].id
            } , ${todos[i].userId})'>
                <i class="ri-delete-bin-line"></i>
            </button>
        </div>
    </div>
    `;
    if (todos[i].completed) count++;
    completedCount.innerHTML = count;
    todolist.innerHTML += todo;
  }
}
for (let i = 0; i < roles.length; i++) {
  roles[i].onclick = () => {
    roles[i].classList.add("bg-primary", "text-white");
    roles[i].classList.remove(
      "bg-white",
      "text-gray-700",
      "hover:bg-gray-50",
      "border-y",
      "border-r",
      "border-gray-300"
    );
    for (let j = 0; j < roles.length; j++) {
      if (i !== j) {
        roles[j].classList.remove("bg-primary", "text-white");
        roles[j].classList.add(
          "bg-white",
          "text-gray-700",
          "hover:bg-gray-50",
          "border-y",
          "border-r",
          "border-gray-300"
        );
      }
    }
    if (i === 0) buildUI(todos);
    else if (i == 1) {
      const incompleted = todos.filter((todo) => !todo.completed);
      console.log(incompleted);
      buildUI(incompleted);
    } else {
      const completedTodos = todos.filter((todo) => todo.completed);
      console.log(completedTodos);
      buildUI(completedTodos);
    }
  };
}
addBtn.disabled = true;
addBtn.style.background = "gray";
document.getElementById("user-name").innerHTML = user.username;
buildUI(todos);
newTodoInput.addEventListener("input", () => {
  if (newTodoInput.value.length > 0) {
    addBtn.disabled = false;
    addBtn.style.background = "";
  } else {
    addBtn.disabled = true;
    addBtn.style.background = "gray";
  }
});

addBtn.onclick = () => {
  const newTodoText = newTodoInput.value;
  axios
    .post("https://todos-backend-1-w8je.onrender.com/todos", {
      userId,
      title: newTodoText,
    })
    .then(() => {
      alertify.success("New Todo Added");
      getTodos();
    })
    .catch(() => alertify.error("Failed To Add"));
  newTodoInput.value = "";
};

function update(id) {
  const todo = todos.find((t) => t.id == id);
  alertify.prompt(
    "This is a prompt dialog.",
    todo.title,
    function (evt, value) {
      axios
        .put(`https://todos-backend-1-w8je.onrender.com/todos/${id}`, { title: value })
        .then(() => {
          alertify.success("Success update");
          getTodos();
        })
        .catch(() => alertify.error("Failed Update"));
    },
    function () {
      alertify.error("Cancel");
    }
  );
}
function deleteTodo(id, userId) {
  const todo = todos.find((t) => t.id == id);

  alertify.confirm(
    `Are You Sure To delete "${todo.title}"? `,
    function () {
      axios
        .delete(`https://todos-backend-1-w8je.onrender.com/todos/${id}`, {
          data: { userId },
        })
        .then(() => {
          alertify.success("Success Delete");
          getTodos();
        })
        .catch(() => alertify.error("Failed Delete"));
    },
    function () {
      alertify.error("Cancel");
    }
  );
}
function complete(id) {
  const todo = todos.find((t) => t.id == id);

  axios
    .put(`https://todos-backend-1-w8je.onrender.com/todos/${id}`, { completed: !todo.completed })
    .then(() => {
      alertify.success("Success update");
      getTodos();
    })
    .catch(() => alertify.error("Failed Update"));
}
