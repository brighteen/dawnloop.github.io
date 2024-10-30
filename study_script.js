function saveStudy() {
    const content = document.getElementById("study-content").value;
    localStorage.setItem("study", content);
    displayStudy();
}

function displayStudy() {
    const savedContent = localStorage.getItem("study");
    document.getElementById("saved-study").innerText = savedContent || "저장된 공부 내용이 없습니다.";
}

document.addEventListener("DOMContentLoaded", displayStudy);
