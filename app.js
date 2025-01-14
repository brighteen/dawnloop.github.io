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
        // 기존 글 목록과 "글 작성" 버튼 숨기기
        document.getElementById("saved-note").style.display = "none";
        document.getElementById("new-note-post").style.display = "none";
    
        // 기존 폼 제거
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
                <button onclick="openNoteList()">목록 열기</button>
            </div>
        `;
    
        // "저장" 버튼에 이벤트 리스너 추가 (이벤트 리스너 중복 방지)
        document.getElementById("save-note").addEventListener("click", function() {
            saveNotePost(); // 새 글 작성 시 인덱스를 null로 전달
        });
    }
    
    

    function showNoteDetail(index) {
        const posts = JSON.parse(localStorage.getItem("note")) || [];
        const post = posts[index];
    
        // 글 목록 숨기기
        document.getElementById("saved-note").style.display = "none";
        document.getElementById("new-note-post").style.display = "none";
    
        // 기존 폼 제거
        const existingDetail = document.getElementById("note-detail");
        if (existingDetail) existingDetail.remove();
    
        const existingForm = document.getElementById("note-form");
        if (existingForm) existingForm.remove();
    
        // 선택한 글만 표시
        mainContent.innerHTML += `
            <div id="note-detail">
                <h3>${post.title}</h3>
                <p>${post.content.replace(/\n/g, "<br>")}</p><br>
                <button id="edit-note">수정</button>
                <button id="delete-note">삭제</button>
                <button onclick="openNoteList()">목록 열기</button>
            </div>
        `;
    
        document.getElementById("edit-note").addEventListener("click", function() {
            editNoteForm(index);
        });
    
        document.getElementById("delete-note").addEventListener("click", function() {
            deleteNotePost(index);
        });
    }   


    // 글 목록으로 돌아가기 위한 함수
    function openNoteList() {
        // 글 세부 보기 폼 제거
        const detail = document.getElementById("note-detail");
        if (detail) detail.remove();

        // 글 목록 다시 보이기
        document.getElementById("saved-note").style.display = "block";
        document.getElementById("new-note-post").style.display = "block";
        
        // 글 목록 업데이트
        displayNotePosts();
    }
    

    function editNoteForm(index) {
        const posts = JSON.parse(localStorage.getItem("note")) || [];
        const post = posts[index];
    
        // 기존 note-detail 폼 제거하고 수정 가능한 폼 표시
        const existingDetail = document.getElementById("note-detail");
        if (existingDetail) existingDetail.remove();
    
        mainContent.innerHTML += `
            <div id="note-form">
                <input type="text" id="note-title" value="${post.title}"><br>
                <textarea id="note-content">${post.content}</textarea><br>
                <button id="save-note">저장</button>
                <button onclick="cancelNoteForm()">취소</button>
            </div>
        `;
    
        // "저장" 버튼에 이벤트 리스너 추가하여 수정 내용을 저장
        document.getElementById("save-note").addEventListener("click", function() {
            saveNotePost(index); // 기존 글의 인덱스를 전달하여 수정 저장
        });
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
            // 새 글 작성
            posts.push({ title, content });
        } else {
            // 기존 글 수정
            posts[postIndex] = { title, content };
        }
    
        localStorage.setItem("note", JSON.stringify(posts));
    
        // 글 작성 폼 제거 및 목록으로 돌아가기
        const form = document.getElementById("note-form");
        if (form) form.remove();
    
        openNoteList();
    }
    

    function displayNotePosts() {
        const posts = JSON.parse(localStorage.getItem("note")) || [];
        const list = document.getElementById("saved-note");
        list.innerHTML = posts.map((post, index) => `
            <li class="clickable-note" onclick="showNoteDetail(${index})">
                <strong>${post.title}</strong>
            </li>
        `).join("");
    
        document.getElementById("new-note-post").addEventListener("click", showNoteForm);
    }
    

    function deleteNotePost(index) {
        const posts = JSON.parse(localStorage.getItem("note"));
        posts.splice(index, 1);
        localStorage.setItem("note", JSON.stringify(posts));
    
        // 글 삭제 후 목록 화면으로 돌아가기
        openNoteList();
    }

    function cancelNoteForm() {
    const form = document.getElementById("note-form");
    if (form) form.remove();

    // "글 작성" 버튼 이벤트 리스너 재설정
    document.getElementById("new-note-post").addEventListener("click", showNoteForm);
}

    function cancelNoteDetail() {
        const detail = document.getElementById("note-detail");
        if (detail) detail.remove();

        // "글 작성" 버튼 이벤트 리스너 재설정
        document.getElementById("new-note-post").addEventListener("click", showNoteForm);
    }

    // 전역 객체에 함수 추가
    window.loadContent = loadContent;
    window.showNoteForm = showNoteForm;
    window.showNoteDetail = showNoteDetail;
    window.displayNotePosts = displayNotePosts;
    window.cancelNoteDetail = cancelNoteDetail;
    window.cancelNoteForm = cancelNoteForm;
    window.openNoteList = openNoteList;

    loadContent('resume');
});