const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = null;

questions2.loadQuestions('allg')
    .then(() => { startGame() })
    .catch(error => console.error('whoops', error))

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = questions2.getRandomQuestions(MAX_QUESTIONS)
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuestions.length === 0) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    currentQuestion = availableQuestions.pop();
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        renderAnswer(choice, currentQuestion.answers[number - 1])
    });

    acceptingAnswers = true;
};

renderAnswer = (answerElement, answerData) => {
    const textEl = answerElement.getElementsByClassName('text')[0]
    const imageEl = answerElement.getElementsByClassName('image')[0]
    if (answerData.image) {
        imageEl.setAttribute('src', '/images/'+answerData.image)
        answerElement.classList.add('has_image')
    } else {
        textEl.textContent = answerData.text
        answerElement.classList.remove('has_image')
    }
}

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply
        if (currentQuestion.answers[selectedAnswer - 1].correct) {
            incrementScore(CORRECT_BONUS);
            classToApply = 'correct'
        } else {
            classToApply = 'incorrect'
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};