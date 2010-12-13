//all game functions will be here

function init()
{
ctx = document.getElementById("canvas").getContext("2d");
document.onkeydown=onKeyDown;
document.onkeyup=onKeyUp;
//we create a Map object
map= new Map();
map.render();

//create a Snake Object
snake=new Snake();
snake.render();

//create a game Object
game=new Game();
//create a randomFood
game.randomFood();
game.renderFood();

}