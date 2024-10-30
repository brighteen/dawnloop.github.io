// resume 데이터를 배열로 저장하고 불러오기
function saveResume() {
    const content = document.getElementById("resume-content").value;
    const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
    resumes.push(content); // 새 글 추가
    localStorage.setItem("resumes", JSON.stringify(resumes)); // 배열을 문자열로 저장
    document.getElementById("resume-content").value = ""; // 입력 칸 초기화
    displayResume();
}

// 저장된 내용을 화면에 표시
function displayResume() {
    const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
    const list = document.getElementById("saved-resume");
    list.innerHTML = ""; // 리스트 초기화

    resumes.forEach((resume, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `#${index + 1} - ${resume}`;
        list.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", displayResume);
