class SoundManager{

constructor(){

this.pop =
new Audio(
"assets/sounds/pop.mp3"
);

this.correct =
new Audio(
"assets/sounds/correct.mp3"
);

this.wrong =
new Audio(
"assets/sounds/wrong.mp3"
);

}

playPop(){

this.pop.currentTime=0;

this.pop.play();

}

playCorrect(){

this.correct.currentTime=0;

this.correct.play();

}

playWrong(){

this.wrong.currentTime=0;

this.wrong.play();

}

}
