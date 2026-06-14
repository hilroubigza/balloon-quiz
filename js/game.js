// =====================================
// Balloon Quiz Engine
// Phase 4.0
// Google Sheet Version
// =====================================

// ----------------------
// Canvas
// ----------------------

const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");

const GAME_WIDTH = 1920;
const GAME_HEIGHT = 1080;

function resizeCanvas(){

const screenWidth =
window.innerWidth;

const screenHeight =
window.innerHeight;

const scale =
Math.min(
screenWidth / GAME_WIDTH,
screenHeight / GAME_HEIGHT
);

canvas.width =
GAME_WIDTH;

canvas.height =
GAME_HEIGHT;

canvas.style.width =
(GAME_WIDTH * scale) + "px";

canvas.style.height =
(GAME_HEIGHT * scale) + "px";

}

resizeCanvas();

window.addEventListener(
"resize",
resizeCanvas
);

// ----------------------
// State
// ----------------------

let score = 0;

let fps = 0;

let gameOver = false;

let frameCount = 0;

let lastFrameTime =
performance.now();

// ----------------------
// UI
// ----------------------

const scoreElement =
document.getElementById("score");

const timerElement =
document.getElementById("timer");

const questionElement =
document.getElementById("questionBox");

// ----------------------
// Managers
// ----------------------

const questionManager =
new QuestionManager();

const balloonManager =
new BalloonManager();

const particleManager =
new ParticleManager();

const floatingTextManager =
new FloatingTextManager();

const soundManager =
new SoundManager();

// ----------------------
// Initialize Game
// ----------------------

async function initGame(){

try{

questionElement.innerHTML =
"กำลังโหลดคำถาม...";

await questionManager.load();

if(
!questionManager.questions ||
questionManager.questions.length===0
){

questionElement.innerHTML =
"ไม่พบข้อมูลคำถาม";

return;

}

loadQuestion();

animate();

}
catch(error){

console.error(error);

questionElement.innerHTML =
"โหลดคำถามไม่สำเร็จ";

}

}

// ----------------------
// Question
// ----------------------

function loadQuestion(){

const question =
questionManager.current();

if(!question){

showGameOver();

return;

}

questionElement.innerHTML =
question.question;

balloonManager.spawn(
question
);

}

function nextQuestion(){

const next =
questionManager.next();

if(!next){

showGameOver();

return;

}

questionElement.innerHTML =
next.question;

balloonManager.spawn(
next
);

}

// ----------------------
// Score
// ----------------------

function addScore(points){

score += points;

if(score < 0){

score = 0;

}

scoreElement.textContent =
score;

}

// ----------------------
// Save Score
// ----------------------

async function saveScore(){

try{

if(
typeof API_URL ===
"undefined"
){
return;
}

await fetch(

API_URL,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

name:"Balloon Quiz",

score:score

})

}

);

}
catch(error){

console.error(
"Save Score Error",
error
);

}

}

// ----------------------
// Game Over
// ----------------------

async function showGameOver(){

gameOver = true;

balloonManager.clear();

await saveScore();

questionElement.innerHTML =

`🎉 จบเกม 🎉 <br>
คะแนนรวม <br>
${score}`;

}

// ----------------------
// Selection
// ----------------------

function processSelection(){

if(gameOver)
return;

balloonManager.checkHover();

const selected =

balloonManager
.getSelectedBalloon();

if(
selected
){

selectBalloon(
selected
);

}

}

function selectBalloon(balloon){

if(
balloon.selected
)
return;

balloon.selected =
true;

// Explosion

particleManager.explode(

balloon.x,

balloon.y,

balloon.correct
?
"#4CAF50"
:
"#F44336"

);

// Sound

soundManager.playPop();

// Score

if(
balloon.correct
){

addScore(
CONFIG.CORRECT_SCORE
);

floatingTextManager.add(

balloon.x,

balloon.y,

"+" +
CONFIG.CORRECT_SCORE,

"#00FF00"

);

soundManager
.playCorrect();

}
else{

addScore(
CONFIG.WRONG_SCORE
);

floatingTextManager.add(

balloon.x,

balloon.y,

CONFIG.WRONG_SCORE,

"#FF4444"

);

soundManager
.playWrong();

}

balloonManager.clear();

setTimeout(()=>{

nextQuestion();

},800);

}

// ----------------------
// FPS
// ----------------------

function updateFPS(){

const now =
performance.now();

fps =
Math.round(
1000 /
(now-lastFrameTime)
);

lastFrameTime =
now;

}

// ----------------------
// Update
// ----------------------

function update(){

cursor.update();

balloonManager.update();

particleManager.update();

floatingTextManager.update();

processSelection();

}

// ----------------------
// Background
// ----------------------

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

// ----------------------
// Debug
// ----------------------

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

`Score : ${score}`,

20,

150

);

ctx.fillText(

`Cursor X : ${Math.round(cursor.x)}`,

20,

180

);

ctx.fillText(

`Cursor Y : ${Math.round(cursor.y)}`,

20,

210

);

ctx.fillText(

`Visible : ${cursor.visible}`,

20,

240

);

ctx.restore();

}

// ----------------------
// Draw
// ----------------------

function draw(){

drawBackground();

balloonManager.draw(
ctx
);

particleManager.draw(
ctx
);

floatingTextManager.draw(
ctx
);

cursor.draw(
ctx
);

drawDebug();

}

// ----------------------
// Main Loop
// ----------------------

function animate(){

frameCount++;

updateFPS();

update();

draw();

requestAnimationFrame(
animate
);

}

// ----------------------
// Reset
// ----------------------

function resetGame(){

score = 0;

gameOver = false;

scoreElement.textContent =
0;

questionManager.index = 0;

loadQuestion();

}

window.resetGame =
resetGame;

window.nextQuestion =
nextQuestion;

window.addScore =
addScore;

// ----------------------
// Keyboard Debug
// ----------------------

window.addEventListener(

"keydown",

e=>{

switch(e.key){

case "n":

nextQuestion();

break;

case "r":

resetGame();

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

// ----------------------
// Start
// ----------------------

initGame();
