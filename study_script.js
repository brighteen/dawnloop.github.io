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

displayStudyPosts();
