var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var frog = new Image(); frog.src = "../img/dogger.png";
// var sx = 0; //no need for this with current png
// var sy = 0;
// var swidth = 40;
// var sheight = 40;
var x = 50;
var y = 444;
var width = 30;
var height = 30;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var up = true;
var down = true;
var right = true;
var left = true;

var carLeft = new Image(); carLeft.src = "../img/carLeft.png";
var carRight = new Image(); carRight.src = "../img/carRight.png";
var carX1 = 100;
var carY1 = 400;
var carWidth = 60;
var carHeight = 35;
var carX2 = 500;
var carY2 = 400;
var carX3 = 460;
var carY3 = 355;
var carX4 = 60;
var carY4 = 355;
var carX5 = 360;
var carY5 = 265;
var carX6 = 400;
var carY6 = 310;
var carX7 = 100;
var carY7 = 310;
var carX8 = 160;
var carY8 = 265;

var rockX1 = 300;
var rockY1 = 180;
var rockWidth = 120;
var rockHeight = 30;
var rockX2 = 40;
var rockY2 = 180;
var rockX3 = 100;
var rockY3 = 136;
var rockX4 = 400;
var rockY4 = 136;
var rockX5 = 480;
var rockY5 = 92;
var rockX6 = 60;
var rockY6 = 92;
var rockX7 = 120;
var rockY7 = 48;
var rockX8 = 500;
var rockY8 = 48;

var padWidth = 30;
var padHeight = 30;
var padX1 = 20;
var padY1 = 4;
var padX2 = 120;
var padY2 = 4;
var padX3 = 220;
var padY3 = 4;
var padX4 = 320;
var padY4 = 4;
var padX5 = 420;
var padY5 = 4;
var padX6 = 520;
var padY6 = 4;

var pad1 = false;
var pad2 = false;
var pad3 = false;
var pad4 = false;
var pad5 = false;
var pad6 = false;

var lives = 5;
var livesLost = 0;
var play = true;
var victoryCondition = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e)
{
    if(e.keyCode == 39) {rightPressed = true;}
    if(e.keyCode == 37) {leftPressed = true;}
    if(e.keyCode == 38) {upPressed = true;}
    if(e.keyCode == 40) {downPressed = true;}
}
function keyUpHandler(e)
{
    if(e.keyCode == 39) {rightPressed = false;}
    if(e.keyCode == 37) {leftPressed = false;}
    if(e.keyCode == 38) {upPressed = false;}
    if(e.keyCode == 40) {downPressed = false;}
}

function drawBackground() {
// grass background
ctx.fillStyle = "lime";
ctx.fillRect(0, 440, 570, 45);

ctx.fillStyle = "brown";
ctx.fillRect(0, 220, 570, 45);

// lower lane divider
ctx.beginPath();
ctx.moveTo(0,395);
ctx.lineTo (570,395);
ctx.strokeStyle = "white";
ctx.setLineDash([5]);
ctx.strokeWidth = 2;
ctx.stroke();
// middle divider
ctx.beginPath();
ctx.moveTo(0,350);
ctx.lineTo (570, 350);
ctx.strokeStyle = "white";
ctx.setLineDash([0]);
ctx.strokeWidth = 4;
ctx.stroke();
// upper lane divider
ctx.beginPath();
ctx.moveTo(0,305);
ctx.lineTo (570, 305);
ctx.strokeStyle = "white";
ctx.setLineDash([5]);
ctx.strokeWidth = 2;
ctx.stroke();

// draw lava
ctx.fillStyle= "orange";
ctx.fillRect(0, 0, 570, 220);
}

function drawFrog() {
    ctx.drawImage(frog, x, y, width, height);
}

function moveFrog() {
    if  (upPressed==true && up==true && y > 20) {
        y = y - 44;
        up = false;
        }
    if (upPressed==false) {
        up = true;
    }
    
    if  (downPressed==true && down==true && y + height < canvas.height - 80) {
        y = y + 44;
        down = false;
        }
    if (downPressed==false) {
        down = true;
    }
    
    if  (rightPressed==true && right==true && x + width < canvas.width - 20) {
        x = x + 44;
        right = false;
        }
    if (rightPressed==false) {
        right = true;
    }
    
    if (leftPressed==true && left==true && x > 20) {
        x = x - 44;
        left = false;
        }
    if (leftPressed==false) {
        left = true;
    }
}

function drawCars(){

    var carsRX = [carX1, carX2, carX3, carX4];
    var carsRY = [carY1, carY2, carY3, carY4];
    var carsLX = [carX5, carX6, carX7, carX8];
    var carsLY = [carY5, carY6, carY7, carY8];

    for (i = 0; i < carsRX.length; i++) {
        ctx.drawImage(carRight, carsRX[i], carsRY[i], carWidth, carHeight);
    }

    for (i = 0; i < carsLX.length; i++) {
        ctx.drawImage(carLeft, carsLX[i], carsLY[i], carWidth, carHeight);
    }

    
}

