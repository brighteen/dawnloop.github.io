document.addEventListener("DOMContentLoaded", function() {
    const resumeContent = document.getElementById("resume-content");
    const resumeDisplay = document.getElementById("resume-display");
    const editButton = document.getElementById("edit-resume");
    const saveButton = document.getElementById("save-resume");

    // Resume 내용 불러오기
    function loadResume() {
        const savedContent = localStorage.getItem("resumeContent") || "소개 내용을 작성해 주세요.";
        resumeDisplay.textContent = savedContent;
        resumeContent.value = savedContent;
    }

    // 수정 모드 활성화
    function enableEditMode() {
        resumeDisplay.style.display = "none";
        resumeContent.style.display = "block";
        editButton.style.display = "none";
        saveButton.style.display = "inline";
    }

    // Resume 저장 기능
    function saveResume() {
        const content = resumeContent.value;
        localStorage.setItem("resumeContent", content);
        resumeDisplay.textContent = content;

        resumeDisplay.style.display = "block";
        resumeContent.style.display = "none";
        editButton.style.display = "inline";
        saveButton.style.display = "none";

        alert("Resume이 저장되었습니다.");
    }

    editButton.addEventListener("click", enableEditMode);
    saveButton.addEventListener("click", saveResume);

    loadResume();
});
