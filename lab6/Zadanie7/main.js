let isGameRunning = false
const username = document.getElementById("username");
let remainignLives = 3;
let score = 0;

const killZombiePoints = 12
const missShotPoints = 6

const cursor = document.getElementById("cursor");

const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const nickSpan = document.getElementById("nick");
const livesSpan = document.getElementById("lives");
const scoreSpan = document.getElementById("score");

const btnStart = document.getElementById("btnStart");
const btnAgain = document.getElementById("playAgain");
const divStart = document.getElementById("modalStart");
const game = document.getElementById("game"); 
const divEnd = document.getElementById("modalEnd");
const standings = document.getElementById("standings");

let zombieList = [];

const TIME_BETWEEN_ZOMBIES_MEAN = 1000;
const TIME_BETWEEN_ZOMBIES_DEVIATION = 0.5;
class ZombieGenerator {

    constructor() {
        this.nextGenerationTimeStamp;
        this.randomizeNextZombieAppearance();
    }

    generateZombie() {
        return new Zombie();
    }

    randomizeNextZombieAppearance() {
        const timeToGenerate = TIME_BETWEEN_ZOMBIES_MEAN * 
                    (1 + (Math.random() * 2 - 1) * TIME_BETWEEN_ZOMBIES_DEVIATION);

        if (this.nextGenerationTimeStamp === undefined) {
            this.nextGenerationTimeStamp = Date.now() + timeToGenerate;
        }
        else {
            this.nextGenerationTimeStamp = Date.now() + timeToGenerate;
        }
    }

    readyToGenerate() {
        return this.nextGenerationTimeStamp <= Date.now();
    }
}

class Zombie {
    constructor() {
        this.imgWidth = 200;
        this.imgHeight = 312;
        this.sizeScaleFactor = (Math.floor(Math.random() * 51) - 15) / 100;


        this.isAlive = true;
        this.currFrame = 0;
        this.width = this.imgWidth * (1 + this.sizeScaleFactor);
        this.height = this.imgHeight * (1 + this.sizeScaleFactor);
        this.x = canvas.width;
        this.y = canvas.height - this.height - Math.floor(Math.random() * 101);
        this.speed = Math.floor(Math.random() * 6) * 3

        this.image = new Image();
        this.image.src = "images/walkingdead.png";
    }

    move() {
        this.x -= this.speed;
        this.currFrame = (this.currFrame + 1) % 10;
    }
}

function calcNextFrame(){
    for (let zombie of zombieList) {
        if (zombie.isAlive) {
            zombie.move();

            if (zombie.x + zombie.width < 0) {
                remainignLives--;
                zombie.isAlive = false;
            }
        } else {
            zombieList.splice(zombieList.indexOf(zombie), 1);
        }
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let zombie of zombieList) {
        if (zombie.isAlive) {
            ctx.drawImage(zombie.image, zombie.currFrame * zombie.imgWidth, 0, zombie.imgWidth, zombie.imgHeight, zombie.x, zombie.y, zombie.width, zombie.height);
        }
    }

    livesSpan.innerText = remainignLives;
    scoreSpan.innerText = score;
}

function gameLoop(){
    generator = new ZombieGenerator();

    function loop() {
        if (remainignLives <= 0) {
            endGame();
            return;
        }

        if (generator.readyToGenerate()) {
            zombieList.push(generator.generateZombie());
            generator.randomizeNextZombieAppearance();            
        }  

        calcNextFrame();
        render();
    
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}

function startGame() {
    if (username.value.length > 0) {
        divStart.classList.add("hidden");
        game.classList.remove("hidden");
        nickSpan.innerText = username.value;
        livesSpan.innerText = remainignLives;
        scoreSpan.innerText = score;
        isGameRunning = true;

        gameLoop();
    }
    else window.alert("Enter your nickname!");
}

function endGame() {
    divEnd.classList.remove("hidden");
    game.classList.add("hidden");
    isGameRunning = false;

    li = document.createElement("li");
    li.innerText = `${username.value} - ${score}`;
    standings.appendChild(li);
}


window.onmousedown = (e) => {
    if (!isGameRunning) return;
    
    for (let zombie of zombieList) {
        if (e.pageX > zombie.x && e.pageX < zombie.x + zombie.width && e.pageY > zombie.y && e.pageY < zombie.y + zombie.height) {
            score += killZombiePoints;
            zombie.isAlive = false;
            return;
        }
    }
    
    score -= missShotPoints;
}

window.onmousemove = (e) => {
    cursor.style.left = (e.pageX - 20) + "px";
    cursor.style.top = (e.pageY - 20) + "px";
} 

btnStart.addEventListener("click", startGame);
btnAgain.addEventListener("click", () => {
    divEnd.classList.add("hidden");
    game.classList.add("hidden");
    divStart.classList.remove("hidden");
    remainignLives = 3;
    score = 0;
    zombieList = [];

    startGame();
});

