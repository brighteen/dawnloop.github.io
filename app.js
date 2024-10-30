function searchAllPosts() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ""; // 검색 결과 초기화

    // 각 카테고리에서 데이터 불러오기
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
                const resultItem = document.createElement("div");
                resultItem.innerHTML = `<strong>${categoryNames[category]}</strong> #${index + 1}: ${post}`;
                resultsContainer.appendChild(resultItem);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // 검색 입력 이벤트 연결
    document.getElementById("search-bar").addEventListener("input", searchAllPosts);
});
