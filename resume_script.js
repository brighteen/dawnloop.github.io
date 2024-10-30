function saveResume() {
    const content = document.getElementById("resume-content").value;
    localStorage.setItem("resume", content); // 로컬 스토리지에 저장
    displayResume();
}

function displayResume() {
    const savedContent = localStorage.getItem("resume");
    document.getElementById("saved-resume").innerText = savedContent || "저장된 내용이 없습니다.";
}

document.addEventListener("DOMContentLoaded", displayResume);
