let row = 5;
let col = 5;
let grid = [];
let gridElement = document.getElementById("grid");
gridElement.style.gridTemplateColumns = "repeat(" + col + ", 1fr)";
gridElement.style.gridTemplateRows = "repeat(" + row + ", 1fr)";
let percorsoImmagini = ['images/bottle.png', 'images/cardboard.png', 'images/plastic.png', 'images/waste.png', 'images/blank.png'];

function generaImmagine(i, j) {
    let imagePath;
    do {
        imagePath = percorsoImmagini[Math.floor(Math.random() * (percorsoImmagini.length-1))];
    } while (
        (grid[i - 1] && grid[i - 1][j] === imagePath && grid[i - 2] && grid[i - 2][j] === imagePath) || (grid[i] && grid[i][j - 1] === imagePath && grid[i][j - 2] === imagePath)
    );
    return imagePath;
}

function creaGriglia() {
    for (let i = 0; i < row; i++) {
        grid[i] = [];
        for (let j = 0; j < col; j++) {
            let imagePath = generaImmagine(i, j);
            let s = "<div class='box' data-row='" + i + "' data-col='" + j + "' value='" + imagePath + "'><img src='" + imagePath + "' alt='Image'></div>";
            gridElement.innerHTML += s;
            grid[i][j] = imagePath;
        }
    }
}

function checkForAlignments() {
    let removed = false;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col - 2; j++) {
            if (grid[i][j] === grid[i][j + 1] && grid[i][j] === grid[i][j + 2]) {
                rimuoviCelle(i, j, 'orizzontale');
                removed = true;
            }
        }
    }
    for (let j = 0; j < col; j++) {
        for (let i = 0; i < row - 2; i++) {
            if (grid[i][j] === grid[i + 1][j] && grid[i][j] === grid[i + 2][j]) {
                rimuoviCelle(i, j, 'verticale');
                removed = true;
            }
        }
    }
    return removed;
}

function rimuoviCelle(i, j, direzione) {
    let celleDaRimuovere = direzione === 'orizzontale' ? [[i, j], [i, j + 1], [i, j + 2]] : [[i, j], [i + 1, j], [i + 2, j]];
    celleDaRimuovere.forEach(([row, col]) => {
        let box = document.querySelector('.box[data-row="' + row + '"][data-col="' + col + '"]');
        box.querySelector('img').src = 'images/blank.png';
        box.setAttribute('value', 'images/blank.png');
        grid[row][col] = 'images/blank.png';
    });
}

function dropCells() {
    for (let j = 0; j < col; j++) {
        let emptyRows = [];
        for (let i = row - 1; i >= 0; i--) {
            if (grid[i][j] === 'images/blank.png') {
                emptyRows.push(i);
            } else if (emptyRows.length > 0) {
                let newRow = emptyRows.pop();
                let box = document.querySelector('.box[data-row="' + newRow + '"][data-col="' + j + '"]');
                box.querySelector('img').src = grid[i][j];
                box.setAttribute('value', grid[i][j]);
                grid[newRow][j] = grid[i][j];
                grid[i][j] = 'images/blank.png';
                emptyRows.push(i);
            }
        }
        for (let i = 0; i < emptyRows.length; i++) {
            grid[emptyRows[i]][j] = generaImmagine(emptyRows[i], j);
            let box = document.querySelector('.box[data-row="' + emptyRows[i] + '"][data-col="' + j + '"]');
            box.querySelector('img').src = grid[emptyRows[i]][j];
            box.setAttribute('value', grid[emptyRows[i]][j]);
        }
    }
}

creaGriglia();

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
                selBox.querySelector('img').src = grid[selRow][selCol];
                this.querySelector('img').src = grid[row][col];
                while (checkForAlignments()) {
                    dropCells();
                }
            }
            selBox.classList.remove('selected');
            selBox = null;
        } else {
            this.classList.add('selected');
            selBox = this;
        }
    });
}

function generateCandy() {
    for (let c = 0; c < col; c++) {
        if (grid[0][c] === 'images/blank.png') {
            grid[0][c] = generaImmagine(0, c);
            let box = document.querySelector('.box[data-row="0"][data-col="' + c + '"]');
            box.querySelector('img').src = grid[0][c];
            box.setAttribute('value', grid[0][c]);
        }
    }
}
