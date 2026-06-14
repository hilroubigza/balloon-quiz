class FloatingText{

constructor(
x,
y,
text,
color
){

this.x=x;
this.y=y;

this.text=text;

this.color=color;

this.life=60;

}

update(){

this.y-=1;

this.life--;

}

draw(ctx){

ctx.save();

ctx.globalAlpha=
this.life/60;

ctx.fillStyle=
this.color;

ctx.font=
"bold 48px Arial";

ctx.textAlign=
"center";

ctx.fillText(

this.text,

this.x,

this.y

);

ctx.restore();

}

}
