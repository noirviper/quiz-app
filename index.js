"use strict";
let questionCount = 0;
let submitBtn = $('.submit-btn');
let feedback = $('.feedback-popup');
let results = $('.results-container');
let progressTL = gsap.timeline({paused:true});

progressTL
  .to($('.progress-bar'), 0.3, {width:"83%", delay:1.5})
  .to($(".q1"), {color: "white", textShadow: "2px 2px black"})
  .addPause()
  .to($('.progress-bar'), 0.3, {width:"68%"})
  .to($(".q2"), {color: "white", textShadow: "2px 2px black"})
  .addPause()
  .to($('.progress-bar'), 0.3, {width:"57%"})
  .to($(".q3"), {color: "white", textShadow: "2px 2px black"})
  .addPause()
  .to($('.progress-bar'), 0.3, {width:"44%"})
  .to($(".q4"), {color: "white", textShadow: "2px 2px black"})
  .addPause()
  .to($('.progress-bar'), 0.3, {width:"30%"})
  .to($(".q5"), {color: "white", textShadow: "2px 2px black"})
  .addPause()
  .to($('.progress-bar'), 0.3, {width:"18%"})
  .to($(".q6"), {color: "white", textShadow: "2px 2px black"})
  .addPause()
  .to($('.progress-bar'), 0.3, {width:"0"})
  .to($(".q7"), {color: "white", textShadow: "2px 2px black"});


const imagesArr = [
  "images/dm.jpg",
  "images/evil-dm.jpg"
];

const responseArr = [
  "Hmmmm, interesting choice. I will have to keep an eye on you",
  "Well, that isn't what I would've picked.",
  "Are you sure you know what you are doing?",
  "Fun, this is going to be fun..."
];

const questionSTORE = [
    {
        "question" : "Which of these would be an ideal weekend activity?",
        "values" : [0, 2, 1, 3],
        "answers" : ["Go to Church","Plan a huge heist","Workout and practice MMA techniques","Study"]
    },
    {
        "question" : "Out of these options what would your dream job be?",
        "values" : [0, 1, 2, 3],
        "answers" : ["Medical profesional who heals people","Join the military","Locksmith","A mad scientist"]
    },
    {
        "question" : "Which of these activities would you most enjoy?",
        "values" : [2, 3, 1, 0],
        "answers" : ["Hide and seek","Chess","Capture the flag","Bible study"]
    },
    {
        "question" : "Choose one of the following:",
        "values" : [2, 3, 1, 0],
        "answers" : ["Shadow","Fire","Steel","Light"]
    },
    {
        "question" : "You are forced into a fight, what is your strategy?",
        "values" : [2, 1, 3, 0],
        "answers" : ["Stab them in the back","Find the nearest weapon and get to work","Light everything on fire","Pray for divine intervention"]
    },
    {
        "question" : "A monster jumps out of the shadows, you draw your weapon. What is it?",
        "values" : [1, 3, 0, 2],
        "answers" : ["A sword","A spell book","A mace","A dagger"]
    },
    {
        "question" : "What is your character flaw?",
        "values" : [2, 0, 3, 1],
        "answers" : ["You are a kleptomaniac","You rely too much on your faith","You think you know everything","You are quick to start a fight"]
    }
];

const answerSTORE = [
    {
        rpgClass: "Cleric",
        value: 0
    },
    {
        rpgClass: "Fighter",
        value:  0
    },
    {
        rpgClass: "Rouge",
        value : 0
    },
    {
        rpgClass: "Wizard",
        value : 0
    }
];

function generateQuestion(obj,index) {
    return `<fieldset>
            <legend class="question">${obj[index]["question"]}</legend>
            <div>
            <input id="a1" type="radio" name="question" value="${obj[index]["values"][0]}"><label for="a1">${obj[index]["answers"][0]}</label>
            </div>
            <div>
            <input type="radio" name="question" value="${obj[index]["values"][1]}">
            <label for="a2">${obj[index]["answers"][1]}</label>
            </div>
            <div>
            <input type="radio" name="question" value="${obj[index]["values"][2]}">
            <label for="a3">${obj[index]["answers"][2]}</label>
            </div>
            <div>
            <input type="radio" name="question" value="${obj[index]["values"][3]}">
            <label for="a4">${obj[index]["answers"][3]}</label>
            </div>
            <button type="submit" class="submit-btn">Submit</button>
            </fieldset>
            
        `;
  
}

//submit answer
function submitQuestionHandler() {
    $(".questions").submit(function(e) {
        e.preventDefault();
        let input = $('input:checked').val();
        updateScore(answerSTORE, input);
        updateProgress();
    });
}

//update question user is on
function updateProgress() {
  
  if(questionCount >= questionSTORE.length-1) {
    questionCount = 0;
    calcResult(answerSTORE);
    
  } else {
    questionCount++;
    provideFeedback(imagesArr, responseArr);
  }
  
}

function provideFeedback(arr1, arr2) {
  const imgIndex = Math.round(Math.random());
  const responseIndex = Math.floor(Math.random() * ((arr2.length-1)-0+1));

  feedback.html(`<div class="feedback-inner"><img class="dm-img" src="${arr1[imgIndex]}" alt="feedback image">
        <div class="feedback-text"><p>${arr2[responseIndex]}</p></div>
        <button type="button" class="next-question">Next Question</button></div>`);
  feedback.show();
}

function nextQuestionHandler() {
  $('.feedback-popup').on('click', '.next-question', function(e){
    renderQuiz(questionSTORE,questionCount);
    feedback.hide();
    feedback.html('');
    progressTL.play();
    
  });
}

function updateScore(obj,ind) {
    obj[ind].value += 1;
    
}

function calcResult(obj) {
  
  let largest = obj[0].value;
  let result = "";
  for (let i = 0; i < obj.length; i++) {
     if(largest > obj[i].value) {
        
      } else {
        largest = obj[i].value;
        result = obj[i].rpgClass;
    }

  }
  
  displayResults(result);
}

function resetResult(obj,num) {
  for (let i = 0; i < obj.length; i++) {
     obj[i].value = 0;
  }
  num = 0;
}

function displayResults(str) {
  let img = str.toLowerCase()+".png";
  results.append(`<div class="results-inner"><img src="images/${img}" alt="results image">
        <p class="results-feedback">Your Fantasy RPG class is: ${str}</p>
        <button type="button" class="restart-quiz">Take Quiz Again?</button></div>`);
    results.show();
  }

function restartQuizHandler() {
  $('.results-container').on('click', '.restart-quiz', function(e) {
    console.log("Initiate restart");
      resetResult(answerSTORE, questionCount);
      startQuiz();
  });
}

//render quiz
function renderQuiz(obj, ind) {
    let quizContainer = $('.questions');
    quizContainer.html('');
    quizContainer.append(generateQuestion(obj, ind));
    TweenMax.staggerFrom([$('.question'),$('input'), $('label')], 0.3, {autoAlpha:0, xPercent: -10},0.2);
}

function startQuizHandler() {
  $('.start-quiz-container').on('click', '.start-quiz', function(e){
    e.preventDefault();
    $('.start-quiz-container').hide();
    startQuiz();
  })
}

function startQuiz() {
    clearContainers();
    progressTL.play(0);
    renderQuiz(questionSTORE, questionCount);
}

function clearContainers() {
    feedback.hide();
    results.hide();
    feedback.html('');
    results.html('');
}

function initQuiz(){
    clearContainers();
    startQuizHandler();
    submitQuestionHandler();
    nextQuestionHandler();
    restartQuizHandler();
}
  

  



$(initQuiz);


