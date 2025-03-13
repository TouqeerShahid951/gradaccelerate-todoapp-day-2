document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
    document.getElementById("addTask").addEventListener("click", addTodo);
    });

function addTodo() {
    let inputField = document.getElementById("input");
    let taskText = inputField.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let taskContainer = document.getElementById("taskContainer");
    let taskElement = document.createElement("p");
    taskElement.textContent = taskText;

    taskContainer.appendChild(taskElement);
    saveTask(taskText);
    inputField.value = "";
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskContainer = document.getElementById("taskContainer");

    tasks.forEach(task => {
        let taskElement = document.createElement("p");
        taskElement.textContent = task;
        taskContainer.appendChild(taskElement);
    });
}