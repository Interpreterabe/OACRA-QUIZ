// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration (Replace "YOUR-API-KEY" with actual API key)
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
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

// Quiz Questions (Multiple Choice & Yes/No)
const questions = [
    {
        question: "What is the first step to probation success?",
        options: ["Find a job", "Organize documents", "Ignore supervision", "Wait it out"],
        answer: "Organize documents",
        explanation: "Keeping your documents organized ensures compliance and prevents violations."
    },
    {
        question: "Can you request early termination of probation?",
        options: ["Yes", "No"],
        answer: "Yes",
        explanation: "If eligible, you may apply for early termination after meeting all conditions."
    },
    {
        question: "Is employment verification required?",
        options: ["Yes", "No"],
        answer: "Yes",
        explanation: "Probation officers must verify employment to track compliance."
    },
    {
        question: "How do you report a change of address?",
        options: ["Tell a friend", "Call your officer", "Submit a written request", "Ignore it"],
        answer: "Submit a written request",
        explanation: "Request approval from your officer before moving, and update your monthly/biweekly form."
    }
];

// Load First Question
document.addEventListener("DOMContentLoaded", () => {
    if (questions.length > 0) {
        nextQuestion();
    }
});

// Display Next Question
function nextQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
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

        // Update Progress Bar
        document.getElementById("progressBar").value = (currentQuestion / questions.length) * 100;
    } else {
        endQuiz();
    }
}

// Check Answer
function checkAnswer(selected) {
    const q = questions[currentQuestion];
    if (selected === q.answer) {
        score++;
    } else {
        incorrectAnswers.push({ 
            question: q.question, 
            selected: selected, 
            correct: q.answer,
            explanation: q.explanation
        });
    }
    currentQuestion++;
    nextQuestion();
}

// End Quiz & Show Missed Answers
async function endQuiz() {
    let resultHTML = `<h2>Quiz Completed!</h2>
                      <p>You scored <strong>${score}/${questions.length}</strong>.</p>
                      <p>Great job! Keep learning and stay on track!</p>`;

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

    document.getElementById("quizContainer").innerHTML = resultHTML;

    try {
        await addDoc(collection(db, "oacra-quiz"), {
            score: score,
            total: questions.length,
            incorrect: incorrectAnswers,
            timestamp: serverTimestamp()
        });
        console.log("Quiz result saved.");
    } catch (error) {
        console.error("Error saving result:", error);
    }
}





