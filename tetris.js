//tetris
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const FIELD_WIDTH = 12;
const FIELD_HEIGHT = 18;

const SCALE = 10;

canvas.width = FIELD_WIDTH*SCALE;
canvas.height = FIELD_HEIGHT*SCALE;
canvas.style.backgroundColor = "black";

let field = new Array(FIELD_WIDTH * FIELD_HEIGHT);

(function initializeField(){
    for (let i = 0; i < field.length; i++) {
        let fy = Math.floor(i / FIELD_WIDTH);
        let fx = i % FIELD_WIDTH;
        if(fy === FIELD_HEIGHT - 1 || fx === 0 || fx === FIELD_WIDTH-1){
            field[i] = "#"
        }
        else field[i] = " ";
    }
})();
console.log(field);

function printField() {
    for (let y = 0; y < FIELD_HEIGHT; y++){
        for (let i = 0; i < FIELD_WIDTH; i++) {
            process.stdout.write(field[y*FIELD_WIDTH + i]);
        }
        console.log();

    }
}

let tetrominos = ["","","","","","",""];
(function initializeTetrominos(){
    tetrominos[0] += "..T.";
    tetrominos[0] += "..T.";
    tetrominos[0] += "..T.";
    tetrominos[0] += "..T.";

    tetrominos[1] += "..R.";
    tetrominos[1] += ".RR.";
    tetrominos[1] += ".R..";
    tetrominos[1] += "....";

    tetrominos[2] += ".G..";
    tetrominos[2] += ".GG.";
    tetrominos[2] += "..G.";
    tetrominos[2] += "....";

    tetrominos[3] += "....";
    tetrominos[3] += ".YY.";
    tetrominos[3] += ".YY.";
    tetrominos[3] += "....";

    tetrominos[4] += "..P.";
    tetrominos[4] += ".PP.";
    tetrominos[4] += "..P.";
    tetrominos[4] += "....";

    tetrominos[5] += "....";
    tetrominos[5] += ".OO.";
    tetrominos[5] += "..O.";
    tetrominos[5] += "..O.";

    tetrominos[6] += "....";
    tetrominos[6] += ".BB.";
    tetrominos[6] += ".B..";
    tetrominos[6] += ".B..";
})();


function rotate(px, py, rotation) {
    switch (rotation % 4){
        case 0: return py * 4 + px;         //0 degrees
        case 1: return 12 + py - (px * 4);  //90 degrees
        case 2: return 15 - (py * 4) - px;  //180 degrees
        case 3: return 3 - py + (px * 4);   //270 degrees
    }
    return 0;
}

let rotation = 13;
let currentTile = tetrominos[6];
let currentX = 4;
let currentY = -4;

function gameLoop() {
    setInterval(update, 1000);
}

//move piece down by 1. If it touches something below it, make a new piece.
function update(){
    putTile(0,1, 0);
    updateDisplay();
}

function clearPiece(){
    for (let i = 15; i >= 0; i--) {
        let tx = i % 4;
        let ty = Math.floor(i/4);
        let tpi = rotate(tx,ty, rotation);
        let tp = currentTile[tpi];
        let fi = currentX + tx + currentY*FIELD_WIDTH + ty * FIELD_WIDTH
        if (fi > 0) {
            if (field[fi] === tp){
                field[fi] = " ";
            }
        }
    }
}

function putPiece(){
    for (let i = 15; i >= 0; i--) {
        let tx = i % 4;
        let ty = Math.floor(i/4);
        let tpi = rotate(tx,ty, rotation);
        let tp = currentTile[tpi];
        let fi = currentX + tx + currentY*FIELD_WIDTH + ty * FIELD_WIDTH

        if (fi > 0) {
            if (tp != "."){
                field[fi] = tp;
            }
        }
    }
}

