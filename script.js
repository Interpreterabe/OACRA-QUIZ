// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-q5URdUdTOoDYSOFTQ2tJCXY_dAsCrKk",
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

// Debugging Firebase
console.log("Firebase App Initialized:", app);
console.log("Firestore DB:", db);

// Quiz Questions and Answers
const quizData = [
    {
        question: "What is the first step to probation success?",
        answers: ["Read your probation conditions", "Ignore your probation officer", "Wait for instructions"],
        correct: "Read your probation conditions"
    },
    {
        question: "Can you request early termination of probation?",
        answers: ["Yes, after completing all conditions", "No, you must serve full probation"],
        correct: "Yes, after completing all conditions"
    },
    {
        question: "Is employment verification required?",
        answers: ["Yes, for all jobs", "No, only for some jobs", "It depends on your probation order"],
        correct: "It depends on your probation order"
    },
    {
        question: "How do you report a change of address?",
        answers: ["Call your probation officer", "Move without telling anyone", "Update your address at the courthouse"],
        correct: "Call your probation officer"
    }
];

let currentQuestion = 0;

// Function to display the next question
function loadQuestion() {
    if (currentQuestion < quizData.length) {
        const questionData = quizData[currentQuestion];
        document.getElementById("question").innerText = questionData.question;

        // Clear previous answers
        const answersDiv = document.getElementById("answers");
        answersDiv.innerHTML = "";

        // Create answer buttons
        questionData.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer;
            button.className = "answer-btn";
            button.onclick = () => submitAnswer(answer);
            answersDiv.appendChild(button);
        });
    } else {
        document.getElementById("question").innerText = "Quiz Completed! Your answers have been recorded.";
        document.getElementById("answers").innerHTML = "";
    }
}

// Function to submit answer
async function submitAnswer(answer) {
    console.log("User answer:", answer);
    try {
        const docRef = await addDoc(collection(db, "oacra-quiz"), {
            question: quizData[currentQuestion].question,
            answer: answer,
            isCorrect: answer === quizData[currentQuestion].correct, // Check if the answer is correct
            timestamp: serverTimestamp()
        });
        console.log("Answer saved with ID:", docRef.id);
        currentQuestion++; // Move to next question
        loadQuestion(); // Load the next question
    } catch (error) {
        console.error("Error saving answer:", error);
    }
}

// Load the first question
loadQuestion();
