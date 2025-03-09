// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDr7Run0KxSmNbucDAIidh7bP8Qth4fiGk",
  authDomain: "oacra-quiz.firebaseapp.com",
  projectId: "oacra-quiz",
  storageBucket: "oacra-quiz.appspot.com",
  messagingSenderId: "220184308634",
  appId: "1:220184308634:web:dda26b6686016489e0a823",
  measurementId: "G-M36PWVPBDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔥 Function to Save Quiz Results to Firebase
async function saveQuizResult(userScore) {
    try {
        const docRef = await addDoc(collection(db, "oacra-quiz"), {
            score: userScore,
            timestamp: serverTimestamp()
        });
        console.log("✅ Quiz result saved with ID:", docRef.id);
    } catch (error) {
        console.error("❌ Error saving result:", error);
    }
}

// Sample Questions
const questions = [
    "What is the first step to probation success?",
    "Can you request early termination of probation?",
    "Is employment verification required?",
    "How do you report a change of address?"
];

let currentQuestion = 0;

// 🔥 Function to Show Next Question
function nextQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById("question").innerText = questions[currentQuestion];
        currentQuestion++;
    } else {
        document.getElementById("question").innerText = "🎉 Quiz Completed!";
        saveQuizResult(100);  // Example score
    }
}
