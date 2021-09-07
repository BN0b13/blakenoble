// NOTES: Canvas is dynamically set up on a 12x12 grid.
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasSize = canvas.getBoundingClientRect();
const gridSize = 12;
canvas.width = (document.documentElement.clientWidth * .99) - canvasSize.left < document.documentElement.clientHeight - canvasSize.top ? gridChecker(Math.round(document.documentElement.clientWidth * .99)) : gridChecker(Math.round((document.documentElement.clientHeight * .99) - canvasSize.top));
canvas.height = canvas.width;
const mapW = canvas.width;
const mapH = canvas.height;
const tileX =  mapW  / gridSize;
const tileY =  mapH  / gridSize;
const startX = tileX*5;
const startY = tileY*10;
let mainScreenActive = true;
let play = false;
let victoryCondition = false;
const speed = {
  verySlow: mapW*0.002,
  slow: mapW*0.003,
  medium: mapW*0.004,
  fast: mapW*0.005,
  veryFast: mapW*0.006
};

canvas.ontouchstart = letsPlay;
canvas.addEventListener('click', letsPlay);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


const carLeft = new Image(); carLeft.src = "../img/carLeft.png";
const carRight = new Image(); carRight.src = "../img/carRight.png";
const carWidth = tileX*2;
const carHeight = tileY*.9;
let carX1 = tileX;
let carY1 = tileY*9;
let carX2 = tileX*6;
let carY2 = tileY*9;
let carX3 = tileX*3;
let carY3 = tileY*8;
let carX4 = tileX*8;
let carY4 = tileY*8;
let carX5 = tileX*3;
let carY5 = tileY*7;
let carX6 = tileX*9;
let carY6 = tileY*7;
let carX7 = tileX;
let carY7 = tileY*6;
let carX8 = tileX*8;
let carY8 = tileY*6;

const rockWidth = tileX*3;
const rockHeight = tileY*.9;
//row
let rockX1 = tileX*8;
//col
let rockY1 = tileY*4;
let rockX2 = tileX;
let rockY2 = tileY*4;
let rockX3 = tileX*0;
let rockY3 = tileY*3;
let rockX4 = tileX*5;
let rockY4 = tileY*3;
let rockX5 = tileX*9;
let rockY5 = tileY*2;
let rockX6 = tileX*3;
let rockY6 = tileY*2;
let rockX7 = tileX*7;
let rockY7 = tileY;
let rockX8 = tileX*2;
let rockY8 = tileY;

const padWidth = tileX;
const padHeight = tileY*.95;
const padX1 = tileX/2;
const padY1 = 0;
const padX2 = (tileX*2) + (tileX/2);
const padY2 = 0;
const padX3 = (tileX*4) + (tileX/2);
const padY3 = 0;
const padX4 = (tileX*6) + (tileX/2);;
const padY4 = 0;
const padX5 = (tileX*8) + (tileX/2);;
const padY5 = 0;
const padX6 = (tileX*10) + (tileX/2);;
const padY6 = 0;

let pad1 = false;
let pad2 = false;
let pad3 = false;
let pad4 = false;
let pad5 = false;
let pad6 = false;

function gridChecker(num) {
  // Makes Auto Sizing Of Canvas Divisible By Grid Size
  let cur = num;
  for(i=0; i<cur; i++) {
    if(cur % gridSize !== 0) {
      cur --;
    }
    if(cur % gridSize == 0) {
      return cur;
    }
  }
}

class Character {
  constructor(x, y, src) {
    this.w = tileX*.9;
    this.h = tileY*.9;
    this.centerX = '';
    this.centerY = '';
    this.leftSide = '';
    this.topSide = '';
    this.rightSide = '';
    this.bottomSide = '';
    this.x = x;
    this.y = y;
    this.lives = 5;
    this.img = new Image();
    this.img.src = src;
  }
}
const dog = new Character(startX, startY, '../img/dogger.png');

