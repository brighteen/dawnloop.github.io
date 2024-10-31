document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById("main-content");

    // 글 작성 폼 표시
    function showEditForm(postIndex = null) {
        mainContent.innerHTML += `
            <div id="post-form">
                <h2>${postIndex === null ? "글 작성" : "글 수정"}</h2>
                <input type="text" id="note-title" placeholder="제목"><br>
                <textarea id="note-content" placeholder="내용을 작성하세요..."></textarea><br>
                <button id="save-note-post">저장</button>
                <button onclick="cancelEdit()">취소</button>
            </div>
        `;

        // 기존 글 수정 시, 기존 제목과 내용 로드
        if (postIndex !== null) {
            const posts = JSON.parse(localStorage.getItem("note")) || [];
            document.getElementById("note-title").value = posts[postIndex].title;
            document.getElementById("note-content").value = posts[postIndex].content;
        }

        document.getElementById("save-note-post").addEventListener("click", function() {
            saveNotePost(postIndex);
        });
    }

    // 글 저장 기능
    function saveNotePost(postIndex = null) {
        const title = document.getElementById("note-title").value;
        const content = document.getElementById("note-content").value;

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
        loadNoteList();
    }

    // 글 목록 불러오기
    function loadNoteList() {
        const posts = JSON.parse(localStorage.getItem("note")) || [];
        const list = document.getElementById("saved-note");
        list.innerHTML = posts.map((post, index) => `
            <li>
                <strong>${post.title}</strong> - ${post.content}
                <button onclick="showEditForm(${index})">수정</button>
                <button onclick="deleteNotePost(${index})">삭제</button>
            </li>
        `).join("");
    }

    // 글 삭제 기능
    function deleteNotePost(index) {
        const posts = JSON.parse(localStorage.getItem("note"));
        posts.splice(index, 1);
        localStorage.setItem("note", JSON.stringify(posts));
        loadNoteList();
    }

    // 글 작성 취소 기능
    function cancelEdit() {
        const form = document.getElementById("post-form");
        if (form) form.remove();
    }

    // 글 작성 버튼 이벤트 등록
    document.getElementById("new-note-post").addEventListener("click", () => showEditForm());

    // 페이지 로드 시 기존 글 목록 표시
    loadNoteList();
});
