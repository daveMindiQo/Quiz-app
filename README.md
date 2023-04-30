# Quiz-app Project

![100%](https://progress-bar.dev/100/?title=Done)

This project is written by HTML, CSS and Javascript .

## Result:

![img](./images/project.png)
------
![img](./images/project-2.png)
------

## Code:
### Functions
#### 1- Question Format `questions[{-:"",-:[{}]}]`
##### that contain data and questions

```javascript
const questions =[
    {
        question:"Javascript is an _______ language?",
        answers:[
            {text:"Object-Oriented",correct:true},
            {text:"Object-Based",correct:false},
            {text:"Procedural",correct:false},
            {text:"None of the above",correct:false}
        ]
    }
    ];
```
------
#### 2- To start Quiz `startQuiz()`
##### This function is used to start quiz
```javascript
 function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
```
------
#### 3- To show data from local storage `showData()`
##### This function is used to show user data from the page's local storage
```javascript
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
```
-------
#### 4- To select Button `selectAnswer(e)`
##### This function is used to select Button
```javascript
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
```
-------
#### 5- To Reset `resetState()`
##### This function is used to Reset
```javascript
 function resetState()
{
    nextButton.style.display = "none";
    while(answerButton.firstChild)
    {
        answerButton.removeChild(answerButton.firstChild);
    }
}
```

-------
#### 6- To show score `showScore()`
##### This function is used to show score
```javascript
 function showScore()
{
    resetState();
    questionElement.innerHTML = "Your Score is "+score+" out of "+questions.length;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}
```
-------
#### 7- To handle next button `handleNextButton()`
##### This function is used to handle next button
```javascript
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
```
## Live Demo:

you can view live demo from [here](https://mahmoud128.github.io/Quiz-app/)

------
## Accounts:
### Linkedin [Account](https://www.linkedin.com/in/mahmoud-khaleel-78932a1b5/)
### LeetCode [Account](https://leetcode.com/mahmoud_khaleel/)
