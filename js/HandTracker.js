import {
    HandLandmarker,
    FilesetResolver
}
from
"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm";

// =====================================
// Elements
// =====================================

const video =
document.getElementById(
    "webcam"
);

let handLandmarker;

let lastVideoTime = -1;

// =====================================
// Init
// =====================================

async function init() {

    try {

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

                baseOptions: {

                    modelAssetPath:

                    "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",

                    delegate: "GPU"

                },

                runningMode: "VIDEO",

                numHands: 1

            }

        );

        await startCamera();

        detectLoop();

        console.log(
            "✅ Hand Tracker Ready"
        );

    }
    catch(error){

        console.error(
            "Hand Tracker Error:",
            error
        );

    }

}

// =====================================
// Camera
// =====================================

async function startCamera(){

    const stream =

    await navigator
    .mediaDevices
    .getUserMedia({

        video:{

            width:
            CONFIG.CAMERA_WIDTH,

            height:
            CONFIG.CAMERA_HEIGHT,

            facingMode:
            "user"

        },

        audio:false

    });

    video.srcObject =
    stream;

    if(
        !CONFIG.SHOW_WEBCAM
    ){

        video.style.display =
        "none";

    }

    await video.play();

}

// =====================================
// Hand Processing
// =====================================

function processHand(
    result
){

    if(

        !result.landmarks ||

        result.landmarks.length === 0

    ){

        cursor.visible = false;

        return;

    }

    const hand =
    result.landmarks[0];

    // Middle Finger MCP
    const palm =
    hand[9];

    cursor.visible =
    true;

    // =========================
    // Canvas Mapping
    // =========================

    const rect =
    canvas.getBoundingClientRect();

    // Mirror Mode
    const x =

    (1 - palm.x)
    *
    rect.width;

    const y =

    palm.y
    *
    rect.height;

    const canvasX =

    x *
    (
        canvas.width /
        rect.width
    );

    const canvasY =

    y *
    (
        canvas.height /
        rect.height
    );

    cursor.setPosition(

        canvasX,

        canvasY

    );

}

// =====================================
// Detection Loop
// =====================================

function detectLoop(){

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

// =====================================
// Start
// =====================================

init();
