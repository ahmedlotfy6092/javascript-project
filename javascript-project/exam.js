class Quiz {
    constructor(questions) {
        this.questions = this.shuffleArray(questions);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timer = null;
        this.username = "";
    }

    startQuiz() {
        this.username = document.getElementById("username").value.trim();
        let errorSpan = document.getElementById("usernameError");
        let inputField = document.getElementById("username");

        if (!this.validateUsername(this.username)) {
            errorSpan.innerText = "Please enter a valid name (only letters and spaces).";
            inputField.classList.add("error");
            return;
        }

        errorSpan.innerText = "";
        inputField.classList.remove("error");

        document.getElementById("startScreen").classList.add("hidden");
        document.getElementById("quizScreen").classList.remove("hidden");

        this.startTimer();
        this.showQuestion();
    }

    validateUsername(username) {
        return /^[a-zA-Z ]+$/.test(username);
    }

    startTimer() {
        let timeLeft = 60;
        this.timer = setInterval(() => {
            timeLeft--;
            document.getElementById("timerBar").style.width = (timeLeft / 60) * 100 + "%";
            if (timeLeft <= 0) this.endQuiz();
        }, 1000);
    }

    showQuestion() {
        let q = this.questions[this.currentQuestionIndex];
        document.getElementById("questionText").innerText = q.title;
        document.getElementById("questionImage").src = `https://picsum.photos/400/200?random=${Math.random()}`;

        let optionsContainer = document.getElementById("optionsContainer");
        optionsContainer.innerHTML = "";
        document.getElementById("nextBtn").disabled = true;

        let shuffledAnswers = this.shuffleArray([...q.answers]);
        shuffledAnswers.forEach(answer => {
            let btn = document.createElement("button");
            btn.innerText = answer;
            btn.onclick = () => this.selectAnswer(btn, answer);
            optionsContainer.appendChild(btn);
        });
    }

    selectAnswer(button, answer) {
        document.querySelectorAll(".options button").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        document.getElementById("nextBtn").disabled = false;

        this.selectedAnswer = answer;
        if (answer === this.questions[this.currentQuestionIndex].correct) this.score++;
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion();
        } else {
            this.endQuiz();
        }
    }

    endQuiz() {
        clearInterval(this.timer);
        document.getElementById("quizScreen").classList.add("hidden");
        document.getElementById("resultScreen").classList.remove("hidden");
        document.getElementById("scoreText").innerText = `${this.username}, you scored ${this.score} out of ${this.questions.length}`;
    }

    shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}

const questions = [
    { title: "What is the capital of France?", answers: ["Paris", "London", "Berlin"], correct: "Paris" },
    { title: "Which planet is known as the Red Planet?", answers: ["Mars", "Jupiter", "Earth"], correct: "Mars" },
    { title: "How many legs does a spider have?", answers: ["8", "6", "4"], correct: "8" },
    { title: "What is the largest ocean on Earth?", answers: ["Pacific", "Atlantic", "Indian"], correct: "Pacific" },
    { title: "Which is the longest river in the world?", answers: ["Nile", "Amazon", "Yangtze"], correct: "Nile" },
    { title: "What is the chemical symbol for gold?", answers: ["Au", "Ag", "Pb"], correct: "Au" },
    { title: "Who wrote 'Hamlet'?", answers: ["Shakespeare", "Hemingway", "Dickens"], correct: "Shakespeare" },
    { title: "Which gas do plants use for photosynthesis?", answers: ["Carbon Dioxide", "Oxygen", "Nitrogen"], correct: "Carbon Dioxide" },
    { title: "What is the capital of Japan?", answers: ["Tokyo", "Seoul", "Beijing"], correct: "Tokyo" },
    { title: "How many continents are there?", answers: ["7", "6", "5"], correct: "7" }
];

const quiz = new Quiz(questions);
