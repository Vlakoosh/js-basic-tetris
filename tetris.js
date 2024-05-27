const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const FIELD_WIDTH = 12;
const FIELD_HEIGHT = 18;

canvas.width = FIELD_WIDTH;
canvas.height = FIELD_HEIGHT;

let field = new Array(FIELD_WIDTH * FIELD_HEIGHT);


(function initializeField(){
    for (let i = 0; i < field.length; i++) {
        let fy = Math.floor(i/FIELD_WIDTH);
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

function rotate(px, py, rotation) {
    switch (rotation % 4){
        case 0: return py * 4 + px;         //0 degrees
        case 1: return 12 + py - (px * 4);  //90 degrees
        case 2: return 15 - (py * 4) - px;  //180 degrees
        case 3: return 3 - py + (px * 4);   //270 degrees
    }
    return 0;
}

function gameLoop() {
    setInterval(update(), 500);
}

//move piece down by 1. If it touches something below it, make a new piece.
function update(){

}

//print everything to the screen/canvas
function updateDisplay() {

}
function newPiece(){

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
        case "A":
            rotatePiece(-1);
            updateDisplay();
        case "D":
            rotatePiece(1);
            updateDisplay();
    }
}

function movePiece(x, y=0){

}

function rotatePiece(rotation){

}