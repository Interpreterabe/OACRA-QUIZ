// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration (Replace "YOUR-API-KEY")
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

// Store the selected module
let selectedModule = "";

// Compliance Modules (Different Quizzes)
const modules = {
    "early-termination": [
        { question: "Can you request early termination?", options: ["Yes", "No"], answer: "Yes", explanation: "You may apply after meeting all conditions." },
        { question: "What must you do before applying?", options: ["Complete all conditions", "Just ask your officer"], answer: "Complete all conditions", explanation: "All probation requirements must be met first." }
    ],
    "standard-conditions": [
        { question: "Do you have to report your employment status?", options: ["Yes", "No"], answer: "Yes", explanation: "Employment verification is required for compliance." },
        { question: "Can you travel without permission?", options: ["Yes", "No"], answer: "No", explanation: "Travel must be pre-approved by your probation officer." }
    ]
};

// Start Quiz Function (Triggered by Module Selection)
function startQuiz(moduleId) {
    selectedModule = moduleId;
    document.body.innerHTML = `<h1>${selectedModule.replace("-", " ").toUpperCase()} Quiz</h1>
                               <div id="quizContainer">
                                  <p id="question">Loading...</p>
                                  <div id="options"></div>
                                  <progress id="progressBar" value="0" max="100"></progress>
                               </div>`;
    nextQuestion();
}

// Variables
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

// Display Next Question
function nextQuestion() {
    if (currentQuestion < modules[selectedModule].length) {
        const q = modules[selectedModule][currentQuestion];
        document.getElementById("question").innerText = q.question;
        
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = ""; // Clear previous options

        q.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-button");
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });

        document.getElementById("progressBar").value = (currentQuestion / modules[selectedModule].length) * 100;
    } else {
        endQuiz();
    }
}

// Check Answer
function checkAnswer(selected) {
    const q = modules[selectedModule][currentQuestion];
    if (selected === q.answer) {
        score++;
    } else {
        incorrectAnswers.push({ question: q.question, selected: selected, correct: q.answer, explanation: q.explanation });
    }
    currentQuestion++;
    nextQuestion();
}

// End Quiz & Show Results
function endQuiz() {
    let resultHTML = `<h2>Quiz Completed!</h2>
                      <p>You scored <strong>${score}/${modules[selectedModule].length}</strong>.</p>`;

    if (incorrectAnswers.length > 0) {
        resultHTML += `<h3>Review Your Answers:</h3><ul>`;
        incorrectAnswers.forEach(item => {
            resultHTML += `<li><strong>Q:</strong> ${item.question}<br>
                           <span style="color:red;"><strong>Your Answer:</strong> ${item.selected}</span><br>
                           <span style="color:green;"><strong>Correct Answer:</strong> ${item.correct}</span><br>
                           <span style="color:blue;"><strong>Explanation:</strong> ${item.explanation}</span></li><br>`;
        });
        resultHTML += `</ul>`;
    }

    document.body.innerHTML = resultHTML;
}
