var  dog, happyDog, dogIMG, database, foodS, foodStock;

function preload()
{
  dogIMG = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,20,20);
  dog.addImage(dogIMG);
  dog.scale = 0.1;

  database=firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

  textSize(15);
  fill("red");
  stroke("black")
  text("Food remaining:"+foodS,200,200);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



