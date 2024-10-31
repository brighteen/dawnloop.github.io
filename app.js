document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById("main-content");

    function loadContent(category) {
        switch (category) {
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
            default:
                mainContent.innerHTML = `<p>존재하지 않는 카테고리입니다.</p>`;
        }
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
    
        // 디버깅용 콘솔 출력
        console.log(`${category}에 저장된 데이터:`, posts);
    
        displayFunction();
        document.getElementById(titleId).value = ""; // 입력 필드 초기화
        document.getElementById(contentId).value = ""; // 입력 필드 초기화
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

    // 저장 후 입력 필드 초기화 추가
    window.loadContent = loadContent;
});
