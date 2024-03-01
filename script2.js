
let immagini = {
    'images/bottle.png': 5,
    'images/cardboard.png': 2,
    'images/plastic.png': 3,
    'images/waste.png': 1
};
let grid = [];
let row = 9;
let col = 9;
let score = 0;

let currTile;
let otherTile;


window.onload = function() {
    startGame();

    //1/10th of a second
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
}

function randomCandy() {
    return immagini[Math.floor(Math.random() * immagini.length)]; //0 - 5.99
}

function startGame() {
    for (let r = 0; r < row; r++) {
        let row = [];
        for (let c = 0; c < col; c++) {
            // <img id="0-0" src="./images/Red.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process
            tile.addEventListener("dragover", dragOver);  //clicking on candy, moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
            tile.addEventListener("dragleave", dragLeave); //leave candy over another candy
            tile.addEventListener("drop", dragDrop); //dropping a candy over another candy
            tile.addEventListener("dragend", dragEnd); //after drag process completed, we swap immagini

            document.getElementById("grid").append(tile);
            row.push(tile);
        }
        grid.push(row);
    }

    console.log(grid);
}

function dragStart() {
    //this refers to tile that was clicked on for dragging
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //this refers to the target tile that was dropped on
    otherTile = this;
}

function dragEnd() {

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-"); // id="0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;    
        }
    }
}

function crushCandy() {
    //crushFive();
    //crushFour();
    crushThree();
    document.getElementById("score").innerText = score;

}

function crushThree() {
    //check row
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col-2; c++) {
            let candy1 = grid[r][c];
            let candy2 = grid[r][c+1];
            let candy3 = grid[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    //check col
    for (let c = 0; c < col; c++) {
        for (let r = 0; r < row-2; r++) {
            let candy1 = grid[r][c];
            let candy2 = grid[r+1][c];
            let candy3 = grid[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

function checkValid() {
    //check row
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col-2; c++) {
            let candy1 = grid[r][c];
            let candy2 = grid[r][c+1];
            let candy3 = grid[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    //check col
    for (let c = 0; c < col; c++) {
        for (let r = 0; r < row-2; r++) {
            let candy1 = grid[r][c];
            let candy2 = grid[r+1][c];
            let candy3 = grid[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}


function slideCandy() {
    for (let c = 0; c < col; c++) {
        let ind = row - 1;
        for (let r = col-1; r >= 0; r--) {
            if (!grid[r][c].src.includes("blank")) {
                grid[ind][c].src = grid[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            grid[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < col;  c++) {
        if (grid[0][c].src.includes("blank")) {
            grid[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}