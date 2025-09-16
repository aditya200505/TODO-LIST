const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.querySelector(".row button");

function createAndAppendTask(taskText, isChecked = false) {
    let li = document.createElement("li");
    li.textContent = taskText; // Use textContent for security
    if (isChecked) {
        li.classList.add("checked");
    }
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
}

function addTask(){
    const taskText = inputBox.value.trim();
    if(taskText === ''){
        alert("You must write something!");
        return;
    }
    createAndAppendTask(taskText);
    inputBox.value = "";
    saveData();
}

addButton.addEventListener("click", addTask);

inputBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    const tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains("checked")
        });
    });
    localStorage.setItem("data", JSON.stringify(tasks));
}
function showTask(){
    const data = localStorage.getItem("data");
    if (data) {
        JSON.parse(data).forEach(task => {
            createAndAppendTask(task.text, task.checked);
        });
    }
}
showTask();