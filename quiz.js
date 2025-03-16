document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.getElementById("quiz-container");

    const questions = [
        {
            question: "Are special conditions mandatory?",
            choices: ["Yes", "No"],
            correct: "Yes",
            explanation: "Failure to complete them may lead to a violation."
        },
        {
            question: "Who determines special conditions?",
            choices: ["Probation Officer", "Court"],
            correct: "Court",
            explanation: "Special conditions are ordered by the court and must be followed."
        },
        {
            question: "Can you travel without permission?",
            choices: ["Yes", "No"],
            correct: "No",
            explanation: "Travel must be pre-approved by your probation officer."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            showResults();
            return;
        }

        const questionObj = questions[currentQuestionIndex];
        quizContainer.innerHTML = `
            <h2>${questionObj.question}</h2>
            ${questionObj.choices
                .map(
                    (choice, index) => `
                <button class="quiz-btn" onclick="checkAnswer('${choice}')">
                    ${choice}
                </button>
            `
                )
                .join("")}
        `;
    }

    window.checkAnswer = function (selected) {
        const questionObj = questions[currentQuestionIndex];
        let explanation = "";

        if (selected === questionObj.correct) {
            score++;
            explanation = `<p style="color: green;"><strong>Correct Answer:</strong> ${questionObj.correct}</p>`;
        } else {
            explanation = `<p style="color: red;"><strong>Your Answer:</strong> ${selected}</p>
                <p style="color: green;"><strong>Correct Answer:</strong> ${questionObj.correct}</p>`;
        }

        explanation += `<p style="color: blue;"><strong>Explanation:</strong> ${questionObj.explanation}</p>`;
        quizContainer.innerHTML += explanation;

        currentQuestionIndex++;
        setTimeout(loadQuestion, 1500);
    };

    function showResults() {
        quizContainer.innerHTML = `
            <h2>Quiz Completed!</h2>
            <p>You scored <strong>${score}/${questions.length}</strong>.</p>
            <button onclick="restartQuiz()">Restart Quiz</button>
        `;
    }

    window.restartQuiz = function () {
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    };

    loadQuestion();
});
