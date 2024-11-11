// Firebase 모듈 임포트
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase 설정 정보
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firebase Firestore 초기화 완료");

// Firestore에 글 저장
export async function savePostToFirestore(title, content) {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      title: title,
      content: content,
      timestamp: new Date()
    });
    console.log("글 저장 성공, 문서 ID: ", docRef.id);
  } catch (e) {
    console.error("글 저장 실패: ", e);
  }
}

// Firestore에서 글 목록 불러오기
export async function getPostsFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const posts = [];
  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });
  return posts;
}