function putTile(x, y, r){
    clearPiece()
    currentY += y;
    currentX += x;
    rotation += r;

    for (let i = 15; i >= 0; i--) {
        let tx = i % 4;
        let ty = Math.floor(i/4);
        let fi = currentX + tx + currentY*FIELD_WIDTH + ty * FIELD_WIDTH
        let tpi = rotate(tx,ty, rotation);
        let tp = currentTile[tpi];
        if (fi > 0) {
            if (field[fi] != " " && tp != ".") {
                currentY -= y;
                currentX -= x;
                rotation -= r;
                putPiece();
                if (y > 0){
                    newPiece();
                    checkTetris();
                }
                return;
            }
        }
    }

    currentY -= y;
    currentX -= x;
    rotation -= r;

    clearPiece()
    currentY += y;
    currentX += x;
    rotation += r;
    if (rotation < 0 ) rotation = 3;

    putPiece();
}

function checkTetris() {
    for (let row = 0; row < FIELD_HEIGHT - 1; row++){
        let tetris = true;
        for (let column = 0; column < FIELD_WIDTH; column++){
            if (field[row*FIELD_WIDTH + column] === " "){
                tetris = false;
                break;
            }
        }
        if (tetris){
            console.log("tetris");
            deleteRow(row);
            movePiecesDown(row);
        }
    }
}

function deleteRow(row){
    for (let column = 1; column < FIELD_WIDTH - 1; column++) {
        field[row * FIELD_WIDTH + column] = " ";
        console.log("deleted pieces");
    }
}

function movePiecesDown(row){
    for (let y = row; y > 0; y--){
        for (let x = 1; x < FIELD_WIDTH - 1; x++){
            let index = y * FIELD_WIDTH + x;
            let nextIndex = index - FIELD_WIDTH;
            field[index] = field[nextIndex];
        }
    }
}

//print everything to the screen/canvas
function updateDisplay() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,FIELD_WIDTH * SCALE, FIELD_HEIGHT * SCALE);
    for (let i = 0; i < field.length; i++) {
        let fx = i % FIELD_WIDTH;
        let fy = Math.floor(i / FIELD_WIDTH);
        switch (field[i]) {
            case "#":
                drawBlock(fx, fy, "white");
                break;
            case "R":
                drawBlock(fx, fy, "red");
                break;
            case "G":
                drawBlock(fx, fy, "green");
                break;
            case "B":
                drawBlock(fx, fy, "blue");
                break;
            case "O":
                drawBlock(fx, fy, "orange");
                break;
            case "P":
                drawBlock(fx, fy, "purple");
                break;
            case "T":
                drawBlock(fx, fy, "turquoise");
                break;
            case "Y":
                drawBlock(fx, fy, "yellow");
                break;
        }
    }
}

function drawBlock(x,y,color){
    ctx.fillStyle = "black";
    ctx.fillRect(x * SCALE , y * SCALE, SCALE, SCALE);
    ctx.fillStyle = color;
    ctx.fillRect(x * SCALE+1 , y * SCALE+1, SCALE -2, SCALE-2);
    ctx.fillStyle = "black";
    ctx.fillRect(x * SCALE + 2 , y * SCALE + 2, SCALE - 4, SCALE - 4);
}

function newPiece(){
    currentTile = tetrominos[Math.floor(Math.random()*tetrominos.length)];
    currentY = -4;
    currentX = 4;
}

function checkGameEnd(){

}


document.onkeydown = (e) =>{
    switch (e.key){
        case "ArrowLeft":
            movePiece(-1);
            updateDisplay();
            break;
        case "ArrowRight":
            movePiece(1);
            updateDisplay();
            break;
        case "ArrowDown":
            movePiece(0, 1);
            updateDisplay();
            break;
        case "a":
            rotatePiece(-1);
            updateDisplay();
            break;
        case "d":
            rotatePiece(1);
            updateDisplay();
            break;
    }
}

function movePiece(x, y=0){
    putTile(x,y, 0);
}

function rotatePiece(rotation){
    putTile(0,0,rotation);
}


updateDisplay();

gameLoop()