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
        const textSpan = document.createElement("span");
        textSpan.textContent = `#${index + 1} - ${memo}`;

        const editButton = document.createElement("button");
        editButton.textContent = "수정";
        editButton.onclick = function() {
            editMemo(index);
        };

        listItem.appendChild(textSpan);
        listItem.appendChild(editButton);
        list.appendChild(listItem);
    });
}

function editMemo(index) {
    const memos = JSON.parse(localStorage.getItem("memos"));
    const newContent = prompt("수정할 내용을 입력하세요:", memos[index]);
    if (newContent !== null) {
        memos[index] = newContent;
        localStorage.setItem("memos", JSON.stringify(memos));
        displayMemo();
    }
}

document.addEventListener("DOMContentLoaded", displayMemo);
