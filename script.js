// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase Config (Replace with yours)
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-PROJECT-ID.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-PROJECT-ID.appspot.com",
  messagingSenderId: "YOUR-SENDER-ID",
  appId: "YOUR-APP-ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample Questions
const questions = [
    "What is the first step to probation success?",
    "Can you request early termination of probation?",
    "Is employment verification required?",
    "How do you report a change of address?"
];

let currentQuestion = 0;

// Show next question
function nextQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById("question").innerText = questions[currentQuestion];
        currentQuestion++;
    } else {
        document.getElementById("question").innerText = "Quiz Completed!";
        saveQuizResult(100); // Example score
    }
}

// Save Quiz Result to Firebase
async function saveQuizResult(userScore) {
    try {
        await addDoc(collection(db, "oacra-quiz"), {
            score: userScore,
            timestamp: serverTimestamp()
        });
        console.log("Quiz result saved!");
    } catch (error) {
        console.error("Error saving result:", error);
    }
}

