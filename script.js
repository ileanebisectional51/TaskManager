const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <div class="actions">
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">X</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    const text = input.value.trim();

    if (text === "") return alert("Enter a task");

    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();

    input.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

renderTasks();