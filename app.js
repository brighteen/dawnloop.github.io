document.addEventListener("DOMContentLoaded", function() {
    // 검색 기능 구현
    function searchPosts() {
        const query = document.getElementById("search-bar").value.toLowerCase();
        const sections = document.querySelectorAll("section");

        sections.forEach(section => {
            const content = section.innerText.toLowerCase();
            section.style.display = content.includes(query) ? "block" : "none";
        });
    }

    // 페이지 이동 버튼
    const resumeButton = document.querySelector("#resume button");
    const studyButton = document.querySelector("#study button");
    const dailyButton = document.querySelector("#daily button");
    const englishButton = document.querySelector("#english button");
    const memoButton = document.querySelector("#memo button");
    const guestbookButton = document.querySelector("#guestbook button");

    resumeButton.addEventListener("click", function() {
        location.href = "resume_edit.html";
    });

    studyButton.addEventListener("click", function() {
        location.href = "new_study_post.html";
    });

    dailyButton.addEventListener("click", function() {
        location.href = "new_daily_post.html";
    });

    englishButton.addEventListener("click", function() {
        location.href = "new_english_post.html";
    });

    memoButton.addEventListener("click", function() {
        location.href = "new_memo.html";
    });

    guestbookButton.addEventListener("click", function() {
        location.href = "guestbook.html";
    });
});

window.searchPosts = searchPosts;
