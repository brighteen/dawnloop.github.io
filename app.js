document.addEventListener("DOMContentLoaded", function() {
    // 모든 네비게이션 링크 요소를 선택
    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            // 기본 링크 클릭 동작을 막음
            event.preventDefault();

            // 링크의 href 속성에서 이동할 섹션 ID 추출
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            // 부드러운 스크롤
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });
        });
    });
});
