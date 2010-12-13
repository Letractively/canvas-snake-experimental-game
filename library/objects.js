//global objects must be here
//map object
function Map()
{
//init base 2d array that will hold what is in every cell
this.base=new Array(maxrows);
	for(var i =0 ; i < maxrows; i++)
	{
	this.base[i]=new Array(maxcols);
	for(var j=0;j<maxcols;j++)
	this.base[i][j]=0; //0 means that cell is empty, 1 means that a part of snake is in there 
					   //2 means that cell contains a wall, and -1 means cell has a food
	}	

//init  base array walls upper and lower walls first
for(var i =0; i < maxcols ; i++)
{
	for(var j=0; j<wallsize ; j++)
	{
	this.base[j][i]=2; //upper wals
	this.base[maxrows-1-j][i]=2; //lower walls
	}
}	
//then we init right and left walls
for(var i =0; i < maxrows ; i++)
{
	for(var j=0; j<wallsize ; j++)
	{
	this.base[i][j]=2;
	this.base[i][maxcols-1-j]=2;
	}
}	

objects.push(this); //add Map object to global object array

this.render = function() //render function for Map object //this will only render the wall data of object
{

	for(var i =0; i <maxrows ;i++)
		for(var j =0 ;j < maxcols;j++)
		{
			if(this.base[i][j] == 2) //we hit a wall we must draw it
			{
			ctx.fillStyle = "#333333";
			ctx.beginPath();
			ctx.rect(squaresize*i, squaresize*j, squaresize, squaresize);
			ctx.closePath();
			ctx.fill();
			}
		}

}

}

