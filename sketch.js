var dog,sadDog,happyDog;
var feed,addFood;
var database;
var foodstock;
var foodS;
var dogname;
var fedtime;
var lastFed;
function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
 database=firebase.database()
  createCanvas(1000,400);
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  fedtime=database.ref('FeedTime')
  fedtime.on("value",function(data){
lastFed=data.val();
  })
   foodObj=new Food()

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
 feed=createButton("Feed")
 feed.position(700,95)
 feed.mousePressed(feedDog)
 dogname=createInput("DogName")
 dogname.position(300,150)
addFood=createButton("addFood");
addFood.position(800,95)
addFood.mousePressed(addFoods)

}

function draw() {
  background(46,139,87);
  
  fill("white")
  textSize(20)
   if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 300,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 300,30);
   }
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
    FeedTime:hour()
    
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



