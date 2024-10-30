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
        listItem.textContent = `#${index + 1} - ${entry}`;
        list.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", displayEnglish);
