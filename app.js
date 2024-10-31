document.addEventListener("DOMContentLoaded", function() {
    const resumeContent = document.getElementById("resume-content");
    const resumeDisplay = document.getElementById("resume-display");
    const editButton = document.getElementById("edit-resume");
    const saveButton = document.getElementById("save-resume");

    // 카테고리별 내용 로드 함수
    function loadContent(category) {
        const mainContent = document.getElementById("main-content");

        switch (category) {
            case 'resume':
                loadResume();
                mainContent.innerHTML = `
                    <h2>Resume</h2>
                    <p id="resume-display"></p>
                    <textarea id="resume-content" style="display:none;" placeholder="여기에 나의 소개와 정보를 입력하세요..."></textarea><br>
                    <button id="edit-resume">수정</button>
                    <button id="save-resume" style="display:none;">저장</button>
                `;
                setupResumeEvents();
                break;
            case 'study':
                mainContent.innerHTML = `<h2>공부한 흔적</h2><p>공부한 내용을 여기에 추가할 수 있습니다.</p>`;
                break;
            case 'daily':
                mainContent.innerHTML = `<h2>일상</h2><p>일상 기록을 여기에 추가할 수 있습니다.</p>`;
                break;
            case 'english':
                mainContent.innerHTML = `<h2>영어 공부</h2><p>영어 공부 내용을 여기에 추가할 수 있습니다.</p>`;
                break;
            case 'memo':
                mainContent.innerHTML = `<h2>메모장</h2><p>메모를 여기에 추가할 수 있습니다.</p>`;
                break;
            case 'guestbook':
                mainContent.innerHTML = `<h2>방명록</h2><p>방명록을 여기에 추가할 수 있습니다.</p>`;
                break;
            default:
                mainContent.innerHTML = `<p>존재하지 않는 카테고리입니다.</p>`;
        }
    }

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

    function setupResumeEvents() {
        document.getElementById("edit-resume").addEventListener("click", enableEditMode);
        document.getElementById("save-resume").addEventListener("click", saveResume);
    }

    // 초기 로드
    loadResume();
    setupResumeEvents();

    // 전역에서 사용 가능하게 설정
    window.loadContent = loadContent;
});
