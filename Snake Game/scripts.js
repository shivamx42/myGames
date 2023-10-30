const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

const gameOverSound=new Audio("sounds/gameOverSound2.mp3");

const eatingSound=new Audio("sounds/eatingSound3.mp3");
eatingSound.volume=0.3;


window.addEventListener('DOMContentLoaded',() => {
    const startingAudio=document.getElementById("startingAudio");

        
    startingAudio.play();

    
    
});

class SnakePart{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
}

let speed=8;

let tileCount=24;
let tileSize=canvas.width/(tileCount-2)-2;
let headX=Math.floor(Math.random()*tileCount);
let headY=Math.floor(Math.random()*tileCount);
 
const snakeParts=[];
let tailLength=0;

let itemX=Math.floor(Math.random()*tileCount);
let itemY=Math.floor(Math.random()*tileCount);

let xVelocity=0;
let yVelocity=0;

let gameStarted=false;
let score=0;
let highScore=0;


const restartBtn=document.getElementById("restartBtn");




function startGame(){	

	changeSnakePos();

	
	let result=gameOver();
	if(result) return;

	drawBoard();

	

	checkItemCollision();


	if(gameStarted) drawItem();
	

	drawSnake();

	drawScore();

	if(!gameStarted) startGameMessage();

	setTimeout(startGame,1000/speed);
}

function startGameMessage(){

	ctx.fillStyle="black";
	ctx.font="20px Noto Sans TC";

	ctx.fillText("Press Arrow or WASD Keys to move the snake",canvas.width/8,canvas.height/2);
		
}

function gameOver(){
	
	let check=false;

	

	if(headX<0 || headX === tileCount || headY<0 || headY === tileCount) check=true;


	if(!check){

		for(let i=0;i<snakeParts.length;i++){
			let part=snakeParts[i];

			if(part.x===headX && part.y===headY){
				check=true;
				break;
			}
		}
	}

	if(check){

		gameOverSound.play();

		ctx.fillStyle="black";
		ctx.font="500 50px Noto Sans TC";

		ctx.fillText("Game Over!",canvas.width/3.9,canvas.height/2);

	

		restartBtn.classList.add("to-show-btn");
        restartBtn.disabled=false;
		
		
	}

	

	return check;
	
}

function drawScore(){
	ctx.fillStyle="black";
	ctx.font="bold 15px Noto Sans TC";
	
	ctx.fillText("Score: "+score,canvas.width-560,25);
	


	ctx.fillStyle="black";
	ctx.font="bold 15px Noto Sans TC";
	ctx.fillText("High Score: "+highScore,canvas.width -115,25);
}

function drawBoard(){
	ctx.fillStyle="rgba(96, 169, 135, 0.929)";
	ctx.fillStyle="#8BC6EC";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	ctx.strokeStyle="black";
	ctx.lineWidth=8; 
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
}


function drawSnake(){
	

	ctx.fillStyle="#176B87";
	ctx.fillStyle="#186F65";
	// ctx.fillStyle="rgba(96, 169, 135, 0.929)";

	for(let i=0;i<snakeParts.length;i++){
		let part=snakeParts[i];
		ctx.fillRect(part.x*tileCount,part.y*tileCount,tileSize,tileSize);
	}

	snakeParts.push(new SnakePart(headX,headY));

	if(snakeParts.length>tailLength){
		snakeParts.shift();
	}

	ctx.fillStyle="#132043";
	ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);

	ctx.strokeStyle="black";
	ctx.lineWidth=2; 
	ctx.strokeRect(headX*tileCount,headY*tileCount,tileSize,tileSize);

}


function drawItem(){
	
	ctx.fillStyle="#c40e42";
	ctx.fillRect(itemX*tileCount,itemY*tileCount,tileSize-2,tileSize-2);


}

function checkItemCollision(){
	if(itemX===headX && itemY===headY){

		eatingSound.play();

		itemX=Math.floor(Math.random()*tileCount);
		itemY=Math.floor(Math.random()*tileCount);


		tailLength++;
		score++;

		if(score>highScore) highScore=score;

		if(score%3===0 && speed<20) speed+=0.5;
	}
}

function changeSnakePos(){
	headX+=xVelocity;
	headY+=yVelocity;
}

document.addEventListener("keydown",keydown);

function keydown(event){

	
		
	


	if(event.key==='w' || event.key==='ArrowUp'){

		gameStarted=true;

		if(yVelocity!=1){
			yVelocity=-1;
			xVelocity=0;
		}

		
	}

	else if(event.key==='s' || event.key==='ArrowDown'){

		gameStarted=true;

		if(yVelocity!=-1){
			yVelocity=1;
			xVelocity=0;
		}

		
	}

	else if(event.key==='a' || event.key==='ArrowLeft'){

		gameStarted=true;

		if(xVelocity!=1){
			yVelocity=0;
			xVelocity=-1;
		}

		
	}

	else if(event.key==='d' || event.key==='ArrowRight'){

		gameStarted=true;

		if(xVelocity!=-1){
			yVelocity=0;
			xVelocity=1;
		}

		
	}

	

	
}


const goBackButton=document.getElementById("goBackBtn");
goBackButton.addEventListener("click", ()=> {
    window.location.href="../index.html";
});

restartBtn.addEventListener("click",restartGame);


function restartGame() {

    snakeParts.length=0;
    tailLength=0;

    headX=Math.floor(Math.random()*tileCount);
    headY=Math.floor(Math.random()*tileCount);

    itemX=Math.floor(Math.random()*tileCount);
    itemY=Math.floor(Math.random()*tileCount);

    xVelocity=0;
    yVelocity=0;

    gameStarted=false;
    score=0;
    speed=8;

	restartBtn.classList.remove("to-show-btn");
	restartBtn.disabled=true;
	

    startGame();
}


startGame();



