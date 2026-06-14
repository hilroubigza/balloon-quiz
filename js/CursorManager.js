window.cursor = {

x:0,
y:0,

targetX:0,
targetY:0,

visible:false,

update(){

this.x +=
(this.targetX-this.x)
*
CONFIG.HAND_SMOOTHING;

this.y +=
(this.targetY-this.y)
*
CONFIG.HAND_SMOOTHING;

},

setPosition(x,y){

this.targetX=x;
this.targetY=y;

},

draw(ctx){

if(!this.visible)
return;

ctx.save();

ctx.beginPath();

ctx.arc(

this.x,

this.y,

CONFIG.CURSOR_RADIUS,

0,

Math.PI*2

);

ctx.fillStyle="#00FFFF";

ctx.fill();

ctx.strokeStyle="white";

ctx.lineWidth=4;

ctx.stroke();

ctx.restore();

}

};
