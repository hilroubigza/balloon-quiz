class BalloonManager{

constructor(){

this.balloons=[];

}

spawn(question){

this.balloons=[];

const points=[

{
x:250,
y:700
},

{
x:700,
y:650
},

{
x:1200,
y:700
},

{
x:1600,
y:650
}

];

shuffle(points);

this.balloons.push(

new Balloon({

x:points[0].x,

y:points[0].y,

text:
question.answer1,

correct:
question.correct===1

})

);

this.balloons.push(

new Balloon({

x:points[1].x,

y:points[1].y,

text:
question.answer2,

correct:
question.correct===2

})

);

}

update(){

this.balloons.forEach(

balloon=>{

balloon.update();

}

);

}

draw(ctx){

this.balloons.forEach(

balloon=>{

balloon.draw(ctx);

}

);

}

}
