// Зарежда въпросите от JSON файл
async function loadQuestionsFromJSON() {
    try {
        const response = await fetch("/custom/questions.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Questions loaded:", data);
        return data;
    } catch (error) {
        console.error("Failed to load questions:", error);
    }
}

let currentQuestionIndex = 0; 
let userScore = 0; 
let questions = []; 

async function loadQuestions() {
    const allQuestions = await loadQuestionsFromJSON();
    shuffleArray(allQuestions);
    questions = allQuestions.slice(0, 5);
    showQuestion(currentQuestionIndex);
}

// Функция за разбъркване на въпросите
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Показва въпрос на текущия индекс
function showQuestion(index) {
    const quizDiv = document.getElementById("quiz");
    const currentQuestion = quizDiv.querySelector(".question");
    if (currentQuestion) {
        currentQuestion.classList.add("question-leaving");
    }

    setTimeout(() => {
        quizDiv.innerHTML = "";
        const question = questions[index];
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question", "question-entering");
        questionDiv.innerHTML = `<h3>${index + 1}. ${question.question}</h3>`;

        for (const [key, option] of Object.entries(question.options)) {
            const label = document.createElement("label");
            label.innerHTML = `
                <input type="radio" name="question${index}" value="${option.score}">
                ${option.text}
            `;
            const optionDiv = document.createElement("div");
            optionDiv.classList.add("options");
            optionDiv.appendChild(label);
            questionDiv.appendChild(optionDiv);
        }

        quizDiv.appendChild(questionDiv);
    }, 500);
}

// Обработва следващ въпрос
function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    const quizDiv = document.getElementById("quiz");

    const errorDiv = document.getElementById("error-message");
    if (errorDiv) {
        errorDiv.remove();
    }

    if (!selectedOption) {
        const error = document.createElement("div");
        error.id = "error-message";
        error.textContent = "Моля, изберете отговор преди да продължите!";
        error.style.color = "red";
        error.style.marginTop = "10px";
        error.style.fontWeight = "bold";
        quizDiv.appendChild(error);
        return;
    }

    userScore += parseInt(selectedOption.value);

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        calculateScore();
    }
}

// Изчислява крайния резултат
function calculateScore() {
    const quizDiv = document.getElementById("quiz");
    const resultDiv = document.getElementById("result");

    quizDiv.style.display = "none";

    let resultText;
    if (userScore >= 15) {
        resultText = "Вашето психично състояние е отлично! Продължавайте така!";
    } else if (userScore >= 11) {
        resultText = "Справяте се добре, но има място за подобрение.";
    } else if (userScore >= 7) {
        resultText = "Вашето психично здраве може да се подобри с малко усилия. Не забравяйте да се грижите за себе си.";
    } else {
        resultText = "Може би е полезно да обърнете повече внимание на психичното си здраве.";
    }

    resultDiv.textContent = `${resultText}`;

    // Промяна на бутона
    const submitButton = document.getElementById("submit");
    submitButton.textContent = "Опитай пак";
    submitButton.onclick = restartQuiz;
}

// Рестартира теста
function restartQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;

    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").textContent = "";

    loadQuestions();

    const submitButton = document.getElementById("submit");
    submitButton.textContent = "Напред";
    submitButton.onclick = nextQuestion;
}

// Зарежда въпросите при стартиране
window.onload = loadQuestions;