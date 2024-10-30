function saveDaily() {
    const content = document.getElementById("daily-content").value;
    const dailies = JSON.parse(localStorage.getItem("dailies")) || [];
    dailies.push(content);
    localStorage.setItem("dailies", JSON.stringify(dailies));
    document.getElementById("daily-content").value = "";
    displayDaily();
}

function displayDaily() {
    const dailies = JSON.parse(localStorage.getItem("dailies")) || [];
    const list = document.getElementById("saved-daily");
    list.innerHTML = "";

    dailies.forEach((daily, index) => {
        const listItem = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.textContent = `#${index + 1} - ${daily}`;

        const editButton = document.createElement("button");
        editButton.textContent = "수정";
        editButton.onclick = function() {
            editDaily(index);
        };

        listItem.appendChild(textSpan);
        listItem.appendChild(editButton);
        list.appendChild(listItem);
    });
}

function editDaily(index) {
    const dailies = JSON.parse(localStorage.getItem("dailies"));
    const newContent = prompt("수정할 내용을 입력하세요:", dailies[index]);
    if (newContent !== null) {
        dailies[index] = newContent;
        localStorage.setItem("dailies", JSON.stringify(dailies));
        displayDaily();
    }
}

document.addEventListener("DOMContentLoaded", displayDaily);
