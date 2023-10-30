var gameStarted=false;
var restarted=false;


window.addEventListener('DOMContentLoaded',() => {
    const startingAudio=document.getElementById("startingAudio");

        
    function playSound(){
        startingAudio.currentTime=0;
        startingAudio.play();
    }

    setTimeout(playSound,800);
    
});

const correctSound=new Audio("sounds/correctSound.mp3");

const wrongSound=new Audio("sounds/wrongSound.mp3");
wrongSound.volume=0.4;


const goBackButton=document.getElementById("goBackBtn");
goBackButton.addEventListener("click", ()=> {
    window.location.href="../index.html";
});


const bottomPanel=document.getElementById("bottom-panel");
if(!gameStarted){
    setTimeout(()=>{
        bottomPanel.style.cursor="pointer";
        bottomPanel.style.overflow="auto";
        
    },3000)
}




document.querySelector("#bottom-panel").addEventListener("click",()=>{
    if(!gameStarted){
        gameStarted=true;
        bottomPanel.style.cursor="default";
        const btn=document.getElementById("restartBtn");

        btn.classList.add("to-show-btn");
        btn.disabled=false;

        startGame();
    }
});

function makeBubbles(){

    var bubbles="";

    const guaranteeHit=Math.floor(Math.random()*210+1);

    for(let i=1;i<=210;i++){

        if(i===guaranteeHit){
            bubbles+=`<div class="bubble">${hitNum}</div>`;
            continue;
        }

        var num=Math.floor(Math.random()*150+1);
        bubbles+=`<div class="bubble">${num}</div>`;
    }

    document.querySelector('#bottom-panel').innerHTML=bubbles;
}




var timer=61;
var timerInterval;
function runTimer(){
    timerInterval=setInterval(function(){
        
        if(timer>0){
            timer--;
            document.querySelector("#timer").textContent=timer;
            
        }

        else{
            clearInterval(timerInterval);
            document.querySelector('#bottom-panel').innerHTML=`<h1>Game Over </h1>`;
        }
        
    },1000);
}




var hitNum;
function getHit(){
    hitNum=Math.floor(Math.random()*150 +1);
    document.querySelector("#hit").textContent=hitNum;

}




var score=0;
function increaseScore(){
    score++;
    document.querySelector("#score").textContent=score;
    
}

var hScore=0;
function highScore(){
    if(score>hScore) hScore=score;
    document.querySelector("#highScore").textContent=hScore;
}


document.querySelector("#bottom-panel").addEventListener("click",(event)=>{
    var clickedNum=Number(event.target.textContent);


    if(clickedNum===hitNum){

        correctSound.play();

        increaseScore();
        getHit();
        makeBubbles();
        highScore();
    }

    else if(clickedNum<151){
            
        

            wrongSound.play();

            var wrongBubble=event.target;
            wrongBubble.classList.add("wrongBubble");
            wrongBubble.classList.remove("bubble");

            setTimeout(()=>{
                wrongBubble.classList.remove("wrongBubble");
                wrongBubble.classList.add("bubble");

            },600);

            
        
    }
})

function restartGame(){

    document.querySelector('#bottom-panel').innerHTML=`<h1>Restarting Game </h1>`;
    
    score=0;
    timer=61;
    clearInterval(timerInterval);
    restarted=true;
    startGame();
    

    
}


function startGame(){

    document.querySelector("#hit").textContent="-";

    if(!restarted){
        document.querySelector('#bottom-panel').innerHTML=`<h1>Starting Game </h1>`;
        
    }
    
    else{
        document.querySelector("#timer").textContent="60";
        document.querySelector("#score").textContent="0";
        
    }


    runTimer();
    setTimeout(()=>{
        getHit();
        makeBubbles();
        
    },1000);
    
    
    
}