function Snake()
{
this.headX=initSnakeHeadPositionX;
this.headY=initSnakeHeadPositionY;
this.size=initSnakeSize;
this.snakeCells=new Array();
this.hasEaten=false; //to make snake grow bigger

//turn array 
this.turnBuffer=new Array();
this.turnIndice=-1; //current turn indice
//current direction of the snake
this.dx=1;
this.dy=0;

//turn command initated
this.turnCommandGiven=false;

//init first snake cells position
for(var i=0; i < initSnakeSize ; i++)
{
var tmp=new Object();
tmp.x=(this.headX-i);
tmp.y=(this.headY);
if(i == 0)
tmp.cellType = HEAD_RIGHT; //snake cell types defined at global js
else if( i < initSnakeSize-1 )
tmp.cellType = BODY_HORIZONTAL;
else
tmp.cellType = TAIL_LEFT; // the last cell is tail left type cell

this.snakeCells.push(tmp);
map.base[tmp.x][tmp.y]=1; //update base
}

this.render= function()
{

var TAIL_UP = 11;
var TAIL_DOWN = 12;
var TAIL_RIGHT = 13;
var TAIL_LEFT = 14;
	//TO DO: we should make this render function in a swithc or if else statements to render
	// different body parts of snake differently
	for(var i in this.snakeCells)
	{
	//test assign different colors for every cellType
	switch(this.snakeCells[i].cellType)
	{
		case  HEAD_UP:
		  ctx.fillStyle="black";
		break;
		
		case  HEAD_LEFT:
		  ctx.fillStyle="black";
		break;
		
		case  HEAD_DOWN:
		  ctx.fillStyle="black";
		break;
		
		case  HEAD_RIGHT:
		  ctx.fillStyle="black";
		break;
		
		case  BODY_HORIZONTAL:
		  ctx.fillStyle="green";
		break;
		
		case  BODY_VERTICAL:
		  ctx.fillStyle="red";
		break;
		
		case  BODY_RIGHT_UP:
		  ctx.fillStyle="black";
		break;
		
		case  BODY_RIGHT_DOWN:
		  ctx.fillStyle="black";
		break;
		
		case  BODY_LEFT_UP:
		  ctx.fillStyle="black";
		break;
		
		case  BODY_LEFT_DOWN:
		  ctx.fillStyle="black";
		break;
		
		case  TAIL_UP:
		  ctx.fillStyle="black";
		break;
		
		case  TAIL_DOWN:
		  ctx.fillStyle="black";
		break;
		
		case  TAIL_RIGHT:
		  ctx.fillStyle="black";
		break;
		
		case  TAIL_LEFT:
		  ctx.fillStyle="black";
		break;
	}

	//
	ctx.beginPath();
	ctx.rect(this.snakeCells[i].x*squaresize,this.snakeCells[i].y*squaresize,squaresize,squaresize);
	ctx.closePath();
	ctx.fill();
	}
}

//moves the snake using dx and dy and updates the snakeCells array,
//first checks simple collision detection 
//and also this function should update all snake cell types after each move
this.move= function()
{
this.turnCommandGiven=false;
//first we have to check posibility of  collision if we move
var head=this.snakeCells.shift();
var nextX=head.x+this.dx;
var nextY=head.y+this.dy;
var nextLocation= map.base[nextX][nextY];
//0 means that cell is empty, 1 means that a part of snake is in there 
//2 means that cell contains a wall, and -1 means cell has a food
if(nextLocation == 0)
{//empty cell move the snake and update the snakeCells
	this.snakeCells.unshift(head); //put old head back to snake
	var tmp=new Object();
	tmp.x=nextX;
	tmp.y=nextY;
	//update next cell that there is a part of snake now
	map.base[tmp.x][tmp.y]=1;
	this.snakeCells.unshift(tmp); //add new head
	var deleted=this.snakeCells.pop(); // remove one snake part from last
	//update map that deleted cell contains no more part of snake
	map.base[deleted.x][deleted.y]=0;
	
	
}
else if(nextLocation == -1) //yummy food!!
{
	this.snakeCells.unshift(head);
	var tmp=new Object();
	tmp.x=nextX;
	tmp.y=nextY;
	this.snakeCells.unshift(tmp);
	//this case we do not delete last part of snake to make it bigger
	game.randomFood(); //draw an other food
	var tm=(game.counter-game.lastEaten);
	var smp=1;
	if(tm <= 6)
	smp=100;
	else if(tm <=9)
	smp=50;
	else if(tm <= 13)
	smp=25;
	else if(tm <= 18)
	smp=10;
	else if(tm <= 23)
	smp=5;
	else if(tm <= 27)
	smp=3;
	else if(tm <= 30)
	smp=2;
	
	
	game.score = game.score+snakeSpeed*smp;
	
	document.getElementById("score").innerHTML="score : "+game.score;
	document.getElementById("smp").innerHTML=smp+"X";

	//update last eaten time
	game.lastEaten=game.counter;
} 
else if(nextLocation == 2 || nextLocation ==1) //there is a wall or part of snake game over
{
this.snakeCells.unshift(head);
game.over();
}

	//now update snake cells to correct cell types
	//first update new head type
	var newHead=this.snakeCells.shift();
	if(this.dx == 1 && this.dy == 0)
	newHead.cellType = HEAD_RIGHT;
	else if(this.dx == -1 && this.dy == 0)
	newHead.cellType = HEAD_LEFT;
	else if(this.dx == 0 && this.dy == 1)
	newHead.cellType = HEAD_UP;
	else if(this.dx == 0 && this.dy == -1)
	newHead.cellType = HEAD_DOWN;
	this.snakeCells.unshift(newHead); //put new head to its previous place at array
	
	//second update old head
	if((head.cellType == HEAD_RIGHT && this.dy == 1)||(head.cellType == HEAD_DOWN && this.dx == -1))
	head.cellType = BODY_RIGHT_UP;
	else if((head.cellType == HEAD_RIGHT && this.dy == -1)||(head.cellType == HEAD_UP && this.dx == -1))
	head.cellType = BODY_RIGHT_DOWN;
	else if((head.cellType == HEAD_LEFT && this.dy == 1)||(head.cellType == HEAD_DOWN && this.dx == 1))
	head.cellType = BODY_LEFT_UP;
	else if((head.cellType == HEAD_LEFT && this.dy == -1)||(head.cellType == HEAD_UP && this.dx == 1))
	head.cellType = BODY_LEFT_DOWN;
	
	if((head.cellType == HEAD_RIGHT && this.dy == 0) || (head.cellType == HEAD_LEFT && this.dy == 0))
	head.cellType = BODY_HORIZONTAL;
	else if((head.cellType == HEAD_UP && this.dx == 0) || (head.cellType == HEAD_DOWN && this.dx == 0))
	head.cellType = BODY_VERTICAL;
	
	
	//third we should update the new tail
	var newTail = this.snakeCells.pop(); //the old tail is the deleted object
	var beforeNewTail = this.snakeCells.pop(); //the before of newTail
	
	if(beforeNewTail.x > newTail.x && beforeNewTail.y == newTail.y)
	newTail.cellType = TAIL_LEFT;
	else if(beforeNewTail.x < newTail.x && beforeNewTail.y == newTail.y)
	newTail.cellType = TAIL_RIGHT;
	else if(beforeNewTail.y > newTail.y && beforeNewTail.x == newTail.x)
	newTail.cellType = TAIL_DOWN;
	else if(beforeNewTail.y < newTail.y && beforeNewTail.x == newTail.x)
	newTail.cellType = TAIL_UP;
	
	this.snakeCells.push(beforeNewTail);
	this.snakeCells.push(newTail);



}

this.turn = function()
{

if(this.turnIndice < 2) // only add new turn to queue if its length is smaller than 3
{
var tmpTurn = new Object();
// the snake can go at maximum 4 possible ways
		if((this.dx==1 || this.dx == -1)&& this.dy == 0) //going right or left
		{
			if(upDown) //turn up
			{tmpTurn.dx=0;tmpTurn.dy=-1;this.turnBuffer.push(tmpTurn);this.turnIndice++;}
			else if(downDown) //turn to down
			{tmpTurn.dx=0;tmpTurn.dy=+1;this.turnBuffer.push(tmpTurn);this.turnIndice++;}
		}else if(this.dx==0&&(this.dy == 1 || this.dy == -1)) //going up or down
		{
			if(rightDown) //turn right
			{tmpTurn.dx=1;tmpTurn.dy=0;this.turnBuffer.push(tmpTurn);this.turnIndice++;}
			else if(leftDown) //turn left
			{tmpTurn.dx=-1;tmpTurn.dy=0;this.turnBuffer.push(tmpTurn);this.turnIndice++;}
		}


}
		
}

this.updateDXDY= function()
{
if(this.turnIndice > -1)
{

	var turn=this.turnBuffer.shift();
	//alert(turn.dx+" "+turn.dy+" turn Indice "+this.turnIndice+" "+this.turnBuffer.length);
	this.dx=turn["dx"];
	this.dy=turn["dy"];
	this.turnIndice--;
}

}


}

