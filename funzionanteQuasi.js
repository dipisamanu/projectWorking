let row = 5;
let col = 5;
let grid = [];
let gridElement = document.getElementById("grid");
gridElement.style.gridTemplateColumns = "repeat(" + col + ", 1fr)";
gridElement.style.gridTemplateRows = "repeat(" + row + ", 1fr)";

let percorsoImmagini = {
    'images/bottle.png': 5,
    'images/cardboard.png': 2,
    'images/plastic.png': 3,
    'images/waste.png': 1,
    'images/blank.png': 0
};

let imageKeys = Object.keys(percorsoImmagini);

function generaImmagine(i, j) {
    let imagePath;
    do {
        imagePath = imageKeys[Math.floor(Math.random() * (imageKeys.length - 1))]; // escludiamo l'ultimo elemento che è 'images/blank.png'
    } while ((grid[i - 1] && grid[i - 1][j] === imagePath && grid[i - 2] && grid[i - 2][j] === imagePath) || (grid[i][j - 1] === imagePath && grid[i][j - 2] === imagePath));
    return imagePath;
}


function creaGriglia() {
    for (let i = 0; i < row; i++) {
        grid[i] = [];
        for (let j = 0; j < col; j++) {
            let imagePath = generaImmagine(i, j);
            let s = "<div class='box' data-row='" + i + "' data-col='" + j + "' value='" + percorsoImmagini[imagePath] + "'><img src='" + imagePath + "' alt='Image'></div>";
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
        let box = document.getElementsByClassName('box')[row * col + col];
        box.getElementsByTagName('img')[0].src = 'images/blank.png';
        box.setAttribute('value', percorsoImmagini['images/blank.png']); // Aggiorna il valore della cella a 0
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
                let box = document.getElementsByClassName('box')[newRow * col + j];
                box.getElementsByTagName('img')[0].src = grid[i][j];
                box.setAttribute('value', percorsoImmagini[grid[i][j]]);
                grid[newRow][j] = grid[i][j];
                grid[i][j] = 'images/blank.png';
                box = document.getElementsByClassName('box')[i * col + j];
                box.getElementsByTagName('img')[0].src = 'images/blank.png';
                box.setAttribute('value', percorsoImmagini['images/blank.png']);
            }
        }
        for (let i = 0; i < emptyRows.length; i++) {
            grid[emptyRows[i]][j] = generaImmagine(emptyRows[i], j);
            let box = document.getElementsByClassName('box')[emptyRows[i] * col + j];
            box.getElementsByTagName('img')[0].src = grid[emptyRows[i]][j];
            box.setAttribute('value', percorsoImmagini[grid[emptyRows[i]][j]]);
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
                selBox.getElementsByTagName('img')[0].src = grid[selRow][selCol];
                this.getElementsByTagName('img')[0].src = grid[row][col];
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
