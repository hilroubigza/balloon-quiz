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

const questionManager =
new QuestionManager();

const balloonManager =
new BalloonManager();

balloonManager.spawn(
questionManager.current()
);

document
.getElementById(
"questionBox"
)
.innerText =
questionManager
.current()
.question;

function drawBackground(){

const g =
ctx.createLinearGradient(
0,
0,
0,
canvas.height
);

g.addColorStop(
0,
"#4FC3F7"
);

g.addColorStop(
1,
"#B3E5FC"
);

ctx.fillStyle=g;

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

}

function animate(){

drawBackground();

balloonManager.update();

balloonManager.draw(
ctx
);

cursor.draw(
ctx
);

requestAnimationFrame(
animate
);

}

animate();
