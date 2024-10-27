document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".card-button");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            alert("자세히 보기 버튼을 클릭했습니다!");
        });
    });
});
