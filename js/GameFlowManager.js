class GameFlowManager {

    constructor() {

        this.questionTime =
            CONFIG.QUESTION_TIME;

        this.timeLeft =
            this.questionTime;

        this.lastTick =
            performance.now();

        this.finished =
            false;

    }

    startQuestion() {

        this.timeLeft =
            this.questionTime;

        this.lastTick =
            performance.now();

    }

    update() {

        if (this.finished) return;

        const now =
            performance.now();

        const delta =
            (now - this.lastTick) / 1000;

        this.lastTick =
            now;

        this.timeLeft -= delta;

    }

    isTimeout() {

        return this.timeLeft <= 0;

    }

    getTimeText() {

        return Math.ceil(
            this.timeLeft
        );

    }

}
