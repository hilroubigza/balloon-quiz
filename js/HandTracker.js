import {
HandLandmarker,
FilesetResolver
}
from
"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm";

const video =
document.getElementById(
"webcam"
);

let handLandmarker;

let lastVideoTime = -1;

async function init(){

const vision =
await FilesetResolver
.forVisionTasks(

"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"

);

handLandmarker =

await HandLandmarker
.createFromOptions(

vision,

{

baseOptions:{

modelAssetPath:

"https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",

delegate:"GPU"

},

runningMode:"VIDEO",

numHands:1

}

);

await startCamera();

detectLoop();

}

async function startCamera(){

const stream =

await navigator
.mediaDevices
.getUserMedia({

video:{

width:
CONFIG.CAMERA_WIDTH,

height:
CONFIG.CAMERA_HEIGHT

}

});

video.srcObject =
stream;

if(
!CONFIG.SHOW_WEBCAM
){

video.style.display=
"none";

}

await video.play();

}

function processHand(
result
){

if(
!result.landmarks ||
result.landmarks.length===0
){

cursor.visible=false;

return;

}

const hand =
result.landmarks[0];

const palm =
hand[9];

const screenX =
window.innerWidth
*
(1-palm.x);

const screenY =
window.innerHeight
*
palm.y;

cursor.visible=true;

const rect =
canvas.getBoundingClientRect();

const x =
(palm.x * rect.width);

const y =
(palm.y * rect.height);

cursor.setPosition(
x * (canvas.width / rect.width),
y * (canvas.height / rect.height)
);

}

async function detectLoop(){

if(
video.currentTime !==
lastVideoTime
){

lastVideoTime =
video.currentTime;

const result =

handLandmarker
.detectForVideo(

video,

performance.now()

);

processHand(
result
);

}

requestAnimationFrame(
detectLoop
);

}

init();
