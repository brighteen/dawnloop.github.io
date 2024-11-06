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
            document.getElementById("new-note-post").addEventListener("click", () => showNoteForm());
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
        const existingForm = document.getElementById("note-form");
        if (existingForm) existingForm.remove();

        mainContent.innerHTML += `
            <div id="note-form">
                <input type="text" id="note-title" placeholder="제목"><br>
                <textarea id="note-content" placeholder="내용을 작성하세요..."></textarea><br>
                <button id="save-note">저장</button>
                <button onclick="cancelNoteForm()">취소</button>
            </div>
        `;

        document.getElementById("save-note").addEventListener("click", function() {
            saveNotePost();
        });
    }

    function saveNotePost() {
        const title = document.getElementById("note-title").value;
        const content = document.getElementById("note-content").value;

        if (!title || !content) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        const posts = JSON.parse(localStorage.getItem("note")) || [];
        posts.push({ title, content });
        localStorage.setItem("note", JSON.stringify(posts));
        displayNotePosts();

        const form = document.getElementById("note-form");
        if (form) form.remove();
    }

    function displayNotePosts() {
        const posts = JSON.parse(localStorage.getItem("note")) || [];
        const list = document.getElementById("saved-note");
        list.innerHTML = posts.map((post, index) => `
            <li class="clickable-note" onclick="showNoteDetail(${index})">
                <strong>${post.title}</strong> - ${post.content}
            </li>
        `).join("");
    }

    function cancelNoteForm() {
        const form = document.getElementById("note-form");
        if (form) form.remove();
    }

    // 전역 객체에 함수 추가
    window.loadContent = loadContent;
    window.showNoteForm = showNoteForm;
    window.showNoteDetail = showNoteDetail;

    loadContent('resume');
});
