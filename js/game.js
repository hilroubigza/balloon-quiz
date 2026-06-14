// =====================================
// GLOBALS
// =====================================

const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");

let score = 0;
let combo = 0;

let gameStarted = false;
let gameEnded = false;

let questionManager;
let balloonManager;
let particleManager;
let floatingTextManager;
let soundManager;
let flowManager;

// =====================================
// UI
// =====================================

const questionElement =
document.getElementById("question");

const scoreElement =
document.getElementById("score");

const gameOverScreen =
document.getElementById("gameOver");

const finalScoreElement =
document.getElementById("finalScore");

// =====================================
// RESIZE
// =====================================

function resizeCanvas(){

    const aspect = 16 / 9;

    let w = window.innerWidth;
    let h = window.innerHeight;

    if(w / h > aspect){

        w = h * aspect;

    }else{

        h = w / aspect;

    }

    canvas.width = w;
    canvas.height = h;

}

window.addEventListener(
    "resize",
    resizeCanvas
);

// =====================================
// INIT
// =====================================

async function initGame(){

    resizeCanvas();

    questionManager =
    new QuestionManager();

    balloonManager =
    new BalloonManager();

    particleManager =
    new ParticleManager();

    floatingTextManager =
    new FloatingTextManager();

    soundManager =
    new SoundManager();

    flowManager =
    new GameFlowManager();

    try{

        await questionManager.load();

        console.log(
            questionManager.questions
        );

        if(
            questionManager.questions.length === 0
        ){

            throw new Error(
                "No Questions"
            );

        }

        gameStarted = true;

        loadCurrentQuestion();

        gameLoop();

    }
    catch(error){

        console.error(error);

        questionElement.innerHTML =
        "โหลดคำถามไม่สำเร็จ";

    }

}

// =====================================
// LOAD QUESTION
// =====================================

function loadCurrentQuestion(){

    const question =
    questionManager.current();

    if(!question){

        endGame();

        return;

    }

    questionElement.innerHTML =
    question.question;

    balloonManager.spawn(
        question
    );

    flowManager.startQuestion();

}

// =====================================
// NEXT QUESTION
// =====================================

function nextQuestion(){

    questionManager.index++;

    if(

        questionManager.index >=
        questionManager.questions.length

    ){

        endGame();

        return;

    }

    loadCurrentQuestion();

}

// =====================================
// SCORE
// =====================================

function addScore(points){

    score += points;

    scoreElement.innerHTML =
    score;

}

// =====================================
// ANSWER
// =====================================

function handleAnswer(balloon){

    balloon.selected = true;

    if(balloon.correct){

        combo++;

        const points =
        10 * combo;

        addScore(points);

        floatingTextManager.add(
            "+" + points,
            balloon.x,
            balloon.y
        );

        if(
            particleManager.explode
        ){

            particleManager.explode(
                balloon.x,
                balloon.y
            );

        }

    }
    else{

        combo = 0;

        floatingTextManager.add(
            "ผิด",
            balloon.x,
            balloon.y
        );

    }

    setTimeout(

        ()=>{

            nextQuestion();

        },

        CONFIG.RESULT_DELAY

    );

}

// =====================================
// TIMEOUT
// =====================================

function handleTimeout(){

    combo = 0;

    floatingTextManager.add(

        "หมดเวลา",

        canvas.width / 2,

        canvas.height / 2

    );

    nextQuestion();

}

// =====================================
// GAME OVER
// =====================================

async function endGame(){

    if(gameEnded)
    return;

    gameEnded = true;

    questionElement.innerHTML =
    "";

    balloonManager.clear();

    if(
        finalScoreElement
    ){

        finalScoreElement.innerHTML =
        score;

    }

    if(
        gameOverScreen
    ){

        gameOverScreen.style.display =
        "flex";

    }

    try{

        await saveScore(

            "Player",

            score

        );

    }
    catch(err){

        console.error(err);

    }

}

// =====================================
// UPDATE
// =====================================

function update(){

    if(
        !gameStarted
    ) return;

    if(
        gameEnded
    ) return;

    flowManager.update();

    balloonManager.update();

    balloonManager.checkHover();

    particleManager.update();

    floatingTextManager.update();

    const selected =

    balloonManager
    .getSelectedBalloon();

    if(selected){

        handleAnswer(
            selected
        );

    }

    if(

        flowManager.isTimeout()

    ){

        handleTimeout();

    }

}

// =====================================
// DRAW PROGRESS
// =====================================

function drawProgress(){

    const total =

    questionManager.questions.length;

    const current =

    questionManager.index + 1;

    const percent =

    current / total;

    const width =

    canvas.width * 0.5;

    const x =

    canvas.width * 0.25;

    const y = 20;

    ctx.fillStyle =
    "#333";

    ctx.fillRect(

        x,

        y,

        width,

        20

    );

    ctx.fillStyle =
    "#4CAF50";

    ctx.fillRect(

        x,

        y,

        width * percent,

        20

    );

}

// =====================================
// DRAW TIMER
// =====================================

function drawTimer(){

    ctx.fillStyle =
    "#FFD700";

    ctx.font =
    "bold 40px Arial";

    ctx.textAlign =
    "center";

    ctx.fillText(

        "⏳ " +

        flowManager
        .getTimeText(),

        canvas.width / 2,

        90

    );

}

// =====================================
// DRAW
// =====================================

function draw(){

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

    drawProgress();

    drawTimer();

    balloonManager.draw(ctx);

    particleManager.draw(ctx);

    floatingTextManager.draw(ctx);

    if(

        cursor &&
        cursor.visible &&
        cursor.draw

    ){

        cursor.draw(ctx);

    }

}

// =====================================
// LOOP
// =====================================

function gameLoop(){

    update();

    draw();

    requestAnimationFrame(
        gameLoop
    );

}

// =====================================
// START
// =====================================

initGame();
