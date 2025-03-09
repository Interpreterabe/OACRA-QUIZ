// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR-NEW-API-KEY",
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

// Debugging to check if Firebase is initialized
console.log("Firebase App Initialized:", app);
console.log("Firestore DB:", db);

// Quiz Questions
const questions = [
    "What is the first step to probation success?",
    "Can you request early termination of probation?",
    "Is employment verification required?",
    "How do you report a change of address?"
];

let currentQuestion = 0;

// Display the first question
document.getElementById("question").innerText = questions[currentQuestion];

// Function to handle answers
function submitAnswer(answer) {
    console.log("User selected:", answer);
    saveQuizResult(100, answer); // Example: Sending answer & score to Firebase
    nextQuestion();
}

// Function to go to the next question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        document.getElementById("question").innerText = questions[currentQuestion];
    } else {
        document.getElementById("question").innerText = "Quiz Completed!";
    }
}

// Save Quiz Result to Firebase
async function saveQuizResult(userScore, userAnswer) {
    try {
        const docRef = await addDoc(collection(db, "oacra-quiz"), {
            question: questions[currentQuestion - 1], // Store the last question
            answer: userAnswer, // Store the selected answer
            score: userScore,
            timestamp: serverTimestamp()
        });
        console.log("Quiz result saved with ID:", docRef.id);
    } catch (error) {
        console.error("Error saving result:", error);
    }
}
