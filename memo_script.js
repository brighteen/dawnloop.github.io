function saveMemo() {
    const content = document.getElementById("memo-content").value;
    const memos = JSON.parse(localStorage.getItem("memos")) || [];
    memos.push(content);
    localStorage.setItem("memos", JSON.stringify(memos));
    document.getElementById("memo-content").value = "";
    displayMemo();
}

function displayMemo() {
    const memos = JSON.parse(localStorage.getItem("memos")) || [];
    const list = document.getElementById("saved-memo");
    list.innerHTML = "";

    memos.forEach((memo, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `#${index + 1} - ${memo}`;
        list.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", displayMemo);
