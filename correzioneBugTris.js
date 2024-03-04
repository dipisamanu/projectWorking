let oggetti = ["waste", "cardboard", "glass", "plastic"];
let rows = 5;
let columns = 5;
let grid = [];

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

console.log(genera());
