// Import Firebase modules
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
    { q: "What is the first step to probation success?", options: ["Understand your conditions", "Ignore your officer", "Miss meetings"], correct: 0 },
    { q: "Can you request early termination of probation?", options: ["Yes", "No"], correct: 0 },
    { q: "Is employment verification required?", options: ["Yes", "No"], correct: 0 },
    { q: "How do you report a change of address?", options: ["Notify your officer", "Ignore it", "Wait until the next check-in"], correct: 0 },
    { q: "Are travel restrictions part of probation?", options: ["Yes", "No"], correct: 0 },
    { q: "What happens if restitution is unpaid?", options: ["Violation can be filed", "Nothing", "The debt disappears"], correct: 0 },
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function nextQuestion() {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter your name before starting the quiz.");
        return;
    }
    
    if (currentQuestion < questions.length) {
        const questionData = questions[currentQuestion];
        document.getElementById("question").innerText = questionData.q;
        
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";
        
        questionData.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => submitAnswer(index);
            optionsContainer.appendChild(button);
        });
        
        updateProgress();
    } else {
        document.getElementById("question-container").innerHTML = `Quiz Completed! Your answers have been recorded.`;
        saveQuizResult(username, score);
    }
}

function submitAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestion].correct;
    if (selectedIndex === correctIndex) {
        score++;
    }
    userAnswers.push({ question: questions[currentQuestion].q, selected: questions[currentQuestion].options[selectedIndex] });
    currentQuestion++;
    nextQuestion();
}

function updateProgress() {
    const progress = document.getElementById("progress");
    progress.style.width = `${(currentQuestion / questions.length) * 100}%`;
}

async function saveQuizResult(username, userScore) {
    try {
        await addDoc(collection(db, "oacra-quiz"), {
            username: username,
            score: userScore,
            timestamp: serverTimestamp()
        });
        document.getElementById("question-container").innerHTML += `<p>You scored ${userScore}/${questions.length}. Great job staying compliant! Keep it up! ✅</p>`;
    } catch (error) {
        console.error("Error saving result:", error);
    }
}

// Start quiz on load
nextQuestion();

