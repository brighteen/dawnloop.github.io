document.addEventListener("DOMContentLoaded", function() {
    const studySection = document.getElementById("main-content");
    
    // 공부한 흔적 입력 폼 추가
    studySection.innerHTML += `
        <input type="text" id="study-title" placeholder="제목"><br>
        <textarea id="study-content" placeholder="공부한 내용을 작성하세요..."></textarea><br>
        <button onclick="saveStudy()">저장</button>
        <ul id="saved-study"></ul>
    `;

    // 글 저장 기능
    function saveStudy() {
        const title = document.getElementById("study-title").value;
        const content = document.getElementById("study-content").value;

        if (!title || !content) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        const posts = JSON.parse(localStorage.getItem("study")) || [];
        posts.push({ title, content });
        localStorage.setItem("study", JSON.stringify(posts));
        displayStudy();

        // 입력 필드 초기화
        document.getElementById("study-title").value = "";
        document.getElementById("study-content").value = "";
    }

    // 저장된 글 표시 기능
    function displayStudy() {
        const posts = JSON.parse(localStorage.getItem("study")) || [];
        const list = document.getElementById("saved-study");
        list.innerHTML = posts.map((post, index) => `
            <li>
                <strong>${post.title}</strong>: ${post.content} 
                <button onclick="editStudy(${index})">수정</button> 
                <button onclick="deleteStudy(${index})">삭제</button>
            </li>
        `).join("");
    }

    // 글 수정 기능
    function editStudy(index) {
        const posts = JSON.parse(localStorage.getItem("study"));
        const newTitle = prompt("수정할 제목을 입력하세요:", posts[index].title);
        const newContent = prompt("수정할 내용을 입력하세요:", posts[index].content);
        if (newTitle !== null && newContent !== null) {
            posts[index].title = newTitle;
            posts[index].content = newContent;
            localStorage.setItem("study", JSON.stringify(posts));
            displayStudy();
        }
    }

    // 글 삭제 기능
    function deleteStudy(index) {
        const posts = JSON.parse(localStorage.getItem("study"));
        posts.splice(index, 1);
        localStorage.setItem("study", JSON.stringify(posts));
        displayStudy();
    }

    // 페이지 로드 시 저장된 글 표시
    displayStudy();
});
