function searchAllPosts() {
    const query = document.getElementById("search-bar").value.toLowerCase();

    if (!query.trim()) {
        alert("검색어를 입력해 주세요.");
        return;
    }

    // 새로운 창 열기 및 기본 HTML 구성
    const resultWindow = window.open("", "_blank", "width=600,height=400");
    resultWindow.document.write(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <title>검색 결과</title>
        </head>
        <body>
            <h1>검색 결과</h1>
            <ul id="search-results"></ul>
        </body>
        </html>
    `);

    const resultDoc = resultWindow.document;
    const categories = ["resumes", "studies", "dailies", "englishEntries", "memos"];
    const categoryNames = {
        resumes: "Resume",
        studies: "공부한 흔적",
        dailies: "일상",
        englishEntries: "영어 공부",
        memos: "메모장"
    };

    let hasResults = false;
    categories.forEach(category => {
        const posts = JSON.parse(localStorage.getItem(category)) || [];
        posts.forEach((post, index) => {
            if (post.toLowerCase().includes(query)) {
                hasResults = true;
                const resultItem = resultDoc.createElement("li");
                resultItem.innerHTML = `<strong>${categoryNames[category]}</strong> #${index + 1}: ${post}`;
                resultDoc.getElementById("search-results").appendChild(resultItem);
            }
        });
    });

    if (!hasResults) {
        resultDoc.getElementById("search-results").innerHTML = "<p>검색 결과가 없습니다.</p>";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            searchAllPosts();
        }
    });
    document.getElementById("search-button").addEventListener("click", searchAllPosts);
});
