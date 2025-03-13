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
    let taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = "";

    let taskList = document.createElement("ul")

    tasks.forEach(task => {
        let taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });

    taskContainer.appendChild(taskElement);

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
    let taskElement = document.createElement("li");
    let taskSpan = document.createElement("span");

    taskSpan.textContent = taskText;
    taskElement.textContent = taskText;
    taskSpan.addEventListener("click",function(){
        let newText = prompt("Edit task:",taskElement.textContent)
        if (newText && newText.trim() !=="") {
            taskSpan.textContent = newText;
            updateTasksInStorage(taskText, newText);
        }
    });

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        taskElement.remove();
        deleteTaskFromStorage(taskText);
    });

    taskElement.appendChild(taskSpan);
    taskElement.appendChild(deleteButton);
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

function deleteTaskFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let updateTasks = tasks.filter(task => task!==taskText);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
}