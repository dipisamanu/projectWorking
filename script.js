let oggetti = ["waste", "cardboard", "bottle", "plastic"];
let rows = 5;
let columns = 5;
let grid = [];
document.getElementById("grid").style.gridTemplateColumns = "repeat(" + columns + ", 1fr)";
document.getElementById("grid").style.gridTemplateRows = "repeat(" + rows + ", 1fr)";

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
