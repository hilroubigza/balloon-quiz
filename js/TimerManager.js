class TimerManager{

constructor(seconds){

this.maxTime = seconds;

this.timeLeft = seconds;

this.running = false;

this.lastTime = 0;

}

start(){

this.timeLeft = this.maxTime;

this.running = true;

this.lastTime = performance.now();

}

stop(){

this.running = false;

}

update(){

if(!this.running) return;

const now = performance.now();

const delta =

(now - this.lastTime) / 1000;

this.lastTime = now;

this.timeLeft -= delta;

if(this.timeLeft < 0){

this.timeLeft = 0;

}

}

isFinished(){

return this.timeLeft <= 0;

}

getDisplay(){

return Math.ceil(
this.timeLeft
);

}

}
