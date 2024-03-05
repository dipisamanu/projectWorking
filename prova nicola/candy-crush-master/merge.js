var candies = ["bottle", "cardboard", "plastic", "waste"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var firstTile = null;
var secondTile = null;

window.onload = function() {
    startGame();
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
    var boardElement = document.getElementById("board");

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";
            tile.addEventListener("click", tileClicked);
            boardElement.appendChild(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function tileClicked() {
    if (firstTile === null) {
        firstTile = this;
        this.classList.add("selected");
    } else if (secondTile === null) {
        secondTile = this;
        this.classList.add("selected");
        swapTiles();
        clearSelection();
    }
}

function clearSelection() {
    firstTile = null;
    secondTile = null;
    var selectedTiles = document.querySelectorAll(".selected");
    selectedTiles.forEach(function(tile) {
        tile.classList.remove("selected");
    });
}

function swapTiles() {
    var firstId = firstTile.id.split("-");
    var secondId = secondTile.id.split("-");

    var firstRow = parseInt(firstId[0]);
    var firstCol = parseInt(firstId[1]);
    var secondRow = parseInt(secondId[0]);
    var secondCol = parseInt(secondId[1]);

    var tempSrc = firstTile.src;
    firstTile.src = secondTile.src;
    secondTile.src = tempSrc;

    var tempCandy = board[firstRow][firstCol];
    board[firstRow][firstCol] = board[secondRow][secondCol];
    board[secondRow][secondCol] = tempCandy;

    if (!checkValid()) {
        tempSrc = firstTile.src;
        firstTile.src = secondTile.src;
        secondTile.src = tempSrc;

        tempCandy = board[firstRow][firstCol];
        board[firstRow][firstCol] = board[secondRow][secondCol];
        board[secondRow][secondCol] = tempCandy;
    } else {
        crushCandy();
        slideCandy();
        generateCandy();
    }
}

function crushCandy() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < columns;  c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}

function checkValid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}
