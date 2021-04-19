let canvas = document.getElementById('snake');
let ctx = canvas.getContext('2d');
let box = 32;
let scoreDisplay = document.querySelector ("span");
let score = 0;
let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box 
}

let direction= "right";
let food = {    // Cria as comidas aleatorias 
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    ctx.fillStyle = 'rgba(255, 165, 0, 1)'; // DEFINE A COR DO RETANGULO
    ctx.fillRect(0, 0, 16 * box, 16 * box); // DESENHA O RETANGULO DO JOGO
    ctx.strokeRect(0,0, 16 * box, 16 * box); // DEFINE BORDA NO BACKGROUND
    ctx.strokeStyle = "white";
}

function criarCobrinha() {
    for(i=0; i<  snake.length; i++){
        ctx.fillStyle = "black";
        ctx.fillRect(snake[i].x, snake[i].y, box, box); // DEFINE O TAMNHO DA COBRINHA PELO ATRIBUTO X E Y 
        ctx.strokeRect(0,0, 16 * box, 16 * box); // DEFINE BORDA NO BACKGROUND
    }
}

function drawFood() { 
    ctx.fillStyle = "black"; // DEFINE A COR DAS COMIDAS QUE IRÃO APARECER NO RETANGULO
    ctx.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){ 
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
    
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y= 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;   
    
    for (i= 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("Game Over :( ")
            scoreDisplay.innerHTML = score;
            location.reload();
        }
    }

        criarBG();
        criarCobrinha();
        drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

   if(snakeX != food.x || snakeY != food.y){
        snake.pop();  

    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        score += 10;
        scoreDisplay.innerHTML = score;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

        snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
