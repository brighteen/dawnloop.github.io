function showEditForm(postIndex = null) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2>${postIndex === null ? "글 작성" : "글 수정"}</h2>
        <input type="text" id="study-title" placeholder="제목"><br>
        <textarea id="study-content" placeholder="공부한 내용을 작성하세요..."></textarea><br>
        <button id="save-study-post">저장</button>
        <button onclick="loadContent('study')">취소</button>
    `;

    if (postIndex !== null) {
        const posts = JSON.parse(localStorage.getItem("study")) || [];
        document.getElementById("study-title").value = posts[postIndex].title;
        document.getElementById("study-content").value = posts[postIndex].content;
    }

    document.getElementById("save-study-post").addEventListener("click", function() {
        saveStudyPost(postIndex);
    });
}

function saveStudyPost(postIndex = null) {
    const title = document.getElementById("study-title").value;
    const content = document.getElementById("study-content").value;

    if (!title || !content) {
        alert("제목과 내용을 입력해주세요.");
        return;
    }

    const posts = JSON.parse(localStorage.getItem("study")) || [];
    if (postIndex === null) {
        posts.push({ title, content });
    } else {
        posts[postIndex] = { title, content };
    }
    localStorage.setItem("study", JSON.stringify(posts));
    loadContent('study');
    displayStudyPosts();
}

function displayStudyPosts() {
    const posts = JSON.parse(localStorage.getItem("study")) || [];
    const list = document.getElementById("saved-study");
    list.innerHTML = posts.map((post, index) => `
        <li>
            <strong>${post.title}</strong> - ${post.content}
            <button onclick="showEditForm(${index})">수정</button>
            <button onclick="deleteStudyPost(${index})">삭제</button>
        </li>
    `).join("");
}

function deleteStudyPost(index) {
    const posts = JSON.parse(localStorage.getItem("study"));
    posts.splice(index, 1);
    localStorage.setItem("study", JSON.stringify(posts));
    displayStudyPosts();
}

displayStudyPosts();