function Game()
{
this.interval;
this.food;
this.score=0;
this.counter=0;
this.lastEaten=0;
this.over = function()
{
clearInterval(this.interval);
map.render();
snake.render();
alert("game over");
}



//main draw function that handles renderings


this.start = function()
{
this.interval=setInterval(drawt, gameInterval);
}

//create random food 
this.randomFood=function()
{
	//first get a list of free cells
	var free = new Array();
	
	for(var i =0; i < maxrows; i++)
		for(var j=0; j < maxcols; j++)
			if(map.base[i][j]==0)
			{
			var tmp = new Object();
			tmp.x=i;
			tmp.y=j;
			free.push(tmp);
			}
	
	// now select a random integer between 0 and free.length-1 then place a food there
	var ran= Math.floor(Math.random()*(free.length-1));
	this.food=free[ran];
	map.base[this.food.x][this.food.y]=-1;
}

this.renderFood=function()
{

	ctx.fillStyle="#CC0000";
	ctx.beginPath();
	ctx.rect(this.food.x*squaresize,this.food.y*squaresize,squaresize,squaresize);
	ctx.closePath();
	ctx.fill();	
}

this.draw = function()
{
	this.counter++;
	ctx.clearRect(wallxsquare,wallxsquare,redrawx,redrawy);
	snake.updateDXDY();
	snake.move();
	snake.render();
	game.renderFood();
}



}

function drawt()
{
game.draw();
}

