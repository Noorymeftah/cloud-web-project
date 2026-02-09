// 1️⃣ إعداد Firebase
const firebaseConfig = {
    apiKey: "أدخل هنا apiKey",
    authDomain: "أدخل هنا authDomain",
    databaseURL: "أدخل هنا databaseURL",
    projectId: "أدخل هنا projectId",
    storageBucket: "أدخل هنا storageBucket",
    messagingSenderId: "أدخل هنا messagingSenderId",
    appId: "أدخل هنا appId"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// المراجع العامة
const auth = firebase.auth();
const database = firebase.database();
