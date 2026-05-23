const clickSound= new Audio("Crunch.mp3");
const boomSound= new Audio("Boom.mp3");
const bgMusic= new Audio("Baking.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.3;

const regularCookies = ['images/Creeper.png', 'images/Enderman.png', 'images/TNT.png', 'images/Pig.png', "images/Grass_Block.png"];
const goldenCookieImg = 'images/Dragon_Egg.png';
const container = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score')
const timerDisplay = document.getElementById('timer')
const startBtn= document.getElementById('button')

let score = 0;
let timeLeft = 30;
let gameActive= false;

startBtn.addEventListener('click', startGame);

function startGame() {
    score= 0;
    timeLeft= 30;
    gameActive= true;
    startBtn.disabled= true;
    container.innerHTML= '';

bgMusic.currentTime = 0;
bgMusic.play();


const countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(countdown);
        gameActive=false;
        startBtn.disabled= false;
        alert("Game Over! Score: " + score)
    }
}, 1000);

setInterval(createCookie,800);
}





function createCookie() {
    if (!gameActive) return;

    const cookie = document.createElement('img');
    cookie.classList.add('cookie');
    
    if (Math.random()< 0.001){
        cookie.src = TNT.png;
        cookie.dataset.points = 5;
        cookie.classList.add('golden')
    }else{
        const rand = Math.floor(Math.random() * regularCookies.length);
        cookie.src = regularCookies[rand];
        cookie.dataset.points = 1; 
    }
    cookie.style.left = Math.random() * 520 + 'px';
    cookie.style.top = Math.random() * 320 + 'px';

    container.appendChild(cookie);
}

cookie.addEventListener('mousedown', function() {
    score += parseInt(this.dataset.points);
    scoreDisplay.innerText = score;
    this.remove();
});

setTimeout(() => {
    if (cookie.parentElement) cookie.remove();
}, 1200);
