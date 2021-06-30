
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ground, groundImg;
var invg,gameOver,restart,gameOverI,restartI;
var box,boximg;
var obs,obsImg;
var coin,coinImg;
var song1;
var bg,bgimg;
var score=0
var END = 0;
var PLAY = 1;
var play=0,end=0;
var gameState = PLAY;

function preload()
{
    bgimg = loadImage("bg.png");
    obsImg = loadImage("obs.png");
  coinImg = loadImage("coin.png");
  boximg = loadImage("81190.png");
  restartI = loadImage("restart.png");
  gameOverI = loadImage("gameOver.png");
  song1 = loadSound("bash.mp3");
}

function setup() {
	createCanvas(900, 620);
  song1.play();
 // song.loop();
  console.log(song1);
  engine = Engine.create();
	world = engine.world;

  
bg = createSprite(550,300);
bg.scale = 1.07;
bg.addImage(bgimg);
//bg.velocityX = -4;
  

box = createSprite(210,550,135,120);
 box.addImage(boximg);

  ground = createSprite(680,620,1400,30)
  ground.visible = false;
 ground.velocityX=-8;

 gameOver = createSprite(450,130,10,10); 
  gameOver.addImage("gameOver",gameOverI);
  gameOver.scale=0.7;
  gameOver.visible=false;

  restart = createSprite(450,250,10,10);
  restart.addImage(restartI);
  restart.scale=1;
  restart.visible=false;

 obsGroup = createGroup();
 coinGroup = createGroup();
	
	Engine.run(engine);
  
 
}


function draw() {
 // rectMode(CENTER);
  background(220);
  edges = createEdgeSprites();
  Engine.update(engine);
  box.collide(ground)

  if (gameState===PLAY){
    //score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(6 + 3*score/100);
    bg.velocityX = -6;
   
    if(keyDown("space") && box.y>=450){
      box.setVelocity(0,-11);
     }
     box.velocityY=box.velocityY+0.6;

     if(box.isTouching(coinGroup)){
      coinGroup.destroyEach();
      score++;
      }
      
     bg.velocityX = -(4+score*1.5/1);
    
     if (ground.x < 700){
      ground.x = 700;
    }
    if (bg.x < 350){
      bg.x = 550;
    }
    spawnobstacles();
    spawncoins();
    boxLife();

}

else if(gameState===END){
  background("blue")
 // song.stop()
  box.visible=false;
  gameOver.visible=true;
  restart.visible=true;
 obsGroup.destroyEach();
 coinGroup.destroyEach();
 ground.setVelocity(0,0);
 bg.setVelocity(0,0);
obsGroup.setLifetimeEach(-1);
 coinGroup.setLifetimeEach(-1);
  }
 
  if(mousePressedOver(restart)){
    reset();
   
      }

   drawSprites();
   fill("white");
   textSize(18);
   
   text("SCORE: "+score, 100, 20);
   
 
}

function spawnobstacles(){
  
  if (frameCount%200===0) {
    obs = createSprite(810, 550,10,10);
    obs.x=810 ;
    obs.addImage(obsImg);
    obs.velocityX=-7;
    obs.velocityX = -(4+score*1.5/1);
    obs.lifetime=300;
    obs.scale=0.2;
    obs.setCollider("rectangle",0,0,50,50);
    obsGroup.add(obs);
     
  }
}

function spawncoins(){
  if (frameCount%90===0) {
    coin = createSprite(810,770,10,10);
    coin.x=700;
    coin.y=random(400,450);
    coin.addImage(coinImg);
    coin.scale = 2;
    coin.velocityX=-5;
    coin.velocityX =-(4+score*1.5/1);  
    coin.lifetime=220;
    coin.scale=0.1;
    coin.setCollider("rectangle",0,0,350,350);
    coinGroup.add(coin);
  }
     
}

function boxLife(){
  if(box.isTouching(obsGroup)){
  obsGroup.destroyEach();
  gameState = END;
}
}

function reset(){
  gameState=PLAY;
  box.visible=true;
  gameOver.visible=false;
  restart.visible=false;
  ground.setVelocity(-5,0);
  score=0;
}
