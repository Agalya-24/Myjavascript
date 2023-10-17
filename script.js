// Retrieve tasks from local storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to update and save tasks to local storage
function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to create a new task item
function createTaskItem(taskText, isCompleted) {
  const li = document.createElement("li");
  li.innerHTML = `
        <span class="${isCompleted ? "completed" : ""}">${taskText}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        <button class="complete">${
          isCompleted ? "Uncomplete" : "Complete"
        }</button>
    `;
  return li;
}

// Function to add a new task
function addTask(taskText) {
  tasks.push({ text: taskText, completed: false });
  updateTasks();
}

// Function to display tasks
function displayTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = createTaskItem(task.text, task.completed);
    taskList.appendChild(li);

    // Add event listeners for edit, delete, and complete/uncomplete
    li.querySelector(".edit").addEventListener("click", () => editTask(index));
    li.querySelector(".delete").addEventListener("click", () =>
      deleteTask(index)
    );
    li.querySelector(".complete").addEventListener("click", () =>
      toggleComplete(index)
    );
  });
}

// Function to edit a task
function editTask(index) {
  const newTaskText = prompt("Edit task:", tasks[index].text);
  if (newTaskText !== null) {
    tasks[index].text = newTaskText;
    updateTasks();
    displayTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasks();
  displayTasks();
}

// Function to mark a task as completed/uncompleted
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTasks();
  displayTasks();
}

// Event listener to add a new task
document.getElementById("add-task").addEventListener("click", () => {
  const taskText = document.getElementById("task").value;
  if (taskText) {
    addTask(taskText);
    document.getElementById("task").value = "";
    displayTasks();
  }
});

// Initial display of tasks
displayTasks();
