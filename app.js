document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById("main-content");

    function loadContent(category) {
        switch (category) {
            case 'resume':
                mainContent.innerHTML = `
                    <h2>Resume</h2>
                    <p id="resume-display"></p>
                    <textarea id="resume-content" style="display:none;" placeholder="여기에 나의 소개와 정보를 입력하세요..."></textarea><br>
                    <button id="edit-resume">수정</button>
                    <button id="save-resume" style="display:none;">저장</button>
                `;
                loadResume();
                setupResumeEvents();
                break;
            case 'study':
                mainContent.innerHTML = generatePostForm('study', '공부한 흔적');
                displayPosts('study', 'saved-study');
                break;
            case 'daily':
                mainContent.innerHTML = generatePostForm('daily', '일상');
                displayPosts('daily', 'saved-daily');
                break;
            case 'english':
                mainContent.innerHTML = generatePostForm('english', '영어 공부');
                displayPosts('english', 'saved-english');
                break;
            case 'memo':
                mainContent.innerHTML = generatePostForm('memo', '메모장');
                displayPosts('memo', 'saved-memo');
                break;
            default:
                mainContent.innerHTML = `<p>존재하지 않는 카테고리입니다.</p>`;
        }
    }

    function generatePostForm(category, title) {
        return `
            <h2>${title}</h2>
            <input type="text" id="${category}-title" placeholder="제목"><br>
            <textarea id="${category}-content" placeholder="${title} 내용을 작성하세요..."></textarea><br>
            <button onclick="savePost('${category}', '${category}-title', '${category}-content')">저장</button>
            <ul id="saved-${category}"></ul>`;
    }

    function savePost(category, titleId, contentId) {
        const title = document.getElementById(titleId).value;
        const content = document.getElementById(contentId).value;

        if (!title || !content) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        const posts = JSON.parse(localStorage.getItem(category)) || [];
        posts.push({ title, content });
        localStorage.setItem(category, JSON.stringify(posts));
        displayPosts(category, `saved-${category}`);

        document.getElementById(titleId).value = ""; 
        document.getElementById(contentId).value = "";
    }

    function displayPosts(category, listId) {
        const posts = JSON.parse(localStorage.getItem(category)) || [];
        const list = document.getElementById(listId);
        list.innerHTML = posts.map((post, index) => `
            <li>
                <strong>${post.title}</strong>: ${post.content} 
                <button onclick="editPost('${category}', ${index})">수정</button> 
                <button onclick="deletePost('${category}', ${index})">삭제</button>
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
            displayPosts(category, `saved-${category}`);
        }
    }

    function deletePost(category, index) {
        const posts = JSON.parse(localStorage.getItem(category));
        posts.splice(index, 1);
        localStorage.setItem(category, JSON.stringify(posts));
        displayPosts(category, `saved-${category}`);
    }

    function loadResume() {
        const savedContent = localStorage.getItem("resumeContent") || "소개 내용을 작성해 주세요.";
        document.getElementById("resume-display").innerHTML = savedContent.replace(/\n/g, "<br>");
        document.getElementById("resume-content").value = savedContent;
    }

    function setupResumeEvents() {
        document.getElementById("edit-resume").addEventListener("click", function() {
            document.getElementById("resume-display").style.display = "none";
            document.getElementById("resume-content").style.display = "block";
            document.getElementById("edit-resume").style.display = "none";
            document.getElementById("save-resume").style.display = "inline";
        });
        document.getElementById("save-resume").addEventListener("click", function() {
            const content = document.getElementById("resume-content").value;
            localStorage.setItem("resumeContent", content);
            document.getElementById("resume-display").innerHTML = content.replace(/\n/g, "<br>");
            document.getElementById("resume-display").style.display = "block";
            document.getElementById("resume-content").style.display = "none";
            document.getElementById("edit-resume").style.display = "inline";
            document.getElementById("save-resume").style.display = "none";
            alert("Resume이 저장되었습니다.");
        });
    }

    window.loadContent = loadContent;

    // 초기 로드 시 Resume 화면을 기본으로 표시
    loadContent('resume');
});
