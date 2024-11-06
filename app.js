document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById("main-content");

    function loadContent(category) {
        if (category === 'resume') {
            mainContent.innerHTML = `
                <h2>Resume</h2>
                <p id="resume-display"></p>
                <textarea id="resume-content" style="display:none;" placeholder="여기에 나의 소개와 정보를 입력하세요..."></textarea><br>
                <button id="edit-resume">수정</button>
                <button id="save-resume" style="display:none;">저장</button>
            `;
            loadResume();
            setupResumeEvents();
        } else if (category === 'note') {
            mainContent.innerHTML = `
                <h2>Note</h2>
                <button id="new-note-post">글 작성</button>
                <ul id="saved-note"></ul>
            `;
            document.getElementById("new-note-post").addEventListener("click", showNoteForm);
            displayNotePosts();
        }
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
        });
    }

    function showNoteForm() {
        // 모든 기존 폼 제거
        const existingDetail = document.getElementById("note-detail");
        if (existingDetail) existingDetail.remove();

        const existingForm = document.getElementById("note-form");
        if (existingForm) existingForm.remove();

        // 새 글 작성 폼 추가
        mainContent.innerHTML += `
            <div id="note-form">
                <input type="text" id="note-title" placeholder="제목"><br>
                <textarea id="note-content" placeholder="내용을 작성하세요..."></textarea><br>
                <button id="save-note">저장</button>
                <button onclick="cancelNoteForm()">취소</button>
            </div>
        `;

        // "저장" 버튼 이벤트 리스너 설정
        document.getElementById("save-note").addEventListener("click", saveNotePost);
    }

    function showNoteDetail(index) {
        const posts = JSON.parse(localStorage.getItem("note")) || [];
        const post = posts[index];

        // 모든 기존 폼 제거
        const existingDetail = document.getElementById("note-detail");
        if (existingDetail) existingDetail.remove();

        const existingForm = document.getElementById("note-form");
        if (existingForm) existingForm.remove();

        mainContent.innerHTML += `
            <div id="note-detail">
                <input type="text" id="note-title" value="${post.title}"><br>
                <textarea id="note-content">${post.content}</textarea><br>
                <button id="save-note">수정</button>
                <button id="delete-note">삭제</button>
                <button onclick="cancelNoteDetail()">취소</button>
            </div>
        `;

        document.getElementById("save-note").addEventListener("click", function() {
            saveNotePost(index);
        });

        document.getElementById("delete-note").addEventListener("click", function() {
            deleteNotePost(index);
        });

        // 항상 "글 작성" 버튼이 작동하도록 이벤트 리스너 재설정
        document.getElementById("new-note-post").addEventListener("click", showNoteForm);
    }

    function saveNotePost(postIndex = null) {
        const title = document.getElementById("note-title").value.trim();
        const content = document.getElementById("note-content").value.trim();

        if (!title || !content) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        const posts = JSON.parse(localStorage.getItem("note")) || [];
        if (postIndex === null) {
            posts.push({ title, content });
        } else {
            posts[postIndex] = { title, content };
        }

        localStorage.setItem("note", JSON.stringify(posts));
        displayNotePosts();

        const form = document.getElementById("note-form");
        if (form) form.remove();

        const detail = document.getElementById("note-detail");
        if (detail) detail.remove();
    }

    function displayNotePosts() {
        const posts = JSON.parse(localStorage.getItem("note")) || [];
        const list = document.getElementById("saved-note");
        list.innerHTML = posts.map((post, index) => `
            <li class="clickable-note" onclick="showNoteDetail(${index})">
                <strong>${post.title}</strong> - ${post.content}
            </li>
        `).join("");

        // 항상 "글 작성" 버튼이 작동하도록 이벤트 리스너 재설정
        document.getElementById("new-note-post").addEventListener("click", showNoteForm);
    }

    function deleteNotePost(index) {
        const posts = JSON.parse(localStorage.getItem("note"));
        posts.splice(index, 1);
        localStorage.setItem("note", JSON.stringify(posts));
        displayNotePosts();

        const detail = document.getElementById("note-detail");
        if (detail) detail.remove();
    }

    function cancelNoteForm() {
        const form = document.getElementById("note-form");
        if (form) form.remove();

        // 항상 "글 작성" 버튼이 작동하도록 이벤트 리스너 재설정
        document.getElementById("new-note-post").addEventListener("click", showNoteForm);
    }

    function cancelNoteDetail() {
        const detail = document.getElementById("note-detail");
        if (detail) detail.remove();

        // 항상 "글 작성" 버튼이 작동하도록 이벤트 리스너 재설정
        document.getElementById("new-note-post").addEventListener("click", showNoteForm);
    }

    // 전역 객체에 함수 추가
    window.loadContent = loadContent;
    window.showNoteForm = showNoteForm;
    window.showNoteDetail = showNoteDetail;
    window.displayNotePosts = displayNotePosts;
    window.cancelNoteDetail = cancelNoteDetail;

    loadContent('resume');
});
