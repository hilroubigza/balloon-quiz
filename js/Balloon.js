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

startHover(){

if(
this.hoverStart === null
){

this.hoverStart =
performance.now();

}

}

resetHover(){

this.hoverStart = null;

this.hoverProgress = 0;

}

getHoverPercent(){

if(
this.hoverStart === null
){

return 0;

}

const elapsed =

performance.now()
-
this.hoverStart;

return Math.min(

elapsed /
CONFIG.HOVER_TIME,

1

);

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
if(
this.getHoverPercent()
>0
){

ctx.shadowBlur =
40;

ctx.shadowColor =
"yellow";

}
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
