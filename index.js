"use strict";
let questionCount = 0;
let score = 0;
let submitBtn = $('.submit-btn');
let feedback = $('.feedback-popup');
let results = $('.results-container');
let progressTL = gsap.timeline({paused:true});
let scoreTL = gsap.timeline({paused: true});


progressTL
    .from($('.bg-red, .bg-blue'), 0.3, {scaleY:0})
    .addPause()
    .to($('.bg-red'), 0.3, {scaleY:0.3, scaleX:0.8})
    .addPause()
    .to($('.bg-red'), 0.3, {scaleY:0.5, scaleX:1})
    .addPause()
    .to($('.bg-red'), 0.3, {scaleY:0.6, scaleX:1})
    .addPause()
    .to($('.bg-red'), 0.3, {scaleY:0.7, scaleX:1})
    .addPause()
    .to($('.bg-red'), 0.3, {scaleY:0.8, scaleX:1})
    .addPause()
    .to($('.bg-red'), 0.3, {scaleY:1, scaleX:1});

scoreTL
    .to($('.bg-blue'), 0.3, {scaleY:0.3, scaleX:0.8}, "1")
    .addPause()
    .to($('.bg-blue'), 0.3, {scaleY:0.5, scaleX:1}, "2")
    .addPause()
    .to($('.bg-blue'), 0.3, {scaleY:0.6, scaleX:1}, "3")
    .addPause()
    .to($('.bg-blue'), 0.3, {scaleY:0.7, scaleX:1}, "4")
    .addPause()
    .to($('.bg-blue'), 0.3, {scaleY:0.8, scaleX:1}, "5")
    .addPause()
    .to($('.bg-blue'), 0.3, {scaleY:0.9, scaleX:1}, "6");

const questionSTORE = [
    {
        "question" : "What is an initiative roll?",
        "answers" : ["A baked good","A dice roll to start combat","A check to see if you succeed or fail","This isn't a thing in D&D"],
        "correct" : "A dice roll to start combat"
    },
    {
        "question" : "What dice do you roll for an attack?",
        "answers" : ["D6","D8","D10","D20"],
        "correct" : "D20"
    },
    {
        "question" : "What does it mean to have disadvantage?",
        "answers" : ["You play with a blindfold","You roll 2 D20s and take the lower value","You roll all the dice","None of the above"],
        "correct" : "You roll 2 D20s and take the lower value"
    },
    {
        "question" : "What stat affects a Wizard's spell casting?",
        "answers" : ["Strength","Dexterity","Wisdom","Intelligence"],
        "correct" : "Intelligence"
    },
    {
        "question" : "You want to woo a dragon, which class is best suited for this task?",
        "answers" : ["A Paladin","A Warlock","A Bard","A Rouge"],
        "correct" : "A Bard"
    },
    {
        "question" : "Who created D&D?",
        "answers" : ["Gary Gygax & Dave Arneson","Jason Bulmahn","Mike Pondsmith","Mark Rein-Hagen"],
        "correct" : "Gary Gygax & Dave Arneson"
    },
    {
        "question" : "Which D&D races can see in the dark?",
        "answers" : ["Elves","Dwarves","Gnomes","All of the above"],
        "correct" : "All of the above"
    }
];


function generateQuestion(obj,index) {
    return `<fieldset>
            <legend class="question">${obj[index]["question"]}</legend>
            <div>
            <input id="a1" type="radio" name="question" value="${obj[index]["answers"][0]}"><label for="a1">${obj[index]["answers"][0]}</label>
            </div>
            <div>
            <input type="radio" name="question" value="${obj[index]["answers"][1]}">
            <label for="a2">${obj[index]["answers"][1]}</label>
            </div>
            <div>
            <input type="radio" name="question" value="${obj[index]["answers"][2]}">
            <label for="a3">${obj[index]["answers"][2]}</label>
            </div>
            <div>
            <input type="radio" name="question" value="${obj[index]["answers"][3]}">
            <label for="a4">${obj[index]["answers"][3]}</label>
            </div>
            <button type="submit" class="submit-btn">Submit</button>
            </fieldset>
            
        `;
  
}