function moveCars() {
    if (carX1 < canvas.width + 100) {
        carX1 = carX1 + 5;
    }
    else {
        carX1 = -100;
    }

    if (carX2 < canvas.width + 100) {
        carX2 = carX2 + 5;
    }
    else {
        carX2 = -100;
    }

    if (carX3 < canvas.width + 100) {
        carX3 = carX3 + 4;
    }
    else {
        carX3 = -100;
    }

    if (carX4 < canvas.width + 100) {
        carX4 = carX4 + 4;
    }
    else {
        carX4 = -100;
    }

    if (carX5 > - 100) {
        carX5 = carX5 - 5;
    }
    else {
        carX5 = canvas.width + 100;
    }

    if (carX6 > - 100) {
        carX6 = carX6 - 3;
    }
    else {
        carX6 = canvas.width + 100;
    }

    if (carX7 >- 100) {
        carX7 = carX7 - 3;
    }
    else {
        carX7 = canvas.width + 100;
    }

    if (carX8 > - 100) {
        carX8 = carX8 - 5;
    }
    else {
        carX8 = canvas.width + 100;
    }
}

function runOver() {

    var carsX = [carX1, carX2, carX3, carX4, carX5, carX6, carX7, carX8];
    var carsY = [carY1, carY2, carY3, carY4, carY5, carY6, carY7, carY8];

    for (i = 0; i < carsX.length; i++){
        if (carsX[i] <= x + width &&
            carsX[i] + carWidth >= x &&
            carsY[i] + carHeight >= y &&
            carsY[i] <= y + height) {
                y= 488;
                x= 250;
                livesLost ++;
            }
                
        
    }

    // if (carX1 <= x + width &&
    //     carX1 + carWidth >= x && 
    //     carY1 + carHeight >= y &&
    //     carY1 <= y + height) {
    //         y= 488;
    //     }   just to see how adding multiple cars changed the code above^^^
}

function drawRocks() {
    ctx.fillStyle = "grey";
    var rocksX = [rockX1, rockX2, rockX3, rockX4, rockX5, rockX6, rockX7, rockX8];
    var rocksY = [rockY1, rockY2, rockY3, rockY4, rockY5, rockY6, rockY7, rockY8];
    for (i = 0; i < rocksX.length; i++) {
        ctx.fillRect(rocksX[i], rocksY[i], rockWidth, rockHeight);
    }
}

function moveRocks() {
if (rockX1 < canvas.width + 100) {
    rockX1 = rockX1 + 2;
    }
    else {
        rockX1 = -100;
    }
if (rockX2 < canvas.width + 100) {
    rockX2 = rockX2 + 2;
    }
    else {
        rockX2 = -100;
    }
if (rockX3 > 0-rockWidth) {
    rockX3 = rockX3 - 2;
    }
    else {
        rockX3 = canvas.width + 100;
    }
if (rockX4 > 0-rockWidth) {
    rockX4 = rockX4 - 2;
    }
    else {
        rockX4 = canvas.width + 100;
    }
if (rockX5 < canvas.width + 100) {
    rockX5 = rockX5 + 3;
    }
    else {
        rockX5 = -100;
    }
if (rockX6 < canvas.width + 100) {
    rockX6 = rockX6 + 3;
    }
    else {
        rockX6 = -100;
    }
if (rockX7 > 0-rockWidth) {
    rockX7 = rockX7 - 2;
    }
    else {
        rockX7 = canvas.width + 100;
    }
if (rockX8 > 0-rockWidth) {
    rockX8 = rockX8 - 2;
    }
    else {
        rockX8 = canvas.width + 100;
    }
}

