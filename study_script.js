function showEditForm(postIndex = null) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2>${postIndex === null ? "글 작성" : "글 수정"}</h2>
        <input type="text" id="note-title" placeholder="제목"><br>
        <textarea id="note-content" placeholder="내용을 작성하세요..."></textarea><br>
        <button id="save-note-post">저장</button>
        <button onclick="loadContent('note')">취소</button>
    `;

    if (postIndex !== null) {
        const posts = JSON.parse(localStorage.getItem("note")) || [];
        document.getElementById("note-title").value = posts[postIndex].title;
        document.getElementById("note-content").value = posts[postIndex].content;
    }

    document.getElementById("save-note-post").addEventListener("click", function() {
        saveNotePost(postIndex);
    });
}

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
    loadContent('note');
    displayNotePosts();
}

function displayNotePosts() {
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

function deleteNotePost(index) {
    const posts = JSON.parse(localStorage.getItem("note"));
    posts.splice(index, 1);
    localStorage.setItem("note", JSON.stringify(posts));
    displayNotePosts();
}

displayNotePosts();
