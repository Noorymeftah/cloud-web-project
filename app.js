// ===============================
// 1️⃣ إعداد Firebase
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, update, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// إعدادات Firebase الخاصة بالمشروع
const firebaseConfig = {
  apiKey: "AIzaSyBLRoyIG1_FJAXCVVA1Ni9tuDlX368965c",
  authDomain: "cloud-web-project.firebaseapp.com",
  databaseURL: "https://cloud-web-project-default-rtdb.firebaseio.com",
  projectId: "cloud-web-project",
  storageBucket: "cloud-web-project.appspot.com",
  messagingSenderId: "503747895979",
  appId: "1:503747895979:web:bbc0239d28e9c213becdee"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

// ===============================
// 2️⃣ دوال المستخدم
// ===============================

// تسجيل الدخول
function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// إنشاء مستخدم جديد
function registerUser(name, email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // حفظ بيانات المستخدم في Realtime Database
            return set(ref(database, 'users/' + user.uid), {
                name: name,
                email: email
            });
        });
}

// تسجيل الخروج
function logout() {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        alert(error.message);
    });
}

// ===============================
// 3️⃣ دوال البيانات
// ===============================

// إضافة بيانات جديدة لكل مستخدم
function addUserData(userId, title, content) {
    const newDataKey = push(ref(database, 'data/' + userId)).key;
    const updates = {};
    updates['/data/' + userId + '/' + newDataKey] = {
        title: title,
        content: content,
        timestamp: Date.now()
    };
    return update(ref(database), updates);
}

// جلب البيانات لأي مسار محدد في Realtime Database
function getData(path, callback) {
    const dbRef = ref(database, path);
    onValue(dbRef, (snapshot) => {
        callback(snapshot.val());
    });
}

// ===============================
// 4️⃣ التحقق من تسجيل الدخول لجميع الصفحات
// ===============================
onAuthStateChanged(auth, (user) => {
    if (!user && window.location.pathname.includes('dashboard.html')) {
        window.location.href = "index.html";
    }
});

// ===============================
// 5️⃣ تصدير الدوال لاستخدامها في الصفحات
// ===============================
export { auth, database, loginUser, registerUser, logout, addUserData, getData };
