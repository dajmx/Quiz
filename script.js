const viewScore = document.getElementById("view-score");
const secondsSpace = document.getElementById("seconds-left");
const btnStart = document.getElementById("start-quiz");
const btnRestart = document.getElementById("restart-button");
const btnClear = document.getElementById("clear-button");
const questionContent =document.getElementById("questions-container");
const check = document.getElementById("check-container");
const doneQuiz = document.getElementById("done-quiz");
const scoreListContainer = document.getElementById("all-list-score");
const submitButton = document.getElementById("submit");
const firstPage = document.getElementById("principalPage");
const containerScore = document.getElementById("score-container");
const allScore = document.getElementById("all-score");

e=0;
score = 0;
paragraphs=[];
listScore=[];
arrayParagraph="";
timeLeft= 31;
pageUpdate=0;
value="";

let timer;
let timerInterval;

const index = [
    {
      question: "¿Qué significa CSS en desarrollo web?",
      options: [
        "Cascading Style Sheets",
        "Central Style Sheets",
        "Creative Style Sheets",
        "Computer Style Sheets"
      ],
      correctAnswer: "Cascading Style Sheets"
    },
    {
      question: "¿Cuál de las siguientes opciones NO es un lenguaje de programación web?",
      options: ["HTML", "JavaScript", "Python", "Java"],
      correctAnswer: "Python"
    },
    {
      question: "¿Qué lenguaje se utiliza para dar interactividad a una página web?",
      options: ["HTML", "CSS", "JavaScript", "PHP"],
      correctAnswer: "JavaScript"
    },
    {
      question: "¿Cuál de las siguientes etiquetas HTML se utiliza para crear un párrafo?",
      options: ["<p>", "<h1>", "<div>", "<span>"],
      correctAnswer: "<p>"
    },
    {
      question: "¿Qué significa HTML en desarrollo web?",
      options: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "HyperText and links Markup Language",
        "HyperTransfer Markup Language"
      ],
      correctAnswer: "HyperText Markup Language"
    }
  ];
  

btnStart.addEventListener('click',init)

function init() {
    
    firstPage.classList.add("hide");

    questionContent.classList.remove("hide");
    allScore.classList.add("hide")
    timeLeft = 30;
    showQAndO();
    
    startTimer();
}

function showQAndO(){
    check.innerHTML=("");

    
  if (  pageUpdate == e){
        
        const questionIndex = index[e].question
        const h2El = document.createElement("h2");
        h2El.textContent = `${questionIndex}`;
        questionContent.appendChild(h2El);
        
        for (let i= 0;i<index[e].options.length; i++){
       
        const anwersIndex = index[e].options[i];
        const pContent = document.createElement("p");
        pContent.textContent = `${anwersIndex}`;
        pContent.classList.add("p");
        pContent.classList.add("button");
        questionContent.appendChild(pContent);
        paragraphs.push(pContent);
              
        pContent.addEventListener('click', function () {
            
            if (pContent.textContent === index[e].correctAnswer) {
              score=score+1;
              value=true;
              
            } else {
              value=false;
              
              
            }
            next();
            
          });
    
    
        }   
  }
}

function next() {
        
  e++;
  pageUpdate++;
  if (e < index.length) {
      questionContent.innerHTML=("");
      showQAndO();
      validation(value);
  } else if( e === index.length){
    clearInterval(timerInterval);
    allDoneQuiz();

  }
            
}

function allDoneQuiz(){         
  containerScore.textContent=(`Your final score is ${score}/${index.length}`)
  questionContent.innerHTML=("");
  doneQuiz.classList.remove("hide");
}

function validation(value){
    let validationEl;
    
    if(value==true){
        const correct = document.createElement("p");
        correct.textContent = "correcto";
        correct.classList.add("correct");
        check.appendChild(correct)
        validationEl=correct;

    }else{
        const incorrect = document.createElement("p");
        incorrect.textContent = "incorrecto";
        incorrect.classList.add("incorrect");
        check.appendChild(incorrect)
        validationEl=incorrect;
        timeLeft=timeLeft-5
    }

    if(check.innerHTML===""){
    
    }else{
        setTimeout(() => {
          check.removeChild(validationEl);
        }, 500);
    }

}

submitButton.addEventListener("click", showHighscore)
  
function showHighscore (){
  const nameInput = document.getElementById("name");
     const inputValue = nameInput.value;
     const scoreContainer = document.getElementById("score-container");

     
     const obj = {
      name: inputValue,
      puntuation: score
    };

    listScore.push(obj);
    listScore.sort((a, b) => b.puntuation - a.puntuation);
    scoreListContainer.innerHTML = '';
    
    listScore.forEach(scoreObj => {
      const listItem = document.createElement('p');
      listItem.textContent = `${scoreObj.name} ${scoreObj.puntuation}/${index.length}`;
      scoreListContainer.appendChild(listItem);
    });
   
     scoreContainer.classList.remove("p");
     firstPage.classList.add("hide");
     doneQuiz.classList.add("hide");
     allScore.classList.remove("hide")
    
     localStorage.setItem("listScore", JSON.stringify(listScore));
}

function viewHighscore (){
     firstPage.classList.add("hide");
    
     firstPage.classList.add("hide");
     doneQuiz.classList.add("hide");
     allScore.classList.remove("hide")
    
}

 btnRestart.addEventListener("click", function () {
    score=0
    e=0
    pageUpdate=0;
    
    
    clearInterval(timerInterval);
    firstPage.classList.remove("hide");
    allScore.classList.add('hide')
    
 });

 btnClear.addEventListener("click", function () {
  scoreListContainer.innerHTML = "";
    localStorage.removeItem("listScore");
 });



 function startTimer() {
 
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      secondsSpace.textContent = `${timeLeft}s`;
    } else {
      clearInterval(timerInterval);
      e = 0;
      pageUpdate = 0;
      timeLeft = 31;
      allScore.classList.add("hide");
      allDoneQuiz();
    }
  }, 1000);
}

viewScore.addEventListener("click",viewHighscore)


