function saveStudy() {
    const content = document.getElementById("study-content").value;
    const studies = JSON.parse(localStorage.getItem("studies")) || [];
    studies.push(content); // 새로운 글 추가
    localStorage.setItem("studies", JSON.stringify(studies)); // 배열로 저장
    document.getElementById("study-content").value = ""; // 입력 초기화
    displayStudy();
}

function displayStudy() {
    const studies = JSON.parse(localStorage.getItem("studies")) || [];
    const list = document.getElementById("saved-study");
    list.innerHTML = ""; // 리스트 초기화

    studies.forEach((study, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `#${index + 1} - ${study}`;
        list.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", displayStudy);
