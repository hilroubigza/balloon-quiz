class BalloonManager {

    constructor() {

        this.balloons = [];

    }

    // =========================
    // Spawn Question Balloons
    // =========================

    spawn(question) {

        this.balloons = [];

        const w = canvas.width;
        const h = canvas.height;

        const positions = [

            {
                x: w * 0.25,
                y: h * 0.75
            },

            {
                x: w * 0.45,
                y: h * 0.75
            },

            {
                x: w * 0.65,
                y: h * 0.75
            },

            {
                x: w * 0.85,
                y: h * 0.75
            }

        ];

        this.shuffleArray(
            positions
        );

        const answer1Correct =
            question.correct === 1;

        const answer2Correct =
            question.correct === 2;

        // ------------------
        // Balloon 1
        // ------------------

        this.balloons.push(

            new Balloon({

                x: positions[0].x,

                y: positions[0].y,

                text: question.answer1,

                correct:
                    answer1Correct,

                color:
                    answer1Correct
                        ? "#4CAF50"
                        : "#F44336"

            })

        );

        // ------------------
        // Balloon 2
        // ------------------

        this.balloons.push(

            new Balloon({

                x: positions[1].x,

                y: positions[1].y,

                text: question.answer2,

                correct:
                    answer2Correct,

                color:
                    answer2Correct
                        ? "#4CAF50"
                        : "#F44336"

            })

        );

    }

    // =========================
    // Update
    // =========================

    update() {

        this.balloons.forEach(

            balloon => {

                balloon.update();

            }

        );

    }

    // =========================
    // Draw
    // =========================

    draw(ctx) {

        this.balloons.forEach(

            balloon => {

                balloon.draw(
                    ctx
                );

            }

        );

    }

    // =========================
    // Hover Detection
    // =========================

    checkHover() {

        if (
            !cursor.visible
        ) {

            this.resetAllHover();

            return;

        }

        this.balloons.forEach(

            balloon => {

                const inside =

                    balloon.contains(

                        cursor.x,

                        cursor.y

                    );

                if (
                    inside
                ) {

                    balloon.startHover();

                }
                else {

                    balloon.resetHover();

                }

            }

        );

    }

    // =========================
    // Selected Balloon
    // =========================

    getSelectedBalloon() {

        for (

            const balloon
            of
            this.balloons

        ) {

            if (

                balloon.selected

            ) {

                continue;

            }

            const progress =

                balloon
                    .getHoverPercent();

            if (
                progress >= 1
            ) {

                return balloon;

            }

        }

        return null;

    }

    // =========================
    // Reset Hover
    // =========================

    resetAllHover() {

        this.balloons.forEach(

            balloon => {

                balloon.resetHover();

            }

        );

    }

    // =========================
    // Clear Balloons
    // =========================

    clear() {

        this.balloons = [];

    }

    // =========================
    // Shuffle
    // =========================

    shuffleArray(array) {

        for (

            let i =
                array.length - 1;

            i > 0;

            i--

        ) {

            const j =

                Math.floor(

                    Math.random()
                    *
                    (i + 1)

                );

            [

                array[i],

                array[j]

            ] = [

                array[j],

                array[i]

            ];

        }

        return array;

    }

}
