document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.getElementById("quiz-container");

    const questions = [
        {
            question: "Can you travel without permission?",
            options: ["Yes", "No"],
            correct: 1,
            explanation: "Travel must be pre-approved by your probation officer."
        },
        {
            question: "Who determines special conditions?",
            options: ["Probation Officer", "Court"],
            correct: 1,
            explanation: "Special conditions are ordered by the court and must be followed."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            quizContainer.innerHTML = `
                <h2>${q.question}</h2>
                <button class="option-btn" data-index="0">${q.options[0]}</button>
                <button class="option-btn" data-index="1">${q.options[1]}</button>
            `;

            document.querySelectorAll(".option-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const selectedIndex = parseInt(this.getAttribute("data-index"));
                    if (selectedIndex === q.correct) {
                        score++;
                        this.style.backgroundColor = "green";
                    } else {
                        this.style.backgroundColor = "red";
                    }
                    setTimeout(() => {
                        currentQuestionIndex++;
                        showQuestion();
                    }, 1000);
                });
            });
        } else {
            quizContainer.innerHTML = `
                <h2>Quiz Completed!</h2>
                <p>You scored ${score}/${questions.length}.</p>
                <button onclick="location.reload()">Restart Quiz</button>
            `;
        }
    }

    showQuestion();
});
