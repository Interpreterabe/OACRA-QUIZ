// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
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

// Debugging Firebase Initialization
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

// Show first question
document.getElementById("question").innerText = questions[currentQuestion];

// Handle answer selection and store it in Firebase
async function submitAnswer(answer) {
    try {
        // Save the response to Firestore
        const docRef = await addDoc(collection(db, "oacra-quiz"), {
            question: questions[currentQuestion],
            answer: answer,
            timestamp: serverTimestamp()
        });

        console.log("Answer saved with ID:", docRef.id);

        // Move to the next question
        nextQuestion();
    } catch (error) {
        console.error("Error saving answer:", error);
    }
}

// Function to display the next question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        document.getElementById("question").innerText = questions[currentQuestion];
    } else {
        document.getElementById("question").innerText = "Quiz Completed!";
        document.getElementById("answers").innerHTML = ""; // Hide answer buttons after completion
    }
}
