class Particle{

constructor(
x,
y,
color
){

this.x = x;
this.y = y;

this.color =
color;

this.radius =
Math.random()*8+2;

this.life = 60;

this.vx =
(Math.random()-0.5)*10;

this.vy =
(Math.random()-0.5)*10;

}

update(){

this.x += this.vx;
this.y += this.vy;

this.life--;

}

draw(ctx){

ctx.save();

ctx.globalAlpha =
this.life/60;

ctx.beginPath();

ctx.arc(
this.x,
this.y,
this.radius,
0,
Math.PI*2
);

ctx.fillStyle =
this.color;

ctx.fill();

ctx.restore();

}

}
