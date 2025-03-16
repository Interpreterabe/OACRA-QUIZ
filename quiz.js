const quizzes = {
    "early-termination": [
        { question: "Can you apply for early termination at any time?", correct: "No", explanation: "You must complete at least half of your probation period and meet all conditions." },
        { question: "Does early termination remove your record?", correct: "No", explanation: "Early termination only ends your probation early; it does not expunge your record." }
    ],
    "standard-conditions": [
        { question: "Do you need to report monthly?", correct: "Yes", explanation: "Standard probation requires regular check-ins with your probation officer." },
        { question: "Can you travel without permission?", correct: "No", explanation: "You must get approval from your probation officer before traveling." }
    ],
    "community-control": [
        { question: "Is community control the same as house arrest?", correct: "Yes", explanation: "Community control is a strict form of supervision similar to house arrest." },
        { question: "Can you leave your house without approval?", correct: "No", explanation: "All movement must be pre-approved and scheduled." }
    ],
    "special-conditions": [
        { question: "Are special conditions mandatory?", correct: "Yes", explanation: "Failure to complete special conditions may result in a violation." },
        { question: "Who determines special conditions?", correct: "Court", explanation: "Special conditions are ordered by the judge and must be followed." }
    ]
};

document.getElementById("startQuiz").addEventListener("click", function () {
    const selectedQuiz = document.getElementById("quizSelector").value;
    loadQuiz(selectedQuiz);
});

function loadQuiz(quizType) {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear previous quiz
    quizContainer.style.display = "block";

    const questions = quizzes[quizType];
    if (!questions) {
        quizContainer.innerHTML = "<p>Error loading quiz.</p>";
        return;
    }

    questions.forEach((q, index) => {
        const questionEl = document.createElement("div");
        questionEl.innerHTML = `
            <p><strong>${q.question}</strong></p>
            <button class="answer-btn" data-answer="Yes">${q.correct === "Yes" ? "✅ Yes" : "❌ Yes"}</button>
            <button class="answer-btn" data-answer="No">${q.correct === "No" ? "✅ No" : "❌ No"}</button>
            <p class="explanation" style="display:none; color:blue;"><strong>Explanation:</strong> ${q.explanation}</p>
            <hr>
        `;
        quizContainer.appendChild(questionEl);
    });

    document.querySelectorAll(".answer-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const correctAnswer = this.parentElement.querySelector(".answer-btn").getAttribute("data-answer");
            const explanation = this.parentElement.querySelector(".explanation");
            explanation.style.display = "block";
        });
    });
}
