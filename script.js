const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    let taskText = inputBox.value.trim();
    if (taskText==='') {
        alert("You must write something!");
        return;
    }
    let existingTasks = Array.from(document.querySelectorAll("#list-container li"))
                           .map(li => li.childNodes[0].textContent);
    if (existingTasks.includes(taskText)) {
        alert("Task already exists!");
        return;
    }
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    
    inputBox.value="";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    const tasks = [];
    document.querySelectorAll("#list-container li").forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent, // Store only text content
            completed: li.classList.contains("checked") // Store completion state
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    listContainer.innerHTML = "";

    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add("checked");
        }

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
    });
}
showTask();

