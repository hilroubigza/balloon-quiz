window.cursor = {

x:0,

y:0,

visible:true,

update(
x,
y
){

this.x=x;
this.y=y;

},

draw(ctx){

if(
!this.visible
) return;

ctx.save();

ctx.beginPath();

ctx.arc(

this.x,

this.y,

CONFIG.CURSOR_RADIUS,

0,

Math.PI*2

);

ctx.fillStyle=
"#00FFFF";

ctx.fill();

ctx.strokeStyle=
"white";

ctx.lineWidth=3;

ctx.stroke();

ctx.restore();

}

};

window.addEventListener(
"mousemove",
e=>{

cursor.update(
e.clientX,
e.clientY
);

}
);
