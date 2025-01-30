let questions = [];
let currentQuestionIndex = 0;

async function loadQuestions() {
    const response = await fetch('/api/quiz/questions'); // Предполагам, че имаш API за въпросите
    const allQuestions = await response.json();
    questions = allQuestions;
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    const quizDiv = document.getElementById('quiz');
    const question = questions[index];

    quizDiv.innerHTML = `
        <div class="question">
            <h3>${question.question}</h3>
            <div class="options">
                <label><input type="radio" name="question${index}" value="${question.options.a.score}"> ${question.options.a.text}</label><br>
                <label><input type="radio" name="question${index}" value="${question.options.b.score}"> ${question.options.b.text}</label><br>
                <label><input type="radio" name="question${index}" value="${question.options.c.score}"> ${question.options.c.text}</label>
            </div>
        </div>
    `;
}

async function submitAnswers() {
    const answers = [];

    for (let i = 0; i < questions.length; i++) {
        const selectedOption = document.querySelector(`input[name="question${i}"]:checked`);
        if (selectedOption) {
            answers.push({
                question: questions[i].question,
                score: parseInt(selectedOption.value)
            });
        }
    }

    const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
    });

    const result = await response.json();
    displayResult(result);
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Вашият резултат е: ${result.totalScore}`;
}

document.addEventListener("DOMContentLoaded", loadQuestions);
