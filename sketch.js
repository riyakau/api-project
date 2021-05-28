
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,dg,og,fg;
var bg;
var score=0;
var gameState="play"
function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  jungle=loadImage("bg1.jpg")
  jungle2=loadImage("bg2.jpg")

  back()
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 gameoverImage=loadImage("download.jpg")
}
async function back(){
  bg=createSprite(430,300)
 var response= await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
var responsejson= await response.json();
var datetime= responsejson.datetime;
var hour= datetime.slice(11,13)
if(hour>=06 && hour<=12){
  bg.addImage(jungle)
  //bg.scale=1.5
}
else{
  console.log("hi1")
  bg.addImage(jungle2)
  bg.scale=5



}
 //bg.scale=1.5
 
 bg.velocityX=-2
 bg.x=bg.width/2
}


function setup() {
 createCanvas(displayWidth+100,displayHeight-40);


 
 
monkey = createSprite(80,315,40,40);
 monkey. addAnimation("Moving",monkey_running);
monkey.scale=0.3
  ground=createSprite(displayWidth/2,height,displayWidth+100,20);
  ground.visible=false
  ground.velocityX=-5;
  dg=new Group();
  fg=new Group();
  og=new Group();
  console.log(ground.x)


 
}
function draw() {
background("white");

if (gameState==="play"){
 

drawSprites();
textSize(26);
fill("honeydew")
stroke("red")
text("Score :"+score,1200,100)
score=score+Math.round(getFrameRate()/60)
  monkey.collide(ground);
if(bg.x<0){
  bg.x=bg.width/2

}


if(ground.x<500){
  ground.x=ground.width/2
}
      if(keyDown("space") &&monkey.y>=496) {
        monkey.velocityY = -25;

    }    
    
    if(fg.isTouching(monkey)) {
      fg.destroyEach();
      
    }
    if(og.isTouching( monkey)){
      gameState="end"
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  food();
  obstacles();

  }
  else{
    textSize(50)
    fill("green")
    stroke("darkgreen")
    text("Game Over",600,300)

  }


}
function food() {
  if (frameCount % 150 === 0) {
    banana = createSprite(1200,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(80,315));
    banana.scale = 0.2;
    
    banana.velocityX = -6;
    banana.lifetime = 1200;
    
    fg.add(banana);
  }
}

function obstacles(){
  if (frameCount%200===0){
    obstacle=createSprite(1200,height-40,10,10)
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale=0.2
    obstacle.lifetime=700
    og.add(obstacle)

  }
}


