class ParticleManager{

constructor(){

this.list=[];

}

explode(
x,
y,
color
){

for(
let i=0;
i<30;
i++
){

this.list.push(

new Particle(
x,
y,
color
)

);

}

}

update(){

this.list =
this.list.filter(

p=>p.life>0

);

this.list.forEach(

p=>p.update()

);

}

draw(ctx){

this.list.forEach(

p=>p.draw(ctx)

);

}

}
