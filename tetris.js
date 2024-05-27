const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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