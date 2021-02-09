var balloon,balloonImage1,balloonImage2;
var database;
var height;
var backgroundimage;

function preload(){
  balloonImage1=loadAnimation("images/Hot Air Ballon-02.png");
   balloonImage2=loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-02.png",
   "images/Hot Air Ballon-03.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png","images/Hot Air Ballon-04.png");
  backgroundimage=loadImage("images/Hot Air Ballon-01.png")
}
function setup() {
database = firebase.database();
console.log(database)
  createCanvas(1500,700);
  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1)
  balloon.scale=0.5;

  
  var balloonHeight=database.ref('balloon/position');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 
}

function draw() {
  background(backgroundimage);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function updateHeight(x,y){
  database.ref('balloon/position').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}