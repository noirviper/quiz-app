"use strict";
let questionCount = 0;
    let submitBtn = $('.submit-btn');
    let feedback = $('.feedback-popup');
    let results = $('.results-container');
const questionSTORE = [
    {
        "question" : "Which of these would be an ideal weekend activity?",
        "values" : [0, 2, 1, 3],
        "answers" : ["Go to Church","Plan a huge heist","Workout and practice MMA techniques","Study"]
    },
    {
        "question" : "Out of these options what would your dream job be?",
        "values" : [1, 2, 3, 4],
        "answers" : ["Medical profesional who heals people","Join the military","Locksmith","A mad scientist"]
    },
    {
        "question" : "Which of these activities would you most enjoy?",
        "values" : [1, 2, 3, 4],
        "answers" : ["Hide and seek","Chess","Capture the flag","Bible study"]
    },
    {
        "question" : "Choose one of the following:",
        "values" : [1, 2, 3, 4],
        "answers" : ["Shadow","Fire","Steel","Light"]
    },
    {
        "question" : "You are forced into a fight, what is your strategy?",
        "values" : [1, 2, 3, 4],
        "answers" : ["Stab them in the back","Find the nearest weapon and get to work","Light everything on fire","Pray for divine intervention"]
    },
    {
        "question" : "Which of these would be an ideal weekend activity?",
        "values" : [1, 2, 3, 4],
        "answers" : ["Go to Church","Plan a huge heist","Workout and practice MMA techniques","Study"]
    },
    {
        "question" : "A monster jumps out of the shadows, you draw your weapon. What is it?",
        "values" : [1, 2, 3, 4],
        "answers" : ["A sword","A spell book","A mace","A dagger"]
    },
    {
        "question" : "What is your character flaw?",
        "values" : [1, 2, 3, 4],
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
    return `<form class="questions">
            <label for="answers" class="question">${obj[index]["question"]}</label><br>
            <input type="radio" name="q1" value="${obj[index]["values"][0]}">${obj[0]["answers"][0]}<br>
            <input type="radio" name="q1" value="${obj[index]["values"][1]}">${obj[0]["answers"][1]}<br>
            <input type="radio" name="q1" value="${obj[index]["values"][2]}">${obj[0]["answers"][2]}<br>
            <input type="radio" name="q1" value="${obj[index]["values"][3]}">${obj[0]["answers"][3]}<br>
            <button type="submit" class="submit-btn">Submit</button>
        </form>`;
}

//submit answer
function submitQuestion() {
    $(".submit-btn").on('click', function(e) {
        e.preventDefault();
        console.log("No Submit");
        let input = $('input:checked').val();
        console.log(input);
        updateScore(answerSTORE, input);
    });
}

function updateScore(obj,ind) {
    obj[ind].value += 1;
    console.log(obj);
}

//render quiz
function renderQuiz(obj, ind) {
    let quizContainer = $('.question-container');
    quizContainer.append(generateQuestion(obj, ind));
}

function initQuiz(){
    feedback.hide();
    results.hide();
    renderQuiz(questionSTORE, questionCount);
    submitQuestion();
}

$(initQuiz);