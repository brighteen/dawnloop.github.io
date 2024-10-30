function searchAllPosts() {
    const query = document.getElementById("search-bar").value.toLowerCase();

    if (!query.trim()) {
        alert("검색어를 입력해 주세요.");
        return;
    }

    // 새 창 생성
    const resultWindow = window.open("", "_blank", "width=600,height=400");
    resultWindow.document.write("<h1>검색 결과</h1>");
    resultWindow.document.write("<ul id='search-results'></ul>");

    const categories = ["resumes", "studies", "dailies", "englishEntries", "memos"];
    const categoryNames = {
        resumes: "Resume",
        studies: "공부한 흔적",
        dailies: "일상",
        englishEntries: "영어 공부",
        memos: "메모장"
    };

    categories.forEach(category => {
        const posts = JSON.parse(localStorage.getItem(category)) || [];

        posts.forEach((post, index) => {
            if (post.toLowerCase().includes(query)) {
                resultWindow.document.getElementById("search-results").innerHTML += `
                    <li><strong>${categoryNames[category]}</strong> #${index + 1}: ${post}</li>`;
            }
        });
    });

    if (!resultWindow.document.getElementById("search-results").innerHTML) {
        resultWindow.document.write("<p>검색 결과가 없습니다.</p>");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("search-button").addEventListener("click", searchAllPosts);
});
