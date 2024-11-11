document.addEventListener("DOMContentLoaded", function() {
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
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase 연결 성공");
  });
  