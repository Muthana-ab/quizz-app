// Team questions
const questions =

    {
    football: {
        "Real Madrid": [
            { question: "Who is the manager of Real Madrid?", options: ["Zidane", "Carlo Ancelotti", "Pep Guardiola", "Jurgen Klopp"], correctAnswer: 1 },
            { question: "Which year did Real Madrid win the Champions League in the 21st century?", options: ["2000", "2014", "2016", "2018"], correctAnswer: 1 },
            { question: "Which stadium is Real Madrid's home?", options: ["Camp Nou", "Old Trafford", "Santiago Bernabeu", "Allianz Arena"], correctAnswer: 2 },
            { question: "How many times has Real Madrid won the La Liga title?", options: ["25", "33", "24", "40"], correctAnswer: 1 },
            { question: "Which of these players did NOT play for Real Madrid?", options: ["David Beckham", "Kaka", "Sergio Ramos", "Lionel Messi"], correctAnswer: 3 }
        ],
        "Barcelona": [
            { question: "Who is the manager of Barcelona?", options: ["Hansi Flick", "Ronald Koeman", "Pep Guardiola", "Luis Enrique"], correctAnswer: 0 },
            { question: "Which year did Barcelona win their first Champions League?", options: ["1992", "2006", "2011", "2009"], correctAnswer: 0 },
            { question: "Who is Barcelona's all-time top scorer?", options: ["Neymar", "Messi", "Luis Suarez", "Iniesta"], correctAnswer: 1 },
            { question: "Which color is predominantly associated with Barcelona's home kit?", options: ["Red and Blue", "Yellow and Blue", "White and Red", "Green and Black"], correctAnswer: 0 },
            { question: "Who is the president of Barcelona?", options: ["Joan Laporta", "Florentino Perez", "Andrea Agnelli", "Karl-Heinz Rummenigge"], correctAnswer: 0 }
        ],
        "Manchester United": [
            { question: "Who is the manager of Manchester United?", options: ["Ole Gunnar Solskjaer", "Jose Mourinho", "Sir Alex Ferguson", "Erik ten Hag"], correctAnswer: 3 },
            { question: "Which year did Manchester United last win the Premier League?", options: ["2012", "2013", "2015", "2018"], correctAnswer: 1 },
            { question: "Which stadium is Manchester United's home?", options: ["Anfield", "Old Trafford", "Etihad Stadium", "Stamford Bridge"], correctAnswer: 1 },
            { question: "Who is Manchester United's all-time top scorer?", options: ["Wayne Rooney", "Cristiano Ronaldo", "George Best", "Eric Cantona"], correctAnswer: 0 },
            { question: "Which Manchester United player is known as 'The Red Devil'?", options: ["Wayne Rooney", "Ryan Giggs", "Paul Pogba", "David De Gea"], correctAnswer: 0 },
        ]
    
    }
};

let currentQuestionIndex = 0;
let score = 0;
let selectedTopic = "football";
let selectedTeam = "";
let currentQuestions = [];
let timer = 30;
let timerInterval;

function startQuiz() {
    selectedTopic = document.getElementById("topic-select").value;
    selectedTeam = document.getElementById("team-select").value;

    if (!selectedTeam) {
        alert("Please select a team to start the quiz.");
        return;
    }

    currentQuestions = questions[selectedTopic][selectedTeam];
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").style.display = "none";

    loadQuestion();
    startTimer(); 
}

function loadQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    document.getElementById("question").innerText = question.question;

    const options = document.getElementById("options");
    options.innerHTML = "";
    question.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.classList.add("option");
        optionButton.innerText = option;
        optionButton.onclick = () => checkAnswer(index, optionButton);
        options.appendChild(optionButton);
    });

    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("next-btn").style.display = "none";
}

function startTimer() {
    timer = 30;
    timerInterval = setInterval(function() {
        document.getElementById("timer").innerText = `Time Left: ${timer}s`;
        if (timer === 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
        timer--;
    }, 1000);
}

function checkAnswer(selectedIndex, optionButton) {
    const correctAnswer = currentQuestions[currentQuestionIndex].correctAnswer;
    const options = document.querySelectorAll(".option");

    options.forEach(option => {
        option.disabled = true;
    });

    if (selectedIndex === correctAnswer) {
        score++;
        optionButton.classList.add("correct");
    } else {
        optionButton.classList.add("incorrect");
    }

    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    clearInterval(timerInterval); 

    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
        startTimer(); 
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("result").innerHTML = `<h2>Quiz Completed!</h2><p>Your score: ${score} out of ${currentQuestions.length}</p>`;
}

function populateTeams() {
    const topic = document.getElementById("topic-select").value;
    const teamSelect = document.getElementById("team-select");

    let teams = [];
    if (topic === "football") {
        teams = Object.keys(questions[topic]);
    }

    teamSelect.innerHTML = "<option value=''>Select Team</option>"; 

    teams.forEach(team => {
        const option = document.createElement("option");
        option.value = team;
        option.innerText = team;
        teamSelect.appendChild(option);
    });
}


window.onload = function() {
    populateTeams();
};
