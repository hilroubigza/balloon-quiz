// ======================
// Canvas Setup
// ======================

const canvas =
document.getElementById(
"gameCanvas"
);

const ctx =
canvas.getContext("2d");

function resizeCanvas(){

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

}

resizeCanvas();

window.addEventListener(
"resize",
resizeCanvas
);

// ======================
// Game State
// ======================

let score = 0;

let gameStarted = true;

let frameCount = 0;

// ======================
// Managers
// ======================

const questionManager =
new QuestionManager();

const balloonManager =
new BalloonManager();

// ======================
// UI
// ======================

const scoreElement =
document.getElementById(
"score"
);

const timerElement =
document.getElementById(
"timer"
);

const questionElement =
document.getElementById(
"questionBox"
);

// ======================
// Load First Question
// ======================

function loadCurrentQuestion(){

const question =
questionManager.current();

if(!question){

questionElement.innerText =
"จบเกม";

return;
}

questionElement.innerText =
question.question;

balloonManager.spawn(
question
);

}

loadCurrentQuestion();

// ======================
// Background
// ======================

function drawBackground(){

const gradient =
ctx.createLinearGradient(
0,
0,
0,
canvas.height
);

gradient.addColorStop(
0,
"#4FC3F7"
);

gradient.addColorStop(
1,
"#B3E5FC"
);

ctx.fillStyle =
gradient;

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

}

// ======================
// FPS Counter
// ======================

let fps = 0;

let lastTime =
performance.now();

function updateFPS(){

const now =
performance.now();

fps =
Math.round(
1000 /
(now-lastTime)
);

lastTime =
now;

}

// ======================
// Debug Layer
// ======================

function drawDebug(){

ctx.save();

ctx.fillStyle =
"white";

ctx.font =
"20px Arial";

ctx.fillText(

`FPS : ${fps}`,

20,

120

);

ctx.fillText(

`Cursor X : ${Math.round(cursor.x)}`,

20,

150

);

ctx.fillText(

`Cursor Y : ${Math.round(cursor.y)}`,

20,

180

);

ctx.fillText(

`Visible : ${cursor.visible}`,

20,

210

);

ctx.restore();

}

// ======================
// Draw Cursor
// ======================

function drawCursor(){

cursor.update();

cursor.draw(
ctx
);

}

// ======================
// Update Game
// ======================

function updateGame(){

balloonManager.update();

}

// ======================
// Draw Game
// ======================

function drawGame(){

balloonManager.draw(
ctx
);

}

// ======================
// Main Loop
// ======================

function animate(){

frameCount++;

updateFPS();

drawBackground();

updateGame();

drawGame();

drawCursor();

drawDebug();

requestAnimationFrame(
animate
);

}

animate();

// ======================
// Public Functions
// ======================

window.nextQuestion =
function(){

const next =
questionManager.next();

if(!next){

questionElement.innerText =
"จบเกม";

return;

}

questionElement.innerText =
next.question;

balloonManager.spawn(
next
);

};

// ======================
// Score Update
// ======================

window.addScore =
function(points){

score += points;

if(score < 0){

score = 0;

}

scoreElement.innerText =
score;

};

// ======================
// Reset Game
// ======================

window.resetGame =
function(){

score = 0;

scoreElement.innerText =
0;

questionManager.index = 0;

loadCurrentQuestion();

};

// ======================
// Keyboard Debug
// ======================

window.addEventListener(

"keydown",

event => {

switch(event.key){

case "n":

nextQuestion();

break;

case "+":

addScore(10);

break;

case "-":

addScore(-5);

break;

}

}

);
