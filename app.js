document.addEventListener("DOMContentLoaded", function() {
    // Resume, 공부한 흔적, 일상, 영어 공부, 메모장 등에서 '글 작성' 버튼을 클릭 시 작성 양식이 나타나도록 설정
    const buttons = document.querySelectorAll("section button");
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            console.log("Button clicked!"); // 버튼이 클릭될 때마다 콘솔에 출력
            alert(`${this.parentElement.querySelector("h2").textContent} 글 작성 또는 수정 기능이 곧 추가될 예정입니다.`);
        });
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
