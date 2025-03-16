document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.getElementById("quiz-container");
    const quizSelect = document.getElementById("quiz-select");

    function loadQuiz() {
        const selectedQuiz = quizSelect.value;
        quizContainer.style.display = "block"; // Show quiz container
        quizContainer.innerHTML = "<p>Loading questions...</p>";

        fetchQuizQuestions(selectedQuiz);
    }

    function fetchQuizQuestions(quizType) {
        const quizzes = {
            "early-termination": [
                { question: "Are you eligible for early termination?", correct: "Yes" },
                { question: "Do you need to complete all conditions first?", correct: "Yes" }
            ],
            "standard-conditions": [
                { question: "Do you need to report monthly?", correct: "Yes" },
                { question: "Can you travel without permission?", correct: "No" }
            ],
            "community-control": [
                { question: "Do you need a curfew?", correct: "Yes" },
                { question: "Can you change your schedule without approval?", correct: "No" }
            ],
            "special-conditions": [
                { question: "Are special conditions mandatory?", correct: "Yes" },
                { question: "Who determines special conditions?", correct: "Court" }
            ]
        };

        const selectedQuestions = quizzes[quizType] || [];
        displayQuiz(selectedQuestions);
    }

    function displayQuiz(questions) {
        let quizHTML = "";
        questions.forEach((q, index) => {
            quizHTML += `
                <div class="question">
                    <p><strong>${q.question}</strong></p>
                    <button onclick="selectAnswer(${index}, 'Yes')">✅ Yes</button>
                    <button onclick="selectAnswer(${index}, 'No')">❌ No</button>
                </div>
            `;
        });
        document.getElementById("quiz-container").innerHTML = quizHTML;
    }

    window.loadQuiz = loadQuiz;
});
