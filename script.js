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

// Debugging Firebase Connection
console.log("Firebase App Initialized:", app);
console.log("Firestore DB:", db);

// Quiz Questions and Answers
const quizData = [
    { question: "What is the first step to probation success?", options: ["Stay informed", "Ignore rules"], answer: "Stay informed" },
    { question: "Can you request early termination of probation?", options: ["Yes", "No"], answer: "Yes" },
    { question: "Is employment verification required?", options: ["Yes", "No"], answer: "Yes" },
    { question: "How do you report a change of address?", options: ["Tell probation officer", "Do nothing"], answer: "Tell probation officer" }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Load the first question
function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const progressBar = document.getElementById("progress-bar");
    
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;
        optionsContainer.innerHTML = "";
        
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => submitAnswer(option);
            optionsContainer.appendChild(button);
        });
        
        progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
    } else {
        showResults();
    }
}

// Submit answer
function submitAnswer(selectedOption) {
    userAnswers.push({
        question: quizData[currentQuestionIndex].question,
        selected: selectedOption,
        correct: selectedOption === quizData[currentQuestionIndex].answer
    });
    if (selectedOption === quizData[currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

// Show Results
function showResults() {
    document.getElementById("question").innerText = `Quiz Completed! You got ${score}/${quizData.length} correct! Well done!`;
    document.getElementById("options").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
    saveQuizResult();
}

// Save Quiz Result to Firebase
async function saveQuizResult() {
    try {
        await addDoc(collection(db, "oacra-quiz"), {
            score: score,
            total: quizData.length,
            timestamp: serverTimestamp()
        });
        console.log("Quiz result saved!");
    } catch (error) {
        console.error("Error saving result:", error);
    }
}

// Start quiz on load
window.onload = loadQuestion;

