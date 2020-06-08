var player, rock, rockGroup, restart, coin, coinGroup;

var restartImg;

var rockImg1 ,rockImg2, rockImg3, rockImg4, playerImg, playerImg2, playerImg3;

var SERVE = 2;
var PLAY = 1;
var END = 0;

var gameState = SERVE;

var score = 0;
var highScore = 0;

var website, websiteImg;

function preload(){
  playerImg = loadAnimation("Player_1.png", "Player_2.png");
  playerImg2 = loadImage("Crab.png");
  playerImg3 = loadImage("ufo.png");
  
  rockImg1 = loadImage("rock_1.png");
  rockImg2 = loadImage("rock2.png");
  rockImg3 = loadImage("rock3.png");
  rockImg4 = loadImage("rock4.png");
  
  restartImg = loadImage("restart.png");
  
  coinImg = loadAnimation("coin1.png", "coin2.png", "coin3.png", "coin4.png", "coin5.png", "coin6.png");
  
  websiteImg = loadAnimation("WEB logo.png");
}

function setup(){
  createCanvas(750,750);
  
  player = createSprite(375,720,20,40);
  player.addAnimation("player", playerImg);
  player.addImage("player1", playerImg2);
  player.addImage("player2", playerImg3);
  player.scale = 0.4;
  
  restart = createSprite(350,350);
  restart.addImage("restartButton", restartImg);
  restart.scale = 0.4;
  restart.visible = false;
  
  rockGroup = new Group();
  coinGroup = new Group();
}

function draw(){
  textFont("Times New Roman");
  
  if(gameState === SERVE){
    fill("black");
    
    background(0,255,0);
    
    restart.visible = false;
    
    var crabBox, ufoBox, botBox;
    
    crabBox = createSprite(187,710,100,80);
    crabBox.visible = false;
    
    ufoBox = createSprite(562,710,100,80);
    ufoBox.visible = false;
    
    botBox = createSprite(375,150,100,80);
    botBox.visible = false;
    
    text("FLYBOT SKIN", 340, 150);
    text("CRAB SKIN", 170, 710);
    text("UFO SKIN", 540, 710);
    
    textSize(35);
    textFont("Times New Roman");
    text("AVOID THE ROCKS",200,50);
    
    textSize(20.4);
    textFont("Times New Roman");
    
    text("By STARcade.Inc",400,85);

    textSize(30);
    textFont("Times New Roman");
    
    if(mousePressedOver(botBox)){
      player.changeImage("player", playerImg);
      player.scale = 0.4;
    }
    
    if(mousePressedOver(crabBox)){
      player.changeImage("player1", playerImg2);
      player.scale = 0.25;
    }
    
    if(mousePressedOver(ufoBox)){
      player.changeImage("player2", playerImg3);
      player.scale = 0.6;
    }
    
    fill("blue");
    text("Move To Start The Game😊😎",200,260);
    text("Avoid The Falling Rocks(¬‿¬)",200,360);
    
    fill("black");
    text("Collect Coins To Get New Players",175,460);
    
    if(mousePressedOver(website)){
      window.open("https://sites.google.com/d/1mpPjCego_ts7YUrSJg38DgWursicYtS-/p/1ZC-NE9JeS9YZua-lvTFlx5WdZcGvASJG/edit"); 
    }
    
    if(keyDown(LEFT_ARROW) || keyDown(RIGHT_ARROW) && gameState === SERVE){
       gameState = PLAY;
    }
    
    text("Highest Score : " + highScore,270,560); 
  }
  
  if(gameState === PLAY){
    background("yellow");
    
    edges = createEdgeSprites();
    
    score = score + Math.round(World.frameRate / 60);
    
    player.collide(edges[1]);
    player.collide(edges[0]);
    
    if(keyDown(LEFT_ARROW) && gameState === PLAY){
      player.x = player.x - 5;
    }
    
    if(keyDown(RIGHT_ARROW) && gameState === PLAY){
      player.x = player.x + 5;
    }
    
    spawnRocks();
    spawnCoin();
    
    if(coinGroup.collide(player) && gameState === PLAY){
      score = score+20;
      coinGroup.destroyEach(); 
    }
    
    if(rockGroup.collide(player) && gameState === PLAY){
      gameState = END; 
    }
    
    fill("black")
    textSize(34);
    text("Score : " + score,20,30);
  }
  
  if(gameState === END){
    background("pink");
    
    if(score > highScore){
      highScore = score;
    }
    
    rockGroup.setLifetimeEach(0);
    coinGroup.setLifetimeEach(0);
    
    textSize(50);
    fill("black");
    
    text("Final Score :" + score,260,100);
    
    text("Well Played !!",260,300);
    
    textSize(30);
    
    text("Press The Reset Button To Restart",180,400);
    
    restart.x = 400;
    restart.y = 500;
    
    restart.visible = true;
    
    if(mousePressedOver(restart)){
      reset(); 
    }
  }
  
  drawSprites();
}

function spawnRocks(){
  if(World.frameCount % 5 === 0){
    rock = createSprite(random(20,730),20);
    rock.scale = 0.12;
    rock.velocityY = 8;
    
    var rand = Math.round(random(1,4));
    
    switch (rand){
      case 1: rock.addImage("rock", rockImg1);
              break;
              
      case 2: rock.addImage("rock", rockImg2);
              break;
          
      case 3: rock.addImage("rock", rockImg3);
              break;
              
      case 4: rock.addImage("rock", rockImg4);
              break;
              
      default : break;
    }
    
    rockGroup.add(rock);
    rockGroup.setLifetimeEach(93.75);
  }
}

function spawnCoin(){
  if(World.frameCount % 150 === 0 && score > 60){
    coin = createSprite(random(40,720),20);
    coin.addAnimation("coin", coinImg);
    coin.scale = 0.2;
    coin.velocityY = 8;
    
    coinGroup.add(coin);
    coinGroup.setLifetimeEach(93.75);
  }
}

function reset(){
  score = 0;
  gameState = SERVE;
  player.x = 375;
}
