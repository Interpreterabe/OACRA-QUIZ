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

// Variables
let userName = "";
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

// Questions Array (Multiple Choice & Yes/No)
const questions = [
    { question: "What is the first step to probation success?", options: ["Find a job", "Organize documents", "Ignore supervision", "Wait it out"], answer: "Organize documents" },
    { question: "Can you request early termination of probation?", options: ["Yes", "No"], answer: "Yes" },
    { question: "Is employment verification required?", options: ["Yes", "No"], answer: "Yes" },
    { question: "How do you report a change of address?", options: ["Tell a friend", "Call your officer", "Submit a written request", "Ignore it"], answer: "Submit a written request" }
];

// Start Quiz
function startQuiz() {
    userName = document.getElementById("nameInput").value.trim();
    if (userName === "") {
        alert("Please enter your name to continue.");
        return;
    }
    document.getElementById("nameContainer").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    nextQuestion();
}

// Display Next Question
function nextQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        document.getElementById("question").innerText = q.question;
        
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";

        q.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-button");
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });

        // Update Progress Bar
        document.getElementById("progressBar").value = (currentQuestion / questions.length) * 100;
    } else {
        endQuiz();
    }
}

// Check Answer
function checkAnswer(selected) {
    if (selected === questions[currentQuestion].answer) {
        score++;
    } else {
        incorrectAnswers.push({ 
            question: questions[currentQuestion].question, 
            selected: selected, 
            correct: questions[currentQuestion].answer 
        });
    }
    currentQuestion++;
    nextQuestion();
}

// End Quiz & Show Missed Answers
async function endQuiz() {
    let resultHTML = `<h2>Quiz Completed!</h2>
                      <p>${userName}, you scored <strong>${score}/${questions.length}</strong>.</p>
                      <p>Great job! Keep learning and stay on track!</p>`;

    if (incorrectAnswers.length > 0) {
        resultHTML += `<h3>Review Your Answers:</h3><ul>`;
        incorrectAnswers.forEach(item => {
            resultHTML += `<li><strong>Q:</strong> ${item.question}<br>
                           <span style="


