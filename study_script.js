function saveStudy() {
    const content = document.getElementById("study-content").value;
    const studies = JSON.parse(localStorage.getItem("studies")) || [];
    studies.push(content);
    localStorage.setItem("studies", JSON.stringify(studies));
    document.getElementById("study-content").value = "";
    displayStudy();
}

function displayStudy() {
    const studies = JSON.parse(localStorage.getItem("studies")) || [];
    const list = document.getElementById("saved-study");
    list.innerHTML = "";

    studies.forEach((study, index) => {
        const listItem = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.textContent = `#${index + 1} - ${study}`;

        const editButton = document.createElement("button");
        editButton.textContent = "수정";
        editButton.onclick = function() {
            editStudy(index);
        };

        listItem.appendChild(textSpan);
        listItem.appendChild(editButton);
        list.appendChild(listItem);
    });
}

function editStudy(index) {
    const studies = JSON.parse(localStorage.getItem("studies"));
    const newContent = prompt("수정할 내용을 입력하세요:", studies[index]);
    if (newContent !== null) {
        studies[index] = newContent;
        localStorage.setItem("studies", JSON.stringify(studies));
        displayStudy();
    }
}

document.addEventListener("DOMContentLoaded", displayStudy);
