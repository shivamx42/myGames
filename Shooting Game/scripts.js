
const backgroundMusic=document.getElementById("backgroundMusic");
backgroundMusic.volume=0.2;

const playerGunSound=new Audio("sounds/playerGunSound.wav");
playerGunSound.volume=0.6;

const enemyGunSound=new Audio("sounds/enemyGunSound.wav");
enemyGunSound.volume=0.4;

const lostSound=new Audio("sounds/lostSound.mp3");
const victorySound=new Audio("sounds/victorySound.mp3");


var isGameOver=true;
var healthRemaining;

const container=document.querySelector("#container");
const gameArea=document.querySelector("#gameArea");
const btn=document.querySelector("#btn");
const span=document.querySelector("#gameOverSpan");
const btnSpan=document.querySelector("#btnSpan");
const healthBar=document.querySelector("#healthBar");

btn.addEventListener

gameArea.addEventListener("click",()=>{

    if(!isGameOver){
        
        playerGunSound.play();
    }
})




function fromLeft(){
    return Math.random()*200-100;
}

function fromBottom(){
    const random = Math.random();

    if(random<0.5){
        return random*25-30;
    }
    else return random*60+50;
     
      
    
}

function toLeft(){
    return Math.random()*85+2;
}

function toRotate(){
    return Math.random()*200-100;
}

var enemiesDiv="";



function makeEnemies(){
    for(let i=0;i<30;i++){


        enemiesDiv+=`<div class="enemy" style="left: ${fromLeft()}rem; bottom: ${fromBottom()}rem; transform: rotate(${toRotate()}deg); z-index: 1;" id=enemy${i} onclick="enemyShot(this)"></div>`;
    }

    gameArea.innerHTML=enemiesDiv;
}
makeEnemies();




function enemyIsShown(enemy){


    if(!enemy.classList.contains("enemyDead") && !isGameOver){
        // enemy.classList.add("enemyShown");

        const rBottom=Math.random()*30;
        const rScale=Math.random()*1 + 0.2;
        const rHueRotate=Math.random()*360;
        

        enemy.style.bottom=rBottom+"rem";
        enemy.style.left=`${toLeft()}rem`
        enemy.style.transform=`scale(${rScale})`;
        enemy.style.filter=`hue-rotate(${rHueRotate}deg)`;
        
        


        setTimeout(()=>{

            enemyShooting(enemy);
        },600); 
        

        setTimeout(()=>{
            enemy.style.left=`${fromLeft()}rem`
            enemy.style.bottom=`${fromBottom()}rem`;

        },700); 
    }
}

function enemyShooting(enemy){


    if(!enemy.classList.contains("enemyDead") && !isGameOver){
        enemyGunSound.play();


        enemy.classList.add("enemyShooting");
        updateHealth(healthRemaining-10);

        setTimeout(()=>{
            enemy.classList.remove("enemyShooting");
        },200);
    }
}


function updateHealth(health){

    healthRemaining=health;
    
    if(healthRemaining<=50) healthBar.classList.add("healthBarGlow");
    if(healthRemaining<=1 && healthRemaining>0) healthBar.style.width="1px";
    else healthBar.style.width=healthRemaining/4+"%";

    if(healthRemaining<=0){

        backgroundMusic.pause();
        lostSound.play();
        setTimeout(()=>{backgroundMusic.play()},4000);


        isGameOver=true;
        btn.style.animation="none";
        btn.style.display="block";

        gameArea.style.cursor="default";

        healthBar.style.width="0";
        healthBar.classList.remove("healthBarGlow");

        container.style.filter="grayscale(100%) blur(4px)";
        

        span.style.opacity="1";
        span.textContent="You Lost!";

        btnSpan.textContent="Try Again";
        btn.style.cursor="pointer";
        btn.disabled=false;
        

        
    }

}


function livingEnemies(){
    return document.querySelectorAll(".enemy:not(.enemyDead)");
}

function enemyShot(enemy){

    if(!isGameOver){
        enemy.classList.add("enemyDead");
        enemy.style.filter="grayscale(100%)";
        

        enemy.style.transform=`rotate(${toRotate()}deg)`;
    }

    if(!livingEnemies().length && !isGameOver){

        backgroundMusic.pause();
        victorySound.play();
        setTimeout(()=>{backgroundMusic.play()},3200);

        isGameOver=true;
        

        btn.style.animation="none";
        btn.style.display="block";
        
        
        
        container.style.filter="grayscale(100%) blur(4px)";
        

        healthBar.style.width="0";
        healthBar.classList.remove("healthBarGlow");

        
        gameArea.style.cursor="default";

        span.style.opacity="1";
        span.textContent="You Won!!";

        btnSpan.textContent="Play Again";
        btn.style.cursor="pointer";
    }
}



function randomEnemyAttack(){

    

    var rndEnemy=Math.floor(Math.random()*livingEnemies().length);
    


    var enemy=livingEnemies()[rndEnemy];
    

    



    if(!isGameOver){
        setTimeout(()=>{
            enemyIsShown(enemy);

            randomEnemyAttack();            

            
        },1000);

        
    }






    
    

}


btn.addEventListener("click",()=>{

    isGameOver=false;

    if(!isGameOver) btn.style.display="none";
        
    


    
    container.style.filter="grayscale(0%)";

    span.textContent="";
    gameArea.style.cursor="crosshair";

    healthBar.style.opacity="1";
    healthBar.style.width="100%";


    span.style.opacity="0";
    btn.style.cursor="crosshair";

    const deadEnemies=document.querySelectorAll(".enemyDead");

    deadEnemies.forEach((enemy=>{
        enemy.classList.remove("enemyDead");
    }))

    
    healthRemaining=400;
    randomEnemyAttack();
})
