document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");

    // 할 일 추가 기능
    addButton.addEventListener("click", function() {
        console.log("Add button clicked");  // Add 버튼 클릭 시 콘솔에 메시지 출력
        const taskText = input.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            input.value = "";
        }
    });
    

    // Enter 키로 할 일 추가
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addButton.click();
        }
    });

    // 할 일 항목 추가 함수
    function addTask(taskText) {
        const listItem = document.createElement("li");
        listItem.classList.add("todo-item");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskSpan.addEventListener("click", function() {
            listItem.classList.toggle("completed");
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function() {
            todoList.removeChild(listItem);
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    }
});
