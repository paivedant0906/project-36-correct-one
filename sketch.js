var dog,sadDog,happyDog;
var feed,addFood;
var database;
var foodstock;
var foodS;
function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
 database=firebase.database()
  createCanvas(1000,400);
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
   foodObj=new Food()

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
 feed=createButton("Feed")
 feed.position(700,95)
 feed.mousePressed(feedDog)
 
addFood=createButton("addFood");
addFood.position(800,95)
addFood.mousePressed(addFoods)

}

function draw() {
  background(46,139,87);
  drawSprites();
  foodObj.display();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updatefoodstock(foodS);
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updatefoodstock(foodObj.getfoodstock()-1);
  database.ref('/').update({
    Food:foodObj.getfoodstock(),
    
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
//function to update food stock and last fed time



