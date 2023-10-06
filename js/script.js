var startEl = document.querySelector("#start-page");
var startBtn = document.querySelector("#start-btn");

var questionsPg = document.querySelector("#questions-pg");
var questionTitle = document.querySelector("#questions");
var answersEl = document.querySelector("#answer-key");
var checkAnswer = document.querySelector("#correct-incorrect");

var choicesBtn = document.querySelectorAll(".choices-btn");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");

var timerEl = document.querySelector("#timer-left");
var viewHighscores = document.querySelector("#view-Highscores");

var quizFin = document.querySelector("#quiz-fin");
var submitBtn = document.querySelector("#submit-btn");
var backBtn = document.querySelector("#back-btn");
var userInitials = document.querySelector("#user-initials");

var clearHighscores = document.querySelector("#clear-hs");
var highscoresPg = document.querySelector("#highscores-pg");
var highscoresEl = document.querySelector("#highscore-list");
var scoreEl = document.querySelector("#score");

var questions = [
  {
    question: "What does HTML stand for?",
    answers: ["1. Hyper Text Markup Language", "2. High Technical Modern Language", "3. Happy Text Making Language", "4. Human Time Management Logic"],
    correctAnswer: "1",
  },
  {
    question: "Which language is used for styling web pages?",
    answers: ["1. Java", "2. Python", "3. CSS", "4. JavaScript"],
    correctAnswer: "3",
  },
  {
    question: "What is the basic building block of a web page?",
    answers: ["1. Tag", "2. Element", "3. Paragraph", "4. Page Block"],
    correctAnswer: "2",
  },
  {
    question: "What does CSS stand for?",
    answers: ["1. Computer Style Sheet", "2. Creative Style Selector", "3. Cascading Style Sheet", "4. Colorful Styling System"],
    correctAnswer: "3",
  },
  {
    question: "Which programming language is used to add interactivity to a website?",
    answers: ["1. HTML", "2. CSS", "3. JavaScript", "4. PHP"],
    correctAnswer: "3",
  },
];

var timerCount = 60;
var currQuestion = 0;
var score = 0;
var timer;

function startGame() {
  startEl.style.display = "none";
  questionsPg.style.display = "block"; 
  currQuestion = 0;
  startTimer();
  loadQuestions(currQuestion);
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerEl.textContent = "Time: " + timerCount;
    if (timerCount <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function loadQuestions() {
  questionTitle.textContent = questions[currQuestion].question;
  answer1.textContent = questions[currQuestion].answers[0];
  answer2.textContent = questions[currQuestion].answers[1];
  answer3.textContent = questions[currQuestion].answers[2];
  answer4.textContent = questions[currQuestion].answers[3];
}

function answerCheck(event) {
  event.preventDefault();
  checkAnswer.style.display = "block";
  setTimeout(function () {
    checkAnswer.style.display = "none";
  }, 2000);

  if (questions[currQuestion].correctAnswer === event.target.value) {
    checkAnswer.textContent = "Correct";
    score = score + 25;
  } else {
    timerCount = timerCount - 15;
    checkAnswer.textContent = "Wrong";
  }

  currQuestion++;
  if (currQuestion === questions.length) {
    clearInterval(timer);
    endGame();
  } else {
    loadQuestions();
  }
}

function endGame() {
  questionsPg.style.display = "none";
  quizFin.style.display = "block";
  scoreEl.textContent = score + " / 125";
  timerEl.style.display = "none";
}

function showHighscores() {
  var scores = readScores();
  highscoresPg.style.display = "block";
  questionsPg.style.display = "none";
  startEl.style.display = "none";
  quizFin.style.display = 'none';

  for (var i = 0; i < scores.length; i++) {
    var scoreList = document.createElement('li');
    scoreList.textContent = scores[i].name + ":  " + scores[i].score;
    highscoresEl.appendChild(scoreList);
  }
}

function storedScores() {
  var initials = userInitials.value;
  var nameScore = {
    name: initials,
    score: score,
  };
  var scoreArr = readScores() || [];
  scoreArr.push(nameScore);
  scoreArr.sort((a, b) => b.score - a.score);
  var scoreString = JSON.stringify(scoreArr);
  localStorage.setItem('scores', scoreString);
  showHighscores();
}

function readScores() {
  var getScores = localStorage.getItem('scores');
  var parseScores = JSON.parse(getScores) || [];
  return parseScores;
}

function clearHS() {
  highscoresEl.innerHTML = '';
}

function refresh() {
  window.location.reload();
}

// Event Listeners
startBtn.addEventListener("click", startGame);
viewHighscores.addEventListener("click", showHighscores);
submitBtn.addEventListener('click', storedScores);
clearHighscores.addEventListener('click', clearHS);
backBtn.addEventListener('click', refresh);

choicesBtn.forEach(function (click) {
  click.addEventListener("click", answerCheck);
});
