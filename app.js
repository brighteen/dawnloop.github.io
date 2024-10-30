document.addEventListener("DOMContentLoaded", function() {
    // 각 버튼 요소를 선택
    const resumeButton = document.querySelector("#resume button");
    const studyButton = document.querySelector("#study button");
    const dailyButton = document.querySelector("#daily button");
    const englishButton = document.querySelector("#english button");
    const memoButton = document.querySelector("#memo button");
    const guestbookButton = document.querySelector("#guestbook button");

    // 각 버튼 클릭 시 이동할 페이지 설정
    resumeButton.addEventListener("click", function() {
        location.href = "resume_edit.html"; // Resume 수정 페이지
    });

    studyButton.addEventListener("click", function() {
        location.href = "new_study_post.html"; // 공부한 흔적 새 글 작성 페이지
    });

    dailyButton.addEventListener("click", function() {
        location.href = "new_daily_post.html"; // 일상 새 글 작성 페이지
    });

    englishButton.addEventListener("click", function() {
        location.href = "new_english_post.html"; // 영어 공부 새 글 작성 페이지
    });

    memoButton.addEventListener("click", function() {
        location.href = "new_memo.html"; // 메모 추가 페이지
    });

    guestbookButton.addEventListener("click", function() {
        location.href = "guestbook.html"; // 방명록 페이지
    });

    // 검색 기능 구현
    const searchInput = document.querySelector("footer input[type='text']");
    searchInput.addEventListener("input", function(event) {
        const query = event.target.value.toLowerCase();
        const sections = document.querySelectorAll("section");

        sections.forEach(section => {
            const sectionText = section.textContent.toLowerCase();
            if (sectionText.includes(query)) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        });
    });
});