function submitQuestionHandler() {
    $(".questions").submit(function(e) {
        e.preventDefault();
        let input = $('input:checked').val();
        updateScore(questionSTORE, input, questionCount);
        updateProgress();
    });
}

function updateProgress() {
  
  if(questionCount >= questionSTORE.length-1) {
    questionCount = 0;
    
    
  } else {
    questionCount++;
    $('.current-prog .num').text(`${questionCount+1}/${questionSTORE.length}`)
    
  }
  
}



function nextQuestionHandler() {
  $('.feedback-popup').on('click', '.next-question', function(e){
    renderQuiz(questionSTORE,questionCount);
    feedback.hide();
    feedback.html('');
    progressTL.play();
    scoreTL.play(score);
    
  });
}

function updateScore(obj, str, num) {
    if (str == obj[num].correct) {
        score += 1;
        $('.score .num').text(`${score}/${questionSTORE.length}`);
        provideFeedback("correct", questionSTORE);
    } else {
        provideFeedback("incorrect", questionSTORE)
    }
    
    
}

function provideFeedback(str,obj) {
    if (str == "correct" && questionSTORE.length-1 > questionCount) {
      feedback.html(`<div class="feedback-inner"><img class="dm-img" src="images/dm.jpg" alt="feedback image">
      <div class="feedback-text"><p>You Are Correct!</p></div>
      <button type="button" class="next-question">Next Question</button></div>`);
      feedback.show(); 
    } else if (str == "incorrect" && questionSTORE.length-1 > questionCount) {
      feedback.html(`<div class="feedback-inner"><img class="dm-img" src="images/evil-dm.jpg" alt="feedback image">
      <div class="feedback-text"><p>You have offended the Dungeon Master with an incorrect answer</p></div>
      <div class="feedback-text"><p>The CORRECT ANSWER WAS: ${obj[questionCount].correct}</p></div>
      <button type="button" class="next-question">Next Question</button></div>`);
  feedback.show();
    } else {
        displayResults(score);
    }
  
    
  }

function resetResult() {
  score = 0
}

function displayResults(num) {
  if(num == questionSTORE.length) {
    results.append(`<div class="results-inner"><img src="images/dm.jpg" alt="results image">
        <h3 class="results-feedback">Your Are The Ultimate Dungeon Master!!!</h3>
        <h4>${score}/${questionSTORE.length}</h4>
        <button type="button" class="restart-quiz">Take Quiz Again?</button></div>`);
    results.show();
  } else if (num > 4) {
    results.append(`<div class="results-inner"><img src="images/dm.jpg" alt="results image">
    <h3 class="results-feedback">Your Are An Adequate Dungeon Master</h3>
    <h4>${score}/${questionSTORE.length}</h4>
    <button type="button" class="restart-quiz">Take Quiz Again?</button></div>`);
results.show();
  } else if (num > 0 && num <= 4) {
    results.append(`<div class="results-inner"><img src="images/evil-dm.jpg" alt="results image">
    <h3 class="results-feedback">Your Dungeon Master Knowledge Needs Some Work...</h3>
    <h4>${score}/${questionSTORE.length}</h4>
    <button type="button" class="restart-quiz">Take Quiz Again?</button></div>`);
results.show();
  } else {
    results.append(`<div class="results-inner"><img src="images/evil-dm.jpg" alt="results image">
    <h3 class="results-feedback">Your Should Be Ashamed!</h3>
    <h4>${score}/${questionSTORE.length}</h4>
    <button type="button" class="restart-quiz">Take Quiz Again?</button></div>`);
results.show();
  }

  
}

function restartQuizHandler() {
  $('.results-container').on('click', '.restart-quiz', function(e) {
      resetResult();
      startQuiz();
  });
}

function renderQuiz(obj, ind) {
    let quizContainer = $('.questions');
    quizContainer.html('');
    quizContainer.append(generateQuestion(obj, ind));
    
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
    $('.current-prog .num').text(`${questionCount+1}/${questionSTORE.length}`);
    $('.score .num').text(`${score}/${questionSTORE.length}`);
    renderQuiz(questionSTORE, questionCount);
}

function clearContainers() {
    TweenMax.set($('.bg-red, .bg-blue'),{scaleX:0.8, scaleY:0.2, translateX:"-50%",transformOrigin: "50% 90%"});
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


