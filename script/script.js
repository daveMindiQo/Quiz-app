const questions =[
    {
        question:"Javascript is an _______ language?",
        answers:[
            {text:"Object-Oriented",correct:true},
            {text:"Object-Based",correct:false},
            {text:"Procedural",correct:false},
            {text:"None of the above",correct:false}
        ]
    },
    {
        question:"Which of the following keywords is used to define a variable in Javascript?",
        answers:[
            {text:"var",correct:false},
            {text:"let",correct:false},
            {text:"Both A and B",correct:true},
            {text:"None of the above",correct:false}
        ]
    },
    {
        question:"Which of the following methods is used to access HTML elements using Javascript?",
        answers:[
            {text:"getElementById()",correct:false},
            {text:"getElementsByClassName()",correct:false},
            {text:"Both A and B",correct:true},
            {text:"None of the above",correct:false}
        ]
    },
    {
        question:"Upon encountering empty statements, what does the Javascript Interpreter do?",
        answers:[
            {text:"Throws an error",correct:false},
            {text:"Ignores the statements",correct:true},
            {text:"Gives a warning",correct:false},
            {text:"None of the above",correct:false}
        ]
    },
    {
        question:"Which of the following methods can be used to display data in some form using Javascript?",
        answers:[
            {text:"document.write()",correct:false},
            {text:"console.log()",correct:false},
            {text:"window.alert()",correct:false},
            {text:"All of the above",correct:true}
        ]
    },
    {
        question:"How can a datatype be declared to be a constant type?",
        answers:[
            {text:"const",correct:true},
            {text:"var",correct:false},
            {text:"let",correct:false},
            {text:"constant",correct:false}
        ]
    },
    {
        question:"When the switch statement matches the expression with the given labels, how is the comparison done?",
        answers:[
            {text:"Both the datatype and the result of the expression are compared.",correct:true},
            {text:"Only the datatype of the expression is compared.",correct:false},
            {text:"Only the value of the expression is compared.",correct:false},
            {text:"None of the above.",correct:false}
        ]
    },
    {
        question:"What does the ‘toLocateString()’ method do in JS?",
        answers:[
            {text:"Returns a localised object representation.",correct:false},
            {text:"Returns a parsed string.",correct:false},
            {text:"Returns a localized string representation of an object.",correct:true},
            {text:"None of the above.",correct:false}
        ]
    },
    {
        question:"Which function is used to serialize an object into a JSON string in Javascript?",
        answers:[
            {text:"stringify",correct:true},
            {text:"parse",correct:false},
            {text:"convert",correct:false},
            {text:"None of the above.",correct:false}
        ]
    },
    {
        question:"Which of the following is not a Javascript framework?",
        answers:[
            {text:"Node",correct:false},
            {text:"Vue",correct:false},
            {text:"React",correct:false},
            {text:"Cassandra",correct:true}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("btn-next");

let currentQuestionIndex = 0;
let score = 0;

// Start Quiz
function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Show Question
function showQuestion()
{
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    
    });
}

// Reset State
function resetState()
{
    nextButton.style.display = "none";
    while(answerButton.firstChild)
    {
        answerButton.removeChild(answerButton.firstChild);
    }
}

// Select Answer
function selectAnswer(e)
{
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("wrong");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// Show Score
function showScore()
{
    resetState();
    questionElement.innerHTML = "Your Score is "+score+" out of "+questions.length;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

// Handle Next Button
function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",() => {
    if(currentQuestionIndex < questions.length )
    {
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();