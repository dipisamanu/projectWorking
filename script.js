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

function generaImmagine(i, j) {
    let imagePath;
    do {
        imagePath = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    } while ((grid[i - 1] && grid[i - 1][j] === imagePath && grid[i - 2] && grid[i - 2][j] === imagePath) || (grid[i][j - 1] === imagePath && grid[i][j - 2] === imagePath));
    return imagePath;
}

for (let i = 0; i < row; i++) {
    grid[i] = [];
    for (let j = 0; j < col; j++) {
        let imagePath = generaImmagine(i, j);
        let s = "<div class='box' data-row='" + i + "' data-col='" + j + "' value='" + percorsoImmagini[imagePath] + "'><img src='" + imagePath + "' alt='Image'></div>";
        document.getElementById("grid").innerHTML += s;
        grid[i][j] = imagePath;
    }
}
let boxes = document.getElementsByClassName('box');
let selBox = null;

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', function () {
        let row = parseInt(this.getAttribute('data-row'));
        let col = parseInt(this.getAttribute('data-col'));
        let value = this.getAttribute('value');
        console.log('Hai fatto clic sulla casella:', row, col, 'con valore:', value);

        if (selBox != null) {
            let selRow = parseInt(selBox.getAttribute('data-row'));
            let selCol = parseInt(selBox.getAttribute('data-col'));
            if ((Math.abs(selRow - row) === 1 && selCol === col) || (Math.abs(selCol - col) === 1 && selRow === row)) {
                let temp = grid[selRow][selCol];
                grid[selRow][selCol] = grid[row][col];
                grid[row][col] = temp;
                selBox.getElementsByTagName('img')[0].src = grid[selRow][selCol];
                this.getElementsByTagName('img')[0].src = grid[row][col];
            }
            selBox.classList.remove('selected');
            selBox = null;
        } else {
            this.classList.add('selected');
            selBox = this;
        }
    });
}
