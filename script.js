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

// Quiz Questions
const questions = [
    {
        question: "What is the first step to probation success?",
        choices: ["Get a lawyer", "Organize your documents", "Ignore your officer"],
        correct: 1
    },
    {
        question: "Can you request early termination of probation?",
        choices: ["Yes", "No"],
        correct: 0
    },
    {
        question: "How do you report a change of address?",
        choices: ["Call your officer", "Submit a written request", "Ignore it"],
        correct: 1
    },
    {
        question: "Is employment verification required?",
        choices: ["Yes", "No"],
        correct: 0
    },
    {
        question: "What happens if you don’t complete your community service?",
        choices: ["Nothing", "Possible violation", "Your officer does it for you"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("nextBtn");
const progressElement = document.getElementById("progress");

// Load Question
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        finishQuiz();
        return;
    }
    const q = questions[currentQuestion];
    questionElement.innerText = q.question;
    answersElement.innerHTML = "";
    
    q.choices.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.innerText = choice;
        btn.onclick = () => selectAnswer(index);
        answersElement.appendChild(btn);
    });
    
    nextButton.style.display = "none";
}

// Select Answer
function selectAnswer(index) {
    userAnswers.push({ question: questions[currentQuestion].question, chosen: questions[currentQuestion].choices[index], correct: questions[currentQuestion].choices[questions[currentQuestion].correct] });
    if (index === questions[currentQuestion].correct) {
        score++;
    }
    nextButton.style.display = "block";
}

// Next Question
nextButton.onclick = () => {
    currentQuestion++;
    progressElement.style.width = `${(currentQuestion / questions.length) * 100}%`;
    loadQuestion();
};

// Finish Quiz
async function finishQuiz() {
    questionElement.innerText = `Quiz Completed! You scored ${score}/${questions.length}.`;
    answersElement.innerHTML = "<p>Great job! Keep learning and stay on track! Here’s what you missed:</p>";
    
    userAnswers.forEach(answer => {
        if (answer.chosen !== answer.correct) {
            answersElement.innerHTML += `<p><strong>Q:</strong> ${answer.question}<br><strong>Your Answer:</strong> ${answer.chosen}<br><strong>Correct Answer:</strong> ${answer.correct}</p>`;
        }
    });

    try {
        await addDoc(collection(db, "oacra-quiz"), {
            score: score,
            timestamp: serverTimestamp()
        });
        console.log("Quiz result saved!");
    } catch (error) {
        console.error("Error saving result:", error);
    }
}

// Start Quiz
loadQuestion();





