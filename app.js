document.addEventListener("DOMContentLoaded", function() {
    const resumeContent = document.getElementById("resume-content");
    const resumeDisplay = document.getElementById("resume-display");
    const editButton = document.getElementById("edit-resume");
    const saveButton = document.getElementById("save-resume");

    // Resume 내용 불러오기
    function loadResume() {
        const savedContent = localStorage.getItem("resumeContent") || "소개 내용을 작성해 주세요.";
        resumeDisplay.textContent = savedContent;
        resumeContent.value = savedContent;
    }

    // 수정 모드 활성화
    function enableEditMode() {
        resumeDisplay.style.display = "none";
        resumeContent.style.display = "block";
        editButton.style.display = "none";
        saveButton.style.display = "inline";
    }

    // Resume 저장 기능
    function saveResume() {
        const content = resumeContent.value;
        localStorage.setItem("resumeContent", content);
        resumeDisplay.textContent = content;

        resumeDisplay.style.display = "block";
        resumeContent.style.display = "none";
        editButton.style.display = "inline";
        saveButton.style.display = "none";

        alert("Resume이 저장되었습니다.");
    }

    editButton.addEventListener("click", enableEditMode);
    saveButton.addEventListener("click", saveResume);

    loadResume();
});

// loadContent 함수 추가
function loadContent(category) {
    const content = document.getElementById('content');
    
    switch (category) {
        case 'home':
            content.innerHTML = '<p>홈 화면에 오신 것을 환영합니다!</p>';
            break;
        case 'category1':
            content.innerHTML = '<p>카테고리 1의 내용입니다.</p>';
            break;
        case 'category2':
            content.innerHTML = '<p>카테고리 2의 내용입니다.</p>';
            break;
        case 'category3':
            content.innerHTML = '<p>카테고리 3의 내용입니다.</p>';
            break;
        default:
            content.innerHTML = '<p>오류: 해당 콘텐츠를 찾을 수 없습니다.</p>';
    }
}