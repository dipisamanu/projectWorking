let cells = ["bottle", "cardboard", "plastic", "waste"];
let board = [];
let rows = 5;
let columns = 5;
let score = 0;
let selCell;
let otherCell;

window.onload = function () {
    startGame();
    window.setInterval(function () {
        distruggi();
        caduta();
        genera();
    }, 300);
}

function randomCella() {
    return cells[Math.floor(Math.random() * cells.length)];
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cell = document.createElement("img");
            cell.id = r.toString() + "-" + c.toString();
            cell.src = "images/" + randomCella() + ".png";
            cell.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process
            cell.addEventListener("dragover", dragOver);  //clicking on candy, moving mouse to drag the candy
            cell.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
            cell.addEventListener("dragleave", dragLeave); //leave candy over another candy
            cell.addEventListener("drop", dragDrop); //dropping a candy over another candy
            cell.addEventListener("dragend", dragEnd); //after drag process completed, we swap cells
            document.getElementById("board").append(cell);
            row.push(cell);
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart() {
    //this refers to cell that was clicked on for dragging
    selCell = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() { }

function dragDrop() {
    //this refers to the target cell that was dropped on
    otherTile = this;
}

function dragEnd() {
    if (selCell.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }
    let selCoords = selCell.id.split("-"); // id="0-0" -> ["0", "0"]
    let r = parseInt(selCoords[0]);
    let c = parseInt(selCoords[1]);
    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);
    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;
    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;
    let isAdiacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdiacent) {
        let selImg = selCell.src;
        let otherImg = otherTile.src;
        selCell.src = otherImg;
        otherTile.src = selImg;
        let validMove = checkValid();
        if (!validMove) {
            let selImg = selCell.src;
            let otherImg = otherTile.src;
            selCell.src = otherImg;
            otherTile.src = selImg;
        }
    }
}

function distruggi() {
    crushFive();
    crushFour();
    crushThree();
    document.getElementById("score").innerText = score;

}

function crushFive() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 4; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            let candy4 = board[r][c + 3];
            let candy5 = board[r][c + 4];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank")) {
                candy1.src = "images/blank.png";
                candy2.src = "images/blank.png";
                candy3.src = "images/blank.png";
                candy4.src = "images/blank.png";
                candy5.src = "images/blank.png";
                score += 50;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 4; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            let candy4 = board[r + 3][c];
            let candy5 = board[r + 4][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank")) {
                candy1.src = "images/blank.png";
                candy2.src = "images/blank.png";
                candy3.src = "images/blank.png";
                candy4.src = "images/blank.png";
                candy5.src = "images/blank.png";
                score += 50;
            }
        }
    }
}

function crushFour() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            let candy4 = board[r][c + 3];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "images/blank.png";
                candy2.src = "images/blank.png";
                candy3.src = "images/blank.png";
                candy4.src = "images/blank.png";
                score += 40;
            }
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            let candy4 = board[r + 3][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "images/blank.png";
                candy2.src = "images/blank.png";
                candy3.src = "images/blank.png";
                candy4.src = "images/blank.png";
                score += 40;
            }
        }
    }
}

function crushThree() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "images/blank.png";
                candy2.src = "images/blank.png";
                candy3.src = "images/blank.png";
                score += 30;
            }
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "images/blank.png";
                candy2.src = "images/blank.png";
                candy3.src = "images/blank.png";
                score += 30;
            }
        }
    }
}


function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function caduta() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "images/blank.png";
        }
    }
}

function genera() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "images/" + randomCella() + ".png";
        }
    }
}