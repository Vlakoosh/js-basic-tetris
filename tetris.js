// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

const FIELD_WIDTH = 12;
const FIELD_HEIGHT = 18;

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
printField();

let tetrominos = ["","","","","","",""];

tetrominos[0] += "..X.";
tetrominos[0] += "..X.";
tetrominos[0] += "..X.";
tetrominos[0] += "..X.";

tetrominos[1] += "..X.";
tetrominos[1] += ".XX.";
tetrominos[1] += ".X..";
tetrominos[1] += "....";

tetrominos[2] += ".X..";
tetrominos[2] += ".XX.";
tetrominos[2] += "..X.";
tetrominos[2] += "....";

tetrominos[3] += "....";
tetrominos[3] += ".XX.";
tetrominos[3] += ".XX.";
tetrominos[3] += "....";

tetrominos[4] += "..X.";
tetrominos[4] += ".XX.";
tetrominos[4] += "..X.";
tetrominos[4] += "....";

tetrominos[5] += "....";
tetrominos[5] += ".XX.";
tetrominos[5] += "..X.";
tetrominos[5] += "..X.";

tetrominos[6] += "....";
tetrominos[6] += ".XX.";
tetrominos[6] += ".X..";
tetrominos[6] += ".X..";

function rotate(px, py, rotation) {
    switch (rotation % 4){
        case 0: return py * 4 + px;         //0 degrees
        case 1: return 12 + py - (px * 4);  //90 degrees
        case 2: return 15 - (py * 4) - px;  //180 degrees
        case 3: return 3 - py + (px * 4);   //270 degrees
    }
    return 0;
}