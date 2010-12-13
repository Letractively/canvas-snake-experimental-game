//global variables that rosnake game will use
var map,snake,game;
//map object properties
var maxrows=25;
var maxcols=25;
var squaresize=15;
var wallsize=1; //the wall containing the area

//performance variables
var wallxsquare=wallsize*squaresize;
var redrawx=maxrows*squaresize-wallsize*2*squaresize;
var  redrawy=maxcols*squaresize-wallsize*2*squaresize;
//snake object properties
var initSnakeSize=6;
var initSnakeHeadPositionX=Math.floor(maxrows/2);
var initSnakeHeadPositionY=Math.floor(maxcols/2);


//snake speed, 5 is default it will gain more meaning later in game tests 
var snakeSpeed=8;
var snakeSpeedI=10-snakeSpeed;
//game properties
var intervalArray=new Array(55,66,77,90,100,110,140,160,200,250)
var gameInterval=intervalArray[snakeSpeedI];
//global object array that will hold all objects
var objects=new Array();

//global drawing object
var ctx;

//keyboard vars
var rightDown = false;
var leftDown = false;
var upDown = false;
var downDown = false;

//set rightDown or leftDown if the right or left keys are down
function onKeyDown(evt) {
  if (evt.keyCode == 39) {rightDown = true;snake.turn();}
  else if (evt.keyCode == 37) {leftDown = true;snake.turn();}
  else if(evt.keyCode == 38) {upDown = true;snake.turn();}
  else if (evt.keyCode == 40) {downDown = true;snake.turn();}
}

//and unset them when the right or left key is released
function onKeyUp(evt) {
  if (evt.keyCode == 39) {rightDown = false}
  else if (evt.keyCode == 37) {leftDown = false}
  else if(evt.keyCode == 38) {upDown = false}
  else if (evt.keyCode == 40) {downDown = false}
}