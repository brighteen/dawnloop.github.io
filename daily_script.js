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
        listItem.textContent = `#${index + 1} - ${daily}`;
        list.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", displayDaily);
