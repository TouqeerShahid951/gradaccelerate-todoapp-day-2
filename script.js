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
    let taskElement = createTaskElement(taskText);

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
        let taskElement = createTaskElement(task);
        taskContainer.appendChild(taskElement);
    });
}

function createTaskElement(taskText) {
    let taskElement = document.createElement("p");
    taskElement.textContent = taskText;
    taskElement.addEventListener("click",function(){
        let newText = prompt("Edit task:",taskElement.textContent)
        if (newText && newText.trim() !=="") {
            taskElement.textContent = newText;
            updateTasksInStorage(taskText, newText);
        }
    });
    return taskElement;
}
function updateTasksInStorage(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let index = tasks.indexOf(oldTask);

    if (index > -1) {
        tasks[index] = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
