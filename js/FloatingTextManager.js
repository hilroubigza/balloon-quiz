class FloatingTextManager{

constructor(){

this.list=[];

}

add(
x,
y,
text,
color
){

this.list.push(

new FloatingText(
x,
y,
text,
color
)

);

}

update(){

this.list=
this.list.filter(

f=>f.life>0

);

this.list.forEach(

f=>f.update()

);

}

draw(ctx){

this.list.forEach(

f=>f.draw(ctx)

);

}

}
