const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground;
var rope;
let engine;
let world;
var fruit;
var bg_img;
var food;
var rabbit;
var button;
var bunny,button;
var blink,eat,sad;
var canW,canH

function preload(){
 bg_img = loadImage("background.png") 
 food = loadImage("melon.png")
 rabbit= loadImage("Rabbit-01.png")
 blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  blink.playing=true;
  eat.playing=true;
  sad.playing=true;
  sad.looping=false;
  eat.looping=false;
  bk_sound=loadSound('sound1.mp3');
  sad_sound=loadSound('sad.wav');
  cut_sound=loadSound('rope_cut.mp3');
  eat_sound=loadSound('eating_sound.mp3');
  air_sound=loadSound('air.wav');
}

function setup() 
{
  var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW=displayWidth;
    canH=displayHeight; 
 createCanvas(displayWidth+80,displayHeight)

}
else{
  canW=windowWidth;
  canH=windowHeight; 
  createCanvas(windowWidth,windowHeight)
}

  //createCanvas(500,700);
 // frameRate(15);//fps-frame per second
  bk_sound.play();
  bk_sound.setVolume(0.5);
  engine = Engine.create();
  world = engine.world;
 ground=new Ground(200,canH,600,20);

 fruit= Bodies.circle(300,300,20);
 //World.add(world,fruit);
 
rope=new Rope(7,{x:40,y:30})
rope1=new Rope(7,{x:370,y:40})
rope2=new Rope(7,{x:400,y:225})

 
fruit_con=new Link(rope,fruit)
fruit_con1=new Link(rope1,fruit)
fruit_con2=new Link(rope2,fruit)
 Matter.Composite.add(rope.body,fruit)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
button=createImg('cut_button.png');
button.position(20,30);
button.size(50,50);
button.mouseClicked(drop);

button1=createImg('cut_button.png');
button1.position(330,35);
button1.size(50,50);
button1.mouseClicked(drop1);

button2=createImg('cut_button.png');
button2.position(360,200);
button2.size(50,50);
button2.mouseClicked(drop2);


mute_btn=createImg('mute.png');
mute_btn.position(450,20);
mute_btn.size(50,50);
mute_btn.mouseClicked(mute);

/*balloon_btn=createImg('blower.png')
balloon_btn.position(20,250);
balloon_btn.size(150,100);
balloon_btn.mouseClicked(airblow);*/
blink.framDelay=20;
eat.framDelay=20;
sad.framDelay=20;
  bunny= createSprite(170,canH-80,100,100);
  //bunny.addImage(rabbit);
  bunny.scale=0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);


  

}

function draw() 
{
  background(51);
  //console.log(framDelay())
  image(bg_img,0,0,displayWidth+80,displayHeight);
  imageMode(CENTER);
  if(fruit != null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  

  rope.show();
  rope1.show();
  rope2.show();
  //ellipse(fruit.position.x,fruit.position.y,30,30);
  Engine.update(engine);
   ground.show();
   if(collide(fruit,bunny)==true){
     eat_sound.play();
bunny.changeAnimation('eating','eat')
   }
   if(collide(fruit,ground.body)==true){
     bk_sound.stop();
     sad_sound.play();
bunny.changeAnimation('crying','sad')
   }
   drawSprites();
   
   
}
function drop(){
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con=null;
  
}
function drop1(){
  cut_sound.play();
  rope1.break();
  fruit_con1.detach();
  fruit_con1=null;
  
}

function drop2(){
  cut_sound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2=null;
  
}

function collide(body,sprite){
  if(body!=null ){
    var d= dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<=80){
     World.remove(engine.world,fruit)
     fruit=null;
     return true; 
    }else{
      return false;
    }
  }


}
function mute(){
  if(bk_sound.isPlaying()){
bk_sound.stop()
  }
  else{
bk_sound.play()
  }
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  air_sound.play();

}

function keyPressed(){
  if(keyCode==LEFT_ARROW){
airblow();
  }
}


