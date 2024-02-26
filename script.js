let row = 5;
let col = 5;
let grid = [];

document.getElementById("grid").style.gridTemplateColumns = "repeat(" + col + ", 1fr)"
document.getElementById("grid").style.gridTemplateRows = "repeat(" + row + ", 1fr)"

let percorsoImmagini = {
    'images/bottle.png': 5,
    'images/cardboard.png': 2,
    'images/plastic.png': 3,
    'images/waste.png': 1
};

let imageKeys = Object.keys(percorsoImmagini);

function generaImmagine() {
    return imageKeys[Math.floor(Math.random() * imageKeys.length)];
}

for (let i = 0; i < row; i++) {
    grid[i] = [];
    for (let j = 0; j < col; j++) {
        let imagePath = generaImmagine();
        let s = "<div class='box' data-row='" + i + "' data-col='" + j + "' value='" + percorsoImmagini[imagePath] + "'><img src='" + imagePath + "' alt='Image'></div>";
        document.getElementById("grid").innerHTML += s;
        grid[i][j] = s;
    }
}
let boxes = document.getElementsByClassName('box');
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', function () {
        let row = this.getAttribute('data-row');
        let col = this.getAttribute('data-col');
        let value = this.getAttribute('value');
        console.log('Hai fatto clic sulla casella:', row, col, 'con valore:', value);
    });
}
