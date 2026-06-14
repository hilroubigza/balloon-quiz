class TimerManager{

constructor(seconds){

this.maxTime =
seconds;

this.timeLeft =
seconds;

}

start(){

this.timeLeft =
this.maxTime;

}

update(delta){

this.timeLeft -= delta;

}

isFinished(){

return this.timeLeft <= 0;

}

}
