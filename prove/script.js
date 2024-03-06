let oggetti = ["waste", "cardboard", "bottle", "plastic"];
let rows = 5;
let columns = 5;
let grid = [];
document.getElementById("grid").style.gridTemplateColumns = "repeat(" + columns + ", 1fr)";
document.getElementById("grid").style.gridTemplateRows = "repeat(" + rows + ", 1fr)";

window.onload = function() {
    startGame();

    //1/10th of a second
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
}

function random() {
    let randomImage = oggetti[Math.floor(Math.random() * 4)];
    return "images/" + randomImage + ".png";
}

function genera() {
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < columns; j++) {
            grid[i][j] = random();
        }
    }
    return grid;
}

function visualizzaGriglia() {
    let grid = genera();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let imagePath = grid[i][j];
            let s = "<div class='box' data-row='" + i + "' data-col='" + j + "'><img src='" + imagePath + "' alt='Image'></div>";
            document.getElementById("grid").innerHTML += s;
        }
    }
}

visualizzaGriglia();

function crushCandy() {
    //crushFive();
    //crushFour();
    crushThree();

}

function crushThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = grid[r][c];
            let candy2 = grid[r][c+1];
            let candy3 = grid[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "blank.png";
                candy2.src = "blank.png";
                candy3.src = "blank.png";
                score += 30;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = grid[r][c];
            let candy2 = grid[r+1][c];
            let candy3 = grid[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "blank.png";
                candy2.src = "blank.png";
                candy3.src = "blank.png";
                score += 30;
            }
        }
    }
}
