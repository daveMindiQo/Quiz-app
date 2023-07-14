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
        question: "Jak se jmenuje sourozenec zetě tvojí babičky?",
        answers: [
            { text: "Robert", correct: false },
            { text: "Ivan", correct: false },
            { text: "Jitka", correct: false },
            { text: "David", correct: true }
        ]
    },
    {
        question: "Jaký je výsledek tohoto příkladu: 333:3+(-40·2)-4·4-4",
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
        question: "Celý život se inspiroval zážitky z dětství a venkovského života v rodných Hrusicích nedaleko Prahy. Jistě si vzpomeneš na jeho kocoura Mikeše.",
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
        question: "Před školou ve Velkém Újezdě máte bystu, koho je?",
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

const botToken = '6380596547:AAEvimNI7vTCTIA_BRiwMwa0vQkFu8KHCSQ';
const chatId = '437188901';

// Function to send a message to Telegram
function sendMessageToTelegram(message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const formData = new URLSearchParams();
    formData.append('chat_id', chatId);
    formData.append('text', message);

    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                console.log('Message sent to Telegram');
            } else {
                console.error('Error sending message to Telegram:', response.status);
            }
        })
        .catch(error => {
            console.error('Error sending message to Telegram:', error);
        });
}

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

    if (localStorage.getItem('answered') != "null") {
        console.log("showQuestion " + localStorage.getItem('answered').toString());
        selectAnswer(null)
    }

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
    let selectedbtn = null;

    var index = localStorage.getItem('answered');
    if (index == "null")
        selectedbtn = e.target;
    else
        selectedbtn = answerButton.children[index];

    const isCorrect = selectedbtn.dataset.correct === "true";

    let currentQuestionIndex = Number(localStorage.getItem('currentQuestionIndex'));

    let score = Number(localStorage.getItem('score'));
    if (isCorrect) {
        selectedbtn.classList.add("correct");

        if (e != null) {

            if (currentQuestionIndex == 10)
                score += 100;
            else
                score += 50;
            localStorage.setItem('score', score);
        }
    }
    else {
        selectedbtn.classList.add("wrong");
    }


    let i = 0;
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
        if (button == selectedbtn)
            localStorage.setItem('answered', i);
        i++;
    });

    nextButton.style.display = "block";

    if (isCorrect)
        sendMessageToTelegram("✓ " + (currentQuestionIndex + 1).toString() + " - " + selectedbtn.innerHTML + " (" + localStorage.getItem('timestamp') + ": " + score.toString() + ")")
    else
        sendMessageToTelegram("× " + (currentQuestionIndex + 1).toString() + " - " + selectedbtn.innerHTML + " (" + localStorage.getItem('timestamp') + ": " + score.toString() + ")")
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
        localStorage.setItem('answered', null);
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
            localStorage.setItem('answered', 'null');
            
            var browser = (function() {
                var test = function(regexp) {return regexp.test(window.navigator.userAgent)}
                switch (true) {
                    case test(/edg/i): return "Microsoft Edge";
                    case test(/trident/i): return "Microsoft Internet Explorer";
                    case test(/firefox|fxios/i): return "Mozilla Firefox";
                    case test(/opr\//i): return "Opera";
                    case test(/ucbrowser/i): return "UC Browser";
                    case test(/samsungbrowser/i): return "Samsung Browser";
                    case test(/chrome|chromium|crios/i): return "Google Chrome";
                    case test(/safari/i): return "Apple Safari";
                    default: return "Other";
                }
            })();

            localStorage.setItem('timestamp', new Date().toLocaleTimeString('en-US', {
                hour12: false, hour: "numeric", minute: "numeric"
            })+browser.toString());
        }
        questionElement.innerHTML = "Ukaž co dokážeš.<br /> Za každou správnou odpověď dostaneš 50 bodů.<br />Za každý bod po skončení kvízu dostaneš jednu korunu. <br /> Kvíz je možné hrát jen jednou!!!";
        nextButton.innerHTML = "Start";
        nextButton.style.display = "block";
    }
}


startApp();