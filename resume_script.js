// 글을 저장하는 함수
function saveResume() {
    const content = document.getElementById("resume-content").value;
    const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
    resumes.push(content); 
    localStorage.setItem("resumes", JSON.stringify(resumes));
    document.getElementById("resume-content").value = "";
    displayResume();
}

// 글 목록을 화면에 표시하는 함수
function displayResume() {
    const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
    const list = document.getElementById("saved-resume");
    list.innerHTML = "";

    resumes.forEach((resume, index) => {
        const listItem = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.textContent = `#${index + 1} - ${resume}`;
        
        // 수정 버튼 생성
        const editButton = document.createElement("button");
        editButton.textContent = "수정";
        editButton.onclick = function() {
            editResume(index);
        };

        listItem.appendChild(textSpan);
        listItem.appendChild(editButton);
        list.appendChild(listItem);
    });
}

// 수정 기능 함수
function editResume(index) {
    const resumes = JSON.parse(localStorage.getItem("resumes"));
    const newContent = prompt("수정할 내용을 입력하세요:", resumes[index]);
    if (newContent !== null) {
        resumes[index] = newContent;
        localStorage.setItem("resumes", JSON.stringify(resumes));
        displayResume();
    }
}

document.addEventListener("DOMContentLoaded", displayResume);
