function showPostForm() {
    const studySection = document.getElementById("main-content");
    if (!document.getElementById("post-form")) { // 중복 폼 생성 방지
        studySection.innerHTML += `
            <div id="post-form">
                <input type="text" id="study-title" placeholder="제목"><br>
                <textarea id="study-content" placeholder="공부한 내용을 작성하세요..."></textarea><br>
                <button id="save-study-post">글 저장</button>
            </div>
        `;
        document.getElementById("save-study-post").addEventListener("click", saveStudyPost);
    }
}

function saveStudyPost() {
    const title = document.getElementById("study-title").value;
    const content = document.getElementById("study-content").value;

    if (!title || !content) {
        alert("제목과 내용을 입력해주세요.");
        return;
    }

    const posts = JSON.parse(localStorage.getItem("study")) || [];
    posts.push({ title, content });
    localStorage.setItem("study", JSON.stringify(posts));
    displayStudyPosts();

    // 입력 필드 초기화 및 폼 제거
    document.getElementById("post-form").remove();
}

function displayStudyPosts() {
    const posts = JSON.parse(localStorage.getItem("study")) || [];
    const list = document.getElementById("saved-study");
    list.innerHTML = posts.map((post, index) => `
        <li onclick="viewStudyPost(${index})">
            <strong>${post.title}</strong>
        </li>
    `).join("");
}

function viewStudyPost(index) {
    const posts = JSON.parse(localStorage.getItem("study"));
    const post = posts[index];
    document.getElementById("main-content").innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <button onclick="editStudyPost(${index})">수정</button>
        <button onclick="deleteStudyPost(${index})">삭제</button>
        <button onclick="loadContent('study')">목록으로 돌아가기</button>
    `;
}

function editStudyPost(index) {
    const posts = JSON.parse(localStorage.getItem("study"));
    const post = posts[index];
    document.getElementById("main-content").innerHTML = `
        <h2>글 수정</h2>
        <input type="text" id="study-title" value="${post.title}"><br>
        <textarea id="study-content">${post.content}</textarea><br>
        <button onclick="saveEditedStudyPost(${index})">저장</button>
        <button onclick="loadContent('study')">취소</button>
    `;
}

function saveEditedStudyPost(index) {
    const posts = JSON.parse(localStorage.getItem("study"));
    posts[index].title = document.getElementById("study-title").value;
    posts[index].content = document.getElementById("study-content").value;
    localStorage.setItem("study", JSON.stringify(posts));
    loadContent('study');
}

function deleteStudyPost(index) {
    const posts = JSON.parse(localStorage.getItem("study"));
    posts.splice(index, 1);
    localStorage.setItem("study", JSON.stringify(posts));
    loadContent('study');
}

displayStudyPosts(); // 초기 글 목록 표시