function dogDimensions() {
  dog.centerX = (dog.x + (dog.w/2));
  dog.centerY = (dog.y + (dog.h/2));

  dog.leftSide = {
    start: [dog.x, dog.y],
    end: [(dog.x + dog.w), (dog.y + dog.h)]
  }
  dog.topSide = {
    start: [dog.x, dog.y],
    end: [(dog.x + dog.w), dog.y]
  }
  dog.rightSide = {
    start: [(dog.x + dog.w), dog.y],
    end: [(dog.x + dog.w), (dog.y + dog.h)]
  }
  dog.bottomSide = {
    start: [dog.x, (dog.y + dog.h)],
    end: [(dog.x + dog.w), (dog.y + dog.h)]
  }
}

function mainScreen() {
  ctx.fillStyle = '#fff';
  ctx.font = `${tileY}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Welcome To Dogger", tileX*6, tileY*5);
  ctx.fillStyle = '#fff';
  ctx.font = `${(tileY*.5)}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Please Help This Good Boy Get Home", tileX*6, tileY*6);
  ctx.fillStyle = '#fff';
  ctx.font = `${(tileY*.9)}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("PLAY", tileX*6, tileY*7);
}

function letsPlay(e) {
  if(mainScreenActive && (e.pageX - canvasSize.left) > tileX*4 && (e.pageX - canvasSize.left) < tileX*9 && (e.pageY - canvasSize.top) > (tileY*6) + (tileY/2) && (e.pageY - canvasSize.top) < (tileY*7) + (tileY/2)) {
    return newGame();
  }
  if(!play && (e.pageX - canvasSize.left) > tileX*4 && (e.pageX - canvasSize.left) < tileX*9 && (e.pageY - canvasSize.top) > (tileY*5) + (tileY/2) && (e.pageY - canvasSize.top) < (tileY*6) + (tileY/2)) {
    return newGame();
  }
  if(e.type == 'touchstart') {
    if(play && !mainScreenActive) {
      let mobileCoords = [(e.targetTouches[0].pageX - canvasSize.left), (e.targetTouches[0].pageY - canvasSize.top)];
    if(mobileCoords[1] < dog.y && dog.y >= dog.h) {
      // Move Up
      dog.y -= tileY;
    }
    if(mobileCoords[1] > (dog.y + dog.h) && dog.y < mapH - dog.h) {
      // Move Down
      dog.y += tileY;
    }
    if(mobileCoords[0] < dog.x && mobileCoords[1] < (dog.y + tileY) && dog.x >= dog.w) {
      // Move Left
      dog.x -= tileX;
    }
    if(mobileCoords[0] > (dog.x + dog.w) && dog.x < mapW - dog.w) {
      // Move Right
      dog.x += tileX;
    }
    
    dogDimensions();
    }
  }
}

function drawBackground() {
    // Grass Beginning Area
    ctx.fillStyle = "lime";
    ctx.fillRect(0, tileY*10, mapW, tileY);
    // Lower Lane Divider
    ctx.beginPath();
    ctx.moveTo(0,tileY*7);
    ctx.lineTo (mapW,tileY*7);
    ctx.strokeStyle = "white";
    ctx.setLineDash([5]);
    ctx.strokeWidth = 2;
    ctx.stroke();
    // Middle Divider
    ctx.beginPath();
    ctx.moveTo(0,tileY*8);
    ctx.lineTo (mapW, tileY*8);
    ctx.strokeStyle = "white";
    ctx.setLineDash([0]);
    ctx.strokeWidth = 4;
    ctx.stroke();
    // Upper Lane Divider
    ctx.beginPath();
    ctx.moveTo(0,tileY*9);
    ctx.lineTo (mapW, tileY*9);
    ctx.strokeStyle = "white";
    ctx.setLineDash([5]);
    ctx.strokeWidth = 2;
    ctx.stroke();
    // Dirt Safe Area
    ctx.fillStyle = "brown";
    ctx.fillRect(0, tileY*5, mapW, tileY);
    // Lava Area
    ctx.fillStyle= "orange";
    ctx.fillRect(0, 0, mapW, tileY*5);
  }

function drawDog() {
  ctx.drawImage(dog.img, dog.x, dog.y, dog.w, dog.h);
}

function backToStart() {
  dog.x = startX;
  dog.y = startY;
}

const keyHandler = {
  left: {
    hit: false,
    ready: true
  },
  up: {
    hit: false,
    ready: true
  },right: {
    hit: false,
    ready: true
  },
  down: {
    hit: false,
    ready: true
  }
}

function keyDownHandler(e)
{
    if(e.keyCode == 37) {keyHandler.left.hit = true;}
    if(e.keyCode == 38) {keyHandler.up.hit = true;}
    if(e.keyCode == 39) {keyHandler.right.hit = true;}
    if(e.keyCode == 40) {keyHandler.down.hit = true;}
}
function keyUpHandler(e)
{
    if(e.keyCode == 37) {keyHandler.left.hit = false;}
    if(e.keyCode == 38) {keyHandler.up.hit = false;}
    if(e.keyCode == 39) {keyHandler.right.hit = false;}
    if(e.keyCode == 40) {keyHandler.down.hit = false;}
}

function movementHandler() {
  if(keyHandler.left.hit==true && keyHandler.left.ready==true && dog.x >= dog.w) {
    dog.x -= tileX;
    keyHandler.left.ready = false;
  }
  if(keyHandler.left.hit==false) {
    keyHandler.left.ready = true;
  }
  if(keyHandler.up.hit==true && keyHandler.up.ready==true && dog.y >= dog.h) {
    dog.y -= tileY;
    keyHandler.up.ready = false;
  }
  if(keyHandler.up.hit==false) {
    keyHandler.up.ready = true;
  }
  if(keyHandler.right.hit==true && keyHandler.right.ready==true && dog.x < mapW - dog.w) {
    dog.x += tileX;
    keyHandler.right.ready = false;
  }
  if(keyHandler.right.hit==false) {
    keyHandler.right.ready = true;
  }
  if(keyHandler.down.hit==true && keyHandler.down.ready==true && dog.y < mapH - dog.h) {
    dog.y += tileY;
    keyHandler.down.ready = false;
  }
  if(keyHandler.down.hit==false) {
    keyHandler.down.ready = true;
  }
  dogDimensions();
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
  if (carX1 < canvas.width + carWidth) {
      carX1 = carX1 + speed.verySlow;
  }
  else {
      carX1 = -carWidth;
  }

  if (carX2 < canvas.width + carWidth) {
      carX2 = carX2 + speed.verySlow;
  }
  else {
      carX2 = -carWidth;
  }

  if (carX3 < canvas.width + carWidth) {
      carX3 = carX3 + speed.slow;
  }
  else {
      carX3 = -carWidth;
  }

  if (carX4 < canvas.width + carWidth) {
      carX4 = carX4 + speed.slow;
  }
  else {
      carX4 = -carWidth;
  }

  if (carX5 > - carWidth) {
      carX5 = carX5 - speed.medium;
  }
  else {
      carX5 = canvas.width + carWidth;
  }

  if (carX6 > - carWidth) {
      carX6 = carX6 - speed.medium;
  }
  else {
      carX6 = canvas.width + carWidth;
  }

  if (carX7 >- carWidth) {
      carX7 = carX7 - speed.veryFast;
  }
  else {
      carX7 = canvas.width + carWidth;
  }

  if (carX8 > - carWidth) {
      carX8 = carX8 - speed.veryFast;
  }
  else {
      carX8 = canvas.width + carWidth;
  }
}

function runOver() {

  var carsX = [carX1, carX2, carX3, carX4, carX5, carX6, carX7, carX8];
  var carsY = [carY1, carY2, carY3, carY4, carY5, carY6, carY7, carY8];

  for (i = 0; i < carsX.length; i++){
    if (carsX[i] <= dog.x + dog.w &&
    carsX[i] + carWidth >= dog.x &&
    carsY[i] + carHeight >= dog.y &&
    carsY[i] <= dog.y + dog.h) {
      backToStart();
      dog.lives --;
    }
  }
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
if (rockX1 < canvas.width + rockWidth) {
  rockX1 = rockX1 + speed.verySlow;
  }
  else {
    rockX1 = -rockWidth;
  }
if (rockX2 < canvas.width + rockWidth) {
  rockX2 = rockX2 + speed.verySlow;
  }
  else {
    rockX2 = -rockWidth;
  }
if (rockX3 > 0-rockWidth) {
  rockX3 = rockX3 - speed.verySlow;
  }
  else {
    rockX3 = canvas.width + rockWidth;
  }
if (rockX4 > 0-rockWidth) {
  rockX4 = rockX4 - speed.verySlow;
  }
  else {
    rockX4 = canvas.width + rockWidth;
  }
if (rockX5 < canvas.width + rockWidth) {
  rockX5 = rockX5 + speed.slow;
  }
  else {
    rockX5 = -rockWidth;
  }
if (rockX6 < canvas.width + rockWidth) {
  rockX6 = rockX6 + speed.slow;
  }
  else {
    rockX6 = -rockWidth;
  }
if (rockX7 > 0-rockWidth) {
  rockX7 = rockX7 - speed.medium;
  }
  else {
    rockX7 = canvas.width + rockWidth;
  }
if (rockX8 > 0-rockWidth) {
  rockX8 = rockX8 - speed.medium;
  }
  else {
    rockX8 = canvas.width + rockWidth;
  }
}

function float() {
  if (rockX1 <= dog.x + dog.w &&
    rockX1 + rockWidth >= dog.x &&
    rockY1 + rockHeight >= dog.y &&
    rockY1 <= dog.y + dog.h) {
    if(dog.x < canvas.width - dog.w){
      dog.x = dog.x + speed.verySlow;
    }
  }
  else if (rockX2 <= dog.x + dog.w &&
    rockX2 + rockWidth >= dog.x &&
    rockY2 + rockHeight >= dog.y &&
    rockY2 <= dog.y + dog.h) {
    if(dog.x < canvas.width - dog.w){
      dog.x = dog.x + speed.verySlow;
    }
  }
  else if (rockX3 <= dog.x + dog.w &&
    rockX3 + rockWidth >= dog.x &&
    rockY3 + rockHeight >= dog.y &&
    rockY3 <= dog.y + dog.h) {
    if(dog.x > 0){
      dog.x = dog.x - speed.verySlow;
    }
  }
  else if (rockX4 <= dog.x + dog.w &&
      rockX4 + rockWidth >= dog.x &&
      rockY4 + rockHeight >= dog.y &&
      rockY4 <= dog.y + dog.h) {
    if(dog.x > 0){
      dog.x = dog.x - speed.verySlow;
    }
  }
  else if (rockX5 <= dog.x + dog.w &&
      rockX5 + rockWidth >= dog.x &&
      rockY5 + rockHeight >= dog.y &&
      rockY5 <= dog.y + dog.h) {
    if(dog.x < canvas.width - dog.w){
      dog.x = dog.x + speed.slow;
    }
  }
  else if (rockX6 <= dog.x + dog.w &&
      rockX6 + rockWidth >= dog.x &&
      rockY6 + rockHeight >= dog.y &&
      rockY6 <= dog.y + dog.h) {
    if(dog.x < canvas.width - dog.w){
      dog.x = dog.x + speed.slow;
    }
  }
  else if (rockX7 <= dog.x + dog.w &&
      rockX7 + rockWidth >= dog.x &&
      rockY7 + rockHeight >= dog.y &&
      rockY7 <= dog.y + dog.h) {
    if(dog.x > 0){
      dog.x = dog.x - speed.medium;
    }
  }
  else if (rockX8 <= dog.x + dog.w &&
      rockX8 + rockWidth >= dog.x &&
      rockY8 + rockHeight >= dog.y &&
      rockY8 <= dog.y + dog.h) {
    if(dog.x > 0){
      dog.x = dog.x - speed.medium;
    }
  }

  else if (dog.y < tileY*5 && dog.y > tileY){
    dog.lives --;
    backToStart();
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
  if (padX1 <= dog.x + dog.w &&
    padX1 +padWidth >= dog.x &&
    padY1 + padHeight >= dog.y &&
    padY1 <= dog.y + dog.h) {
    pad1 = true;
    dog.lives++;
    backToStart();
  }

  else if (padX2 <= dog.x + dog.w &&
    padX2 + padWidth >= dog.x &&
    padY2 + padHeight >= dog.y &&
    padY2 <= dog.y + dog.h) {
    pad2 = true;
    dog.lives++;
    backToStart();
  }
  else if (padX3 <= dog.x + dog.w &&
    padX3 + padWidth >= dog.x &&
    padY3 + padHeight >= dog.y &&
    padY3 <= dog.y + dog.h) {
    pad3 = true;
    dog.lives++;
    backToStart();
  }
  else if (padX4 <= dog.x + dog.w &&
    padX4 + padWidth >= dog.x &&
    padY4 + padHeight >= dog.y &&
    padY4 <= dog.y + dog.h) {
    pad4 = true;
    dog.lives++;
    backToStart();
  }
  else if (padX5 <= dog.x + dog.w &&
    padX5 + padWidth >= dog.x &&
    padY5 + padHeight >= dog.y &&
    padY5 <= dog.y + dog.h) {
    pad5 = true;
    dog.lives++;
    backToStart();
  }
  else if (padX6 <= dog.x + dog.w &&
    padX6 + padWidth >= dog.x &&
    padY6 + padHeight >= dog.y &&
    padY6 <= dog.y + dog.h) {
    pad6 = true;
    dog.lives++;
    backToStart();
  }

  else if (dog.y < tileY) {
    backToStart();
    dog.lives--;
  }
  const pads = [pad1, pad2, pad3, pad4, pad5, pad6]
  let padsX = [padX1, padX2, padX3, padX4, padX5, padX6]
  let padsY = [padY1, padY2, padY3, padY4, padY5, padY6]

  for(i = 0; i < pads.length; i++) {
    if (pads[i] === true) {
      ctx.drawImage (dog.img, padsX[i], padsY[i], dog.w, dog.h);
    }
  }
}

function drawLives() {
  if (dog.lives != 0){
    ctx.fillStyle = "white";
    ctx.font = `${tileY/2}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("LIVES: " + (dog.lives), mapW/2, ((tileY*11)+ (tileY/2)));
  }
}

