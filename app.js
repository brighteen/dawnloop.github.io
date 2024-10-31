document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById("main-content");
    const resumeContent = document.getElementById("resume-content");
    const resumeDisplay = document.getElementById("resume-display");
    const editButton = document.getElementById("edit-resume");
    const saveButton = document.getElementById("save-resume");

    // 카테고리별 내용 로드 함수
    function loadContent(category) {
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
                mainContent.innerHTML = `
                    <h2>공부한 흔적</h2>
                    <textarea id="study-content" placeholder="공부한 내용을 작성하세요..."></textarea><br>
                    <button onclick="saveStudy()">저장</button>
                    <ul id="saved-study"></ul>`;
                displayStudy();
                break;
            case 'daily':
                mainContent.innerHTML = `
                    <h2>일상</h2>
                    <textarea id="daily-content" placeholder="일상 기록을 작성하세요..."></textarea><br>
                    <button onclick="saveDaily()">저장</button>
                    <ul id="saved-daily"></ul>`;
                displayDaily();
                break;
            case 'english':
                mainContent.innerHTML = `
                    <h2>영어 공부</h2>
                    <textarea id="english-content" placeholder="영어 공부 내용을 작성하세요..."></textarea><br>
                    <button onclick="saveEnglish()">저장</button>
                    <ul id="saved-english"></ul>`;
                displayEnglish();
                break;
            case 'memo':
                mainContent.innerHTML = `
                    <h2>메모장</h2>
                    <textarea id="memo-content" placeholder="메모를 작성하세요..."></textarea><br>
                    <button onclick="saveMemo()">저장</button>
                    <ul id="saved-memo"></ul>`;
                displayMemo();
                break;
            case 'guestbook':
                mainContent.innerHTML = `<h2>방명록</h2><p>방명록을 여기에 추가할 수 있습니다.</p>`;
                break;
            default:
                mainContent.innerHTML = `<p>존재하지 않는 카테고리입니다.</p>`;
        }
    }

    function loadResume() {
        const savedContent = localStorage.getItem("resumeContent") || "소개 내용을 작성해 주세요.";
        resumeDisplay.textContent = savedContent;
        resumeContent.value = savedContent;
    }

    function enableEditMode() {
        resumeDisplay.style.display = "none";
        resumeContent.style.display = "block";
        editButton.style.display = "none";
        saveButton.style.display = "inline";
    }

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

    function saveStudy() {
        const content = document.getElementById("study-content").value;
        const studies = JSON.parse(localStorage.getItem("studies")) || [];
        studies.push(content);
        localStorage.setItem("studies", JSON.stringify(studies));
        displayStudy();
    }

    function displayStudy() {
        const studies = JSON.parse(localStorage.getItem("studies")) || [];
        const list = document.getElementById("saved-study");
        list.innerHTML = studies.map(study => `<li>${study}</li>`).join("");
    }

    function saveDaily() {
        const content = document.getElementById("daily-content").value;
        const dailies = JSON.parse(localStorage.getItem("dailies")) || [];
        dailies.push(content);
        localStorage.setItem("dailies", JSON.stringify(dailies));
        displayDaily();
    }

    function displayDaily() {
        const dailies = JSON.parse(localStorage.getItem("dailies")) || [];
        const list = document.getElementById("saved-daily");
        list.innerHTML = dailies.map(daily => `<li>${daily}</li>`).join("");
    }

    function saveEnglish() {
        const content = document.getElementById("english-content").value;
        const englishEntries = JSON.parse(localStorage.getItem("englishEntries")) || [];
        englishEntries.push(content);
        localStorage.setItem("englishEntries", JSON.stringify(englishEntries));
        displayEnglish();
    }

    function displayEnglish() {
        const englishEntries = JSON.parse(localStorage.getItem("englishEntries")) || [];
        const list = document.getElementById("saved-english");
        list.innerHTML = englishEntries.map(entry => `<li>${entry}</li>`).join("");
    }

    function saveMemo() {
        const content = document.getElementById("memo-content").value;
        const memos = JSON.parse(localStorage.getItem("memos")) || [];
        memos.push(content);
        localStorage.setItem("memos", JSON.stringify(memos));
        displayMemo();
    }

    function displayMemo() {
        const memos = JSON.parse(localStorage.getItem("memos")) || [];
        const list = document.getElementById("saved-memo");
        list.innerHTML = memos.map(memo => `<li>${memo}</li>`).join("");
    }

    loadResume();
    setupResumeEvents();
    window.loadContent = loadContent;
});
