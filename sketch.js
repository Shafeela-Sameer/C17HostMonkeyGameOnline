var monkey, monkey_running, monkeyStopImg;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var backgroundImage;
var bananaCollected=0;
var gameState ="play";
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
backgroundImage= loadImage("Forest1.png")
  monkeyStopImg= loadImage("sprite_0.png")
}



function setup() {

  createCanvas(600, 400);
  // creating monkey
  monkey = createSprite(100, 300, 10, 20);
  monkey.addAnimation("monkeyrunning", monkey_running);
  monkey.scale = 0.15;
  // creating ground
  ground = createSprite(300, 410, 600, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  //creating groups 
  FoodGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
}


function draw() {

  background(backgroundImage);
  

  // display score
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time: " + score, 400, 50);
 text("Bananas: " + bananaCollected, 400, 80);
 if (gameState ==="play") {
   
     //make bananas
  spawnBananas()

  // make rocks
  spawnObstacles();

  // increment score
  score = score + Math.round((getFrameRate() / 60));

  // make monkey jump when space is pressed and when monkey is on ground
  if (keyDown("space") && monkey.y >= 343) {

    monkey.velocityY = -15;

  }
  // give gravity to monkey and support monkey on ground
  monkey.velocityY = monkey.velocityY + 0.5;
  
  //reset ground for illussion
  if (ground.x < 300) {

    ground.x = ground.width / 2;
  }
  
  
   for (var i = 0; i < FoodGroup.length; i++) {
    if(monkey.isTouching(FoodGroup[i])){
      FoodGroup[i].destroy();
      bananaCollected=bananaCollected+1;
    }
   }
   drawSprites();
 }
  if(obstacleGroup.isTouching(monkey)){
    gameState="over";
    FoodGroup.destroyEach();
        obstacleGroup.destroyEach();
    obstacleGroup.setVelocityEach(0)
    FoodGroup.setVelocityEach(0);
   // monkey.changeAnimation("monkeystop",monkeyStopImg);
    monkey.destroy();
    stroke("white");
  textSize(20);
  fill("white");
  text("Game Over", 200,200);
  }

monkey.collide(ground);
  
}



function spawnBananas() {
  if (frameCount % 80 === 0) {



    banana = createSprite(600, 100, 10, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    //make banana appear at random heights  
    var rand = Math.round(random(100, 200));
    banana.y = rand;
    
    // solve memmory leak
    banana.lifetime = 150;
    
    // add banana sprites to group
    FoodGroup.add(banana);
  }

}

function spawnObstacles() {

  //create and move obstacle at every 300 frame
  if (frameCount % 300 === 0) {

    obstacle = createSprite(600, 375, 10, 20);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.17;
    
     // solve memmory leak
    obstacle.lifetime = 150;
    
    //make depth of monkey above rocks
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
     // add obstacle sprites to group
    obstacleGroup.add(obstacle);
  }

}