function victory() {
  if (pad1 && pad2 && pad3 && pad4 && pad5 && pad6){
    ctx.fillStyle = "white";
    ctx.font = `${tileY}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("You won!", tileX*6, tileY*5);
    ctx.font = `${tileY/2}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("New Game", tileX*6, tileX*6)
    victoryCondition = true;
    play = false;

    canvas.addEventListener('click', letsPlay);
    canvas.ontouchstart = letsPlay;
  }
}

function gamesOver() {
  if (dog.lives == 0) {
      play = false;
    ctx.fillStyle = "white";
    ctx.font = `${tileY}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GAME OVER", tileX*6, tileY*5);
    ctx.font = `${tileY/2}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Try Again", tileX*6, tileX*6)
  }
}

function newGame() {
  mainScreenActive = false;
  play = true;
  victoryCondition = false;
  dog.lives = 5;
}

function draw() {
  if(ctx==null) { return alert('Something Went Wrong! Please Refresh The Page.'); }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(mainScreenActive) {
    mainScreen();
  } else {
    if(victoryCondition === false) {
      gamesOver();
      drawLives();
    } else {
      victory();
    }
    if(play) {
      drawBackground(); 
      drawRocks();
      moveRocks();
      drawPads();
      onPad();
      drawDog();
      movementHandler();
      drawCars();
      moveCars();
      runOver();
      float();
      victory();
    }
  }

  requestAnimationFrame(draw);
}

draw();