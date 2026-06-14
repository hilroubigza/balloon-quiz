class QuestionManager{

constructor(){

this.index=0;

this.questions=
QUESTIONS;

}

current(){

return this.questions[
this.index
];

}

next(){

this.index++;

if(
this.index>=
this.questions.length
){

this.index=0;

}

return this.current();

}

}
