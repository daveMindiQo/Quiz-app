const questions = [
    {
        question: "Jaké je datum narození tvé mamky?",
        answers: [
            { text: "31.5.1982", correct: false },
            { text: "31.5.1983", correct: false },
            { text: "30.5.1983", correct: true },
            { text: "30.5.1984", correct: false }
        ]
    },
    {
        question: "Jaké bylo příjmení tvé mamky za svobodna?",
        answers: [
            { text: "Prudičová", correct: false },
            { text: "Tomková", correct: true },
            { text: "Pazderová", correct: false },
            { text: "Tomková-Prudičová", correct: false }
        ]
    },
    {
        question: "Jak se jmenuje sourozenec zetě tojí babičky?",
        answers: [
            { text: "Robert", correct: false },
            { text: "Ivan", correct: false },
            { text: "Jitka", correct: false },
            { text: "David", correct: true }
        ]
    },
    {
        question: "Jaký je výsledek toho příkladu: 333:3+(-40·2)-(-4²)-4",
        answers: [
            { text: "0", correct: false },
            { text: "1", correct: false },
            { text: "11", correct: true },
            { text: "100", correct: false }
        ]
    },
    {
        question: "Která hora je nejvyšší v České republice",
        answers: [
            { text: "Lysá hora", correct: false },
            { text: "Sněžka", correct: true },
            { text: "Mount Everest", correct: false },
            { text: "Smrk", correct: false }
        ]
    },
    {
        question: "Vyber správnou možnost do následující věty: Spatřil jsem ve vodě ___ a na stromě ___.",
        answers: [
            { text: "vír, víra", correct: false },
            { text: "vír, výra", correct: true },
            { text: "výr, víra", correct: false },
            { text: "výr, výra", correct: false }
        ]
    },
    {
        question: "Celý život se inspiroval zážitky z dětství a venkovského života v rodných Hrusicích nedaleko Prahy. Jistě si vzpomeneš na jeho kocoura Mikeše",
        answers: [
            { text: "M. Aleš", correct: false },
            { text: "J. Lada", correct: true },
            { text: "J. Karafiát", correct: false },
            { text: "J. Čapek", correct: false }
        ]
    },
    {
        question: "Vyber možnost, která je desetkrát menší než 1,2t.",
        answers: [
            { text: "1,2kg", correct: false },
            { text: "120kg", correct: true },
            { text: "1,2g", correct: false },
            { text: "1,2mg", correct: false }
        ],
    },
    {
        question: "Kdy má svátek tvůj děda nebo taťka?",
        answers: [
            { text: "25.června", correct: true },
            { text: "27.srpna", correct: false },
            { text: "27.6.", correct: false },
            { text: "25.července", correct: false }
        ]
    },
    {
        question: "Před školou v Velkém Újezdě máte bystu, koho je?",
        answers: [
            { text: "Vladimíra Železného", correct: false },
            { text: "Emila Zátopka", correct: false },
            { text: "Emila Navrátila", correct: false },
            { text: "Vladimíra Navrátila", correct: true }
        ]
    },
    {
        question: "Bonusová otázka za 100 bodů.<br/>Vyber zápis čísla π, který mu bude nejblíže",
        answers: [
            { text: "3,14159264358979323846", correct: false },
            { text: "3,14159265358979322846", correct: false },
            { text: "3,14159265358979323846", correct: true },
            { text: "3,14159265358679323846", correct: false }
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("btn-next");


// Start Quiz
function startQuiz() {
    nextButton.innerHTML = "Další";
    showQuestion();
}

// Show Question
function showQuestion() {
    resetState();
    let currentQuestionIndex = localStorage.getItem('currentQuestionIndex');
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = Number(currentQuestionIndex) + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

// Reset State
function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

// Select Answer
function selectAnswer(e) {
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if (isCorrect) {
        selectedbtn.classList.add("correct");
        let currentQuestionIndex = localStorage.getItem('currentQuestionIndex');
        let score = Number(localStorage.getItem('score'));

        if (currentQuestionIndex == 10)
            score += 100;
        else
            score += 50;
        localStorage.setItem('score', score);
    }
    else {
        selectedbtn.classList.add("wrong");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// Show Score
function showScore() {
    resetState();
    let score = localStorage.getItem('score');
    questionElement.innerHTML = "Dosáhl jsi " + score + " bodů, pro odměnu a kontrolu jdi za strejdou Davidem :-).";
}

// Handle Next Button
function handleNextButton() {
    let currentQuestionIndex = localStorage.getItem('currentQuestionIndex');

    currentQuestionIndex++;
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {

    let currentQuestionIndex = localStorage.getItem('currentQuestionIndex');

    if (nextButton.innerHTML == "Start") {
        localStorage.setItem('start', true);
        startQuiz()

    } else if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startApp();
    }
});


// Start app
function startApp() {

    if (localStorage.getItem('start')) {
        startQuiz();

    } else {
        if (localStorage.getItem('currentQuestionIndex') == "undefined" || localStorage.getItem('currentQuestionIndex') == null) {
            localStorage.setItem('currentQuestionIndex', 0);
            localStorage.setItem('score', 0);
        }
        questionElement.innerHTML = "Ukaž co dokážeš.<br /> Za každou správnou odpověď dostaneš 50bodů.<br />Za každý bod po skončení kvízu dostaneš jednu korunu. <br /> Kvíz je možné hrát jen jednou!!!";
        nextButton.innerHTML = "Start";
        nextButton.style.display = "block";
    }
}

startApp();