function float() {
    if (rockX1 <= x + width &&
            rockX1 + rockWidth >= x &&
            rockY1 + rockHeight >= y &&
            rockY1 <= y + height) {
                if(x < canvas.width - 30){
                    x = x + 2;
                }
            }
    else if (rockX2 <= x + width &&
        rockX2 + rockWidth >= x &&
        rockY2 + rockHeight >= y &&
        rockY2 <= y + height) {
            if(x < canvas.width - 30){
                x = x + 2;
            }
        }
    else if (rockX3 <= x + width &&
        rockX3 + rockWidth >= x &&
        rockY3 + rockHeight >= y &&
        rockY3 <= y + height) {
            if(x > 0){
                x = x - 2;
            }
        }
    else if (rockX4 <= x + width &&
        rockX4 + rockWidth >= x &&
        rockY4 + rockHeight >= y &&
        rockY4 <= y + height) {
            if(x > 0){
                x = x - 2;
            }
        }
    else if (rockX5 <= x + width &&
        rockX5 + rockWidth >= x &&
        rockY5 + rockHeight >= y &&
        rockY5 <= y + height) {
            if(x < canvas.width - 30){
                x = x + 3;
            }
        }
    else if (rockX6 <= x + width &&
        rockX6 + rockWidth >= x &&
        rockY6 + rockHeight >= y &&
        rockY6 <= y + height) {
            if(x < canvas.width - 30){
                x = x + 3;
            }
        }
    else if (rockX7 <= x + width &&
        rockX7 + rockWidth >= x &&
        rockY7 + rockHeight >= y &&
        rockY7 <= y + height) {
            if(x > 0){
                x = x - 2;
            }
        }
    else if (rockX8 <= x + width &&
        rockX8 + rockWidth >= x &&
        rockY8 + rockHeight >= y &&
        rockY8 <= y + height) {
            if(x > 0){
                x = x - 2;
            }
        }

    else if (y < 220 && y > 44){
        y = 488;
        x = 250;
        livesLost ++;
    }
    
}

function drawPads() {
    ctx.fillStyle = "seagreen";
    var padsX = [padX1, padX2, padX3, padX4, padX5, padX6];
    var padsY = [padY1, padY2, padY3, padY4, padY5, padY6];

    for (i = 0; i < padsX.length; i++) {
        ctx.fillRect(padsX[i], padsY[i], padWidth, padHeight);
    }
}

function onPad() {
    if (padX1 <= x + width &&
        padX1 +padWidth >= x &&
        padY1 + padHeight >= y &&
        padY1 <= y + height) {
            pad1 = true;
            y = 488;
            x = 250;
        }

    else if (padX2 <= x + width &&
            padX2 + padWidth >= x &&
            padY2 + padHeight >= y &&
            padY2 <= y + height) {
                pad2 = true;
                y = 488;
                x = 250;
            }
    else if (padX3 <= x + width &&
            padX3 + padWidth >= x &&
            padY3 + padHeight >= y &&
            padY3 <= y + height) {
                pad3 = true;
                y = 488;
                x = 250;
            }
    else if (padX4 <= x + width &&
            padX4 + padWidth >= x &&
            padY4 + padHeight >= y &&
            padY4 <= y + height) {
                pad4 = true;
                y = 488;
                x = 250;
            }
    else if (padX5 <= x + width &&
            padX5 + padWidth >= x &&
            padY5 + padHeight >= y &&
            padY5 <= y + height) {
                pad5 = true;
                y = 488;
                x = 250;
            }
    else if (padX6 <= x + width &&
            padX6 + padWidth >= x &&
            padY6 + padHeight >= y &&
            padY6 <= y + height) {
                pad6 = true;
                y = 488;
                x = 250;
            }

    else if (y < 48) {
        y = 488;
        x = 250;
        livesLost++;
        }
    var pads = [pad1, pad2, pad3, pad4, pad5, pad6]
    var padsX = [padX1, padX2, padX3, padX4, padX5, padX6]
    var padsY = [padY1, padY2, padY3, padY4, padY5, padY6]

    for(i = 0; i < pads.length; i++) {
        if (pads[i] === true) {
            ctx.drawImage (frog, padsX[i], padsY[i], 30, 30);
        }
    }
}

function drawLives() {
    if (lives - livesLost != 0){
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("LIVES: " + (lives - livesLost), (canvas.width/2)-78, 525);
    }
}

function victory() {
    // var pads = [pad1, pad2, pad3, pad4, pad5, pad6];
    // DID NOT WORK, VICTORY ON EVERY PAD
    // for(i = 0; i < pads.length; i++) {
    //     if (pads[i] === true){
    //     ctx.fillStyle = "white";
    //     ctx.font = "30px Arial";
    //     ctx.fillText("You won!", (canvas.width/2)-60, 525);
    //     victoryCondition = true;
    //     }
    // }

    if (pad1 && pad2 && pad3 && pad4 && pad5 && pad6){
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("You won!", (canvas.width/2)-60, 525);
        victoryCondition = true;
        }
}

function gamesOver() {
    if (lives - livesLost == 0) {
        play = false;
        ctx.fillStyle = "white";
        ctx.font = "54px Arial";
        ctx.fillText("GAME OVER MAN!!", 0, 100);
        ctx.font = "28px Arial";
        ctx.fillText("Refresh to try again!", 50, 150)
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (victoryCondition === false){
        gamesOver();
        drawLives();
    }
    if(play){
    drawBackground();
    drawRocks();
    moveRocks();
    drawPads();
    onPad();
    drawFrog();
    moveFrog();
    drawCars();
    moveCars();
    runOver();
    float();
    victory();
    }

    requestAnimationFrame(draw);
}
draw();