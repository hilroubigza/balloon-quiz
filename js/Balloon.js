class Balloon{

constructor(data){

this.x=data.x;

this.y=data.y;

this.text=data.text;

this.correct=
data.correct;

this.radius=
CONFIG.BALLOON_RADIUS;
  
this.hoverStart = null;

this.hoverProgress = 0;

this.selected = false;

}

update(){

this.y-=
CONFIG.BALLOON_SPEED;

}

draw(ctx){

ctx.beginPath();

ctx.arc(

this.x,

this.y,

this.radius,

0,

Math.PI*2

);

ctx.fillStyle=
this.correct
?
"#4CAF50"
:
"#F44336";

ctx.fill();

ctx.fillStyle=
"white";

ctx.textAlign=
"center";

ctx.font=
"bold 28px Arial";

ctx.fillText(
this.text,
this.x,
this.y
);

}

contains(x,y){

const dx=
x-this.x;

const dy=
y-this.y;

return Math.sqrt(
dx*dx+
dy*dy
)
<
this.radius;

}

}
