


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
var snakeSpeed=5;
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

//snake cell type definitions
var HEAD_UP = 1;
var HEAD_LEFT = 2;
var HEAD_DOWN = 3;
var HEAD_RIGHT = 4;

var BODY_HORIZONTAL = 5;
var BODY_VERTICAL = 6;
var BODY_RIGHT_UP = 7; //the type of snake body making turn from right to up
var BODY_RIGHT_DOWN = 8; 
var BODY_LEFT_UP = 9;
var BODY_LEFT_DOWN = 10;

var TAIL_UP = 11;
var TAIL_DOWN = 12;
var TAIL_RIGHT = 13;
var TAIL_LEFT = 14;


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