"use strict";
let questionCount = 0;
let submitBtn = $('.submit-btn');
let feedback = $('.feedback-popup');
let results = $('.results-container');
let progressTL = gsap.timeline();

progressTL
  .fromTo($('.progress-bar'), 0.3, {width:0}, {width:"10%"})
  .to($(".q1"), {background: "black"})
  .addPause()
  .to($('.progress-bar'), 0.3, {width:"25%"})
  .to($(".q2"), {background: "black"})
  .addPause()
  .to($('.progress-bar'), 0.3, {width:"37%"})
  .to($(".q3"), {background: "black"})
  .addPause()
  .to($('.progress-bar'), 0.3, {width:"50%"})
  .to($(".q4"), {background: "black"})
  .addPause()
  .to($('.progress-bar'), 0.3, {width:"63%"})
  .to($(".q5"), {background: "black"})
  .addPause()
  .to($('.progress-bar'), 0.3, {width:"75%"})
  .to($(".q6"), {background: "black"})
  .addPause()
  .to($('.progress-bar'), 0.3, {width:"87%"})
  .to($(".q7"), {background: "black"});



const imagesArr = [
  "/images/dm.jpg",
  "/images/evil-dm.jpg"
];

const responseArr = [
  "Hmmmm, interesting choice. I will have to keep an eye on you",
  "Well, that isn't what I would've picked.",
  "Are you sure you know what you are doing?",
  "Fun, this is going to be fun..."
]

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
        "question" : "Which of these would be an ideal weekend activity?",
        "values" : [0, 2, 1, 3],
        "answers" : ["Go to Church","Plan a huge heist","Workout and practice MMA techniques","Study"]
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
        class: "Cleric",
        value: 0
    },
    {
        class: "Fighter",
        value:  0
    },
    {
        class: "Rouge",
        value : 0
    },
    {
        class: "Wizard",
        value : 0
    }
]

function generateQuestion(obj,index) {
    return `
            <label for="answers" class="question">${obj[index]["question"]}</label><br>
            <input type="radio" name="question" value="${obj[index]["values"][0]}">${obj[index]["answers"][0]}<br>
            <input type="radio" name="question" value="${obj[index]["values"][1]}">${obj[index]["answers"][1]}<br>
            <input type="radio" name="question" value="${obj[index]["values"][2]}">${obj[index]["answers"][2]}<br>
            <input type="radio" name="question" value="${obj[index]["values"][3]}">${obj[index]["answers"][3]}<br>
            <button type="submit" class="submit-btn">Submit</button>
        `;
}

//submit answer
function submitQuestion() {
    $(".questions").submit(function(e) {
        e.preventDefault();
        let input = $('input:checked').val();
        updateScore(answerSTORE, input);
        updateProgress();
        provideFeedback(imagesArr, responseArr);
        
    });
}

//update question user is on
function updateProgress() {
  console.log(questionSTORE.length);
  if(questionCount >= questionSTORE.length-1) {
    questionCount = 0;
    
  } else {
    questionCount++;
  }
  
}

function provideFeedback(arr1, arr2) {
  let imgIndex = Math.round(Math.random());
  let responseIndex = Math.floor(Math.random() * ((arr2.length-1)-0+1));

  feedback.append(`<img class="dm-img" src="${arr1[imgIndex]}" alt="feedback image">
        <div class="feedback-text"><p>${arr2[responseIndex]}</p></div>
        <button type="button" class="next-question" onClick="nextQuestion()">Next Question</button>`);
  feedback.show();
}

function nextQuestion() {
  renderQuiz(questionSTORE,questionCount);
  feedback.hide();
  feedback.html('');
  progressTL.play();

}

function updateScore(obj,ind) {
    obj[ind].value += 1;
    console.log(obj);
}

//render quiz
function renderQuiz(obj, ind) {
    let quizContainer = $('.questions');
    quizContainer.html('');
    quizContainer.append(generateQuestion(obj, ind));
}

function initQuiz(){
    feedback.hide();
    results.hide();
    renderQuiz(questionSTORE, questionCount);
    progressTL.play(0);
    submitQuestion();
    
}

$(initQuiz);