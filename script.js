let renderTime = 0;
let speed = 3.5;
const scoreD = document.getElementById('score');
let score = 0;
const game = document.getElementById('game');
let Snake = [{ x:0,y:11 }];
let food = { x:10,y:0 };
let direction = { x:1,y:0 };
let lastDirection = { x:1,y:0 };
window.addEventListener('keydown', e => {
    switch(e.key) {
        case('ArrowUp'):
            if(lastDirection.y !== 0) {
                break;
            }
            direction = { x:0,y:-1 };
            lastDirection = direction;
            break;
        case('ArrowDown'):
            if(lastDirection.y !== 0) {
                break;
            }
            direction = { x:0,y:1 };
            lastDirection = direction;
            break;
        case('ArrowLeft'):
            if(lastDirection.x !== 0) {
                break;
            }
            direction = { x:-1,y:0 };
            lastDirection = direction;
            break;
        case('ArrowRight'):
            if(lastDirection.x !== 0) {
                break;
            }
            direction = { x:1,y:0 };
            lastDirection = direction;
    }
})


function main(currentTime) {
    window.requestAnimationFrame(main);
    const renderSeconds = (currentTime - renderTime) / 1000;
    if(renderSeconds < 1 / speed) {
        return
    }
    renderTime = currentTime;
    scoreD.innerHTML = `<h2>Score ${score}</h2>`;
    if(Snake[0].x < 0 || Snake[0].y < 0 || Snake[0].x > 21 || Snake[0].y > 21) {
        alert('Game Over');
        Snake = [{ x:0,y:11 }];
        direction = { x:1,y:0 };
        lastDirection = { x:1,y:0 };
        food = { x:10,y:0 };
    }
    console.log(Snake[0].x, food.x, Snake[0].y, food.y);
    drawSnake();
    uptadeSnake();
    drawFood();
    if(onSnake()) {
        score++;
        randomFood();
        addSnake();
    }
}

// window.requestAnimationFrame(main);

function uptadeSnake() {
    for(let k = Snake.length - 2; k >= 0; k--) {
        Snake[k + 1] = {...Snake[k]}
    }
    Snake[0].x += direction.x;
    Snake[0].y += direction.y;
}

function onSnake() {
    if(Snake[0].x - 1 === food.x && Snake[0].y === food.y || Snake[0].x === food.x && Snake[0].y - 1 === food.y) {
        return true;
    } else {
        return false;
    }
}

function drawSnake() {
    game.innerHTML = "";
    Snake.forEach(elt => {
        const snakeElt = document.createElement('div');
        snakeElt.style.gridRowStart = elt.y;
        snakeElt.style.gridColumnStart = elt.x;
        snakeElt.style.zIndex = 2;
        snakeElt.classList.add('snake');
        game.appendChild(snakeElt);
    });
}

function randomFood() {
    food.x = Math.round(Math.random()) * 10;
    food.y = Math.round(Math.random()) * 10;
}

function drawFood() {
    const foodElt = document.createElement('div');
    foodElt.style.gridRowStart = food.y;
    foodElt.style.gridColumn = food.x;
    foodElt.style.zIndex = 1;
    foodElt.classList.add('food');
    game.appendChild(foodElt);
} 

function addSnake() {
    for(let x = 0; x < score; x++) {
        Snake.push({...Snake[Snake.length - 1]});
    }
}