document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById("main-content");
    const resumeContent = document.getElementById("resume-content");
    const resumeDisplay = document.getElementById("resume-display");
    const editButton = document.getElementById("edit-resume");
    const saveButton = document.getElementById("save-resume");

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
                    <input type="text" id="study-title" placeholder="제목"><br>
                    <textarea id="study-content" placeholder="공부한 내용을 작성하세요..."></textarea><br>
                    <button onclick="saveStudy()">저장</button>
                    <ul id="saved-study"></ul>`;
                displayStudy();
                break;
            case 'daily':
                mainContent.innerHTML = `
                    <h2>일상</h2>
                    <input type="text" id="daily-title" placeholder="제목"><br>
                    <textarea id="daily-content" placeholder="일상 기록을 작성하세요..."></textarea><br>
                    <button onclick="saveDaily()">저장</button>
                    <ul id="saved-daily"></ul>`;
                displayDaily();
                break;
            case 'english':
                mainContent.innerHTML = `
                    <h2>영어 공부</h2>
                    <input type="text" id="english-title" placeholder="제목"><br>
                    <textarea id="english-content" placeholder="영어 공부 내용을 작성하세요..."></textarea><br>
                    <button onclick="saveEnglish()">저장</button>
                    <ul id="saved-english"></ul>`;
                displayEnglish();
                break;
            case 'memo':
                mainContent.innerHTML = `
                    <h2>메모장</h2>
                    <input type="text" id="memo-title" placeholder="제목"><br>
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
        resumeDisplay.innerHTML = savedContent.replace(/\n/g, "<br>");
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
        resumeDisplay.innerHTML = content.replace(/\n/g, "<br>");
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

    function savePost(category, titleId, contentId, displayFunction) {
        const title = document.getElementById(titleId).value;
        const content = document.getElementById(contentId).value;
        if (!title || !content) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        const posts = JSON.parse(localStorage.getItem(category)) || [];
        posts.push({ title, content });
        localStorage.setItem(category, JSON.stringify(posts));
        displayFunction();
    }

    function saveStudy() {
        savePost("studies", "study-title", "study-content", displayStudy);
    }

    function displayStudy() {
        const studies = JSON.parse(localStorage.getItem("studies")) || [];
        const studyList = document.getElementById("saved-study");
        studyList.innerHTML = studies.map((study, index) => `
            <li>
                <strong>${study.title}</strong>: ${study.content} 
                <button onclick="editPost('studies', ${index})">수정</button> 
                <button onclick="deletePost('studies', ${index})">삭제</button>
            </li>
        `).join("");
    }

    function editPost(category, index) {
        const posts = JSON.parse(localStorage.getItem(category));
        const newTitle = prompt("수정할 제목을 입력하세요:", posts[index].title);
        const newContent = prompt("수정할 내용을 입력하세요:", posts[index].content);
        if (newTitle !== null && newContent !== null) {
            posts[index].title = newTitle;
            posts[index].content = newContent;
            localStorage.setItem(category, JSON.stringify(posts));
            loadContent(category);
        }
    }

    function deletePost(category, index) {
        const posts = JSON.parse(localStorage.getItem(category));
        posts.splice(index, 1);
        localStorage.setItem(category, JSON.stringify(posts));
        loadContent(category);
    }

    function saveDaily() {
        savePost("dailies", "daily-title", "daily-content", displayDaily);
    }

    function displayDaily() {
        const dailies = JSON.parse(localStorage.getItem("dailies")) || [];
        const dailyList = document.getElementById("saved-daily");
        dailyList.innerHTML = dailies.map((daily, index) => `
            <li>
                <strong>${daily.title}</strong>: ${daily.content} 
                <button onclick="editPost('dailies', ${index})">수정</button> 
                <button onclick="deletePost('dailies', ${index})">삭제</button>
            </li>
        `).join("");
    }

    function saveEnglish() {
        savePost("englishEntries", "english-title", "english-content", displayEnglish);
    }

    function displayEnglish() {
        const englishEntries = JSON.parse(localStorage.getItem("englishEntries")) || [];
        const englishList = document.getElementById("saved-english");
        englishList.innerHTML = englishEntries.map((entry, index) => `
            <li>
                <strong>${entry.title}</strong>: ${entry.content} 
                <button onclick="editPost('englishEntries', ${index})">수정</button> 
                <button onclick="deletePost('englishEntries', ${index})">삭제</button>
            </li>
        `).join("");
    }

    function saveMemo() {
        savePost("memos", "memo-title", "memo-content", displayMemo);
    }

    function displayMemo() {
        const memos = JSON.parse(localStorage.getItem("memos")) || [];
        const memoList = document.getElementById("saved-memo");
        memoList.innerHTML = memos.map((memo, index) => `
            <li>
                <strong>${memo.title}</strong>: ${memo.content} 
                <button onclick="editPost('memos', ${index})">수정</button> 
                <button onclick="deletePost('memos', ${index})">삭제</button>
            </li>
        `).join("");
    }

    loadResume();
    setupResumeEvents();
    window.loadContent = loadContent;
});
