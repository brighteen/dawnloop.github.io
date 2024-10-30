function saveEnglish() {
    const content = document.getElementById("english-content").value;
    const englishEntries = JSON.parse(localStorage.getItem("englishEntries")) || [];
    englishEntries.push(content);
    localStorage.setItem("englishEntries", JSON.stringify(englishEntries));
    document.getElementById("english-content").value = "";
    displayEnglish();
}

function displayEnglish() {
    const englishEntries = JSON.parse(localStorage.getItem("englishEntries")) || [];
    const list = document.getElementById("saved-english");
    list.innerHTML = "";

    englishEntries.forEach((entry, index) => {
        const listItem = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.textContent = `#${index + 1} - ${entry}`;

        const editButton = document.createElement("button");
        editButton.textContent = "수정";
        editButton.onclick = function() {
            editEnglish(index);
        };

        listItem.appendChild(textSpan);
        listItem.appendChild(editButton);
        list.appendChild(listItem);
    });
}

function editEnglish(index) {
    const englishEntries = JSON.parse(localStorage.getItem("englishEntries"));
    const newContent = prompt("수정할 내용을 입력하세요:", englishEntries[index]);
    if (newContent !== null) {
        englishEntries[index] = newContent;
        localStorage.setItem("englishEntries", JSON.stringify(englishEntries));
        displayEnglish();
    }
}

document.addEventListener("DOMContentLoaded", displayEnglish);
