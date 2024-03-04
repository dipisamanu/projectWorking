let row = 5;
let col = 5;
let grid = [];
document.getElementById("grid").style.gridTemplateColumns = "repeat(" + col + ", 1fr)";
document.getElementById("grid").style.gridTemplateRows = "repeat(" + row + ", 1fr)";
let percorsoImmagini = {
    'images/bottle.png': 5,
    'images/cardboard.png': 2,
    'images/plastic.png': 3,
    'images/waste.png': 1
};
let imageKeys = Object.keys(percorsoImmagini); //prende il riferimento della key di quell'oggetto
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
function checkForAlignments() {
    let removed = false;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col - 2; j++) {
            if (grid[i][j] === grid[i][j + 1] && grid[i][j] === grid[i][j + 2]) {
                document.getElementsByClassName('box')[i * col + j].getElementsByTagName('img')[0].src = '';
                document.getElementsByClassName('box')[i * col + j + 1].getElementsByTagName('img')[0].src = '';
                document.getElementsByClassName('box')[i * col + j + 2].getElementsByTagName('img')[0].src = '';
                grid[i][j] = null;
                grid[i][j + 1] = null;
                grid[i][j + 2] = null;
                removed = true;
            }
        }
    }
    for (let j = 0; j < col; j++) {
        for (let i = 0; i < row - 2; i++) {
            if (grid[i][j] === grid[i + 1][j] && grid[i][j] === grid[i + 2][j]) {
                document.getElementsByClassName('box')[i * col + j].getElementsByTagName('img')[0].src = '';
                document.getElementsByClassName('box')[(i + 1) * col + j].getElementsByTagName('img')[0].src = '';
                document.getElementsByClassName('box')[(i + 2) * col + j].getElementsByTagName('img')[0].src = '';
                grid[i][j] = null;
                grid[i + 1][j] = null;
                grid[i + 2][j] = null;
                removed = true;
            }
        }
    }
    return removed;
}
function checkBoard() {
    let removed = false;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col - 2; j++) {
            if (grid[i][j] === grid[i][j + 1] && grid[i][j] === grid[i][j + 2]) {
                document.getElementsByClassName('box')[i * col + j].getElementsByTagName('img')[0].src = '';
                document.getElementsByClassName('box')[i * col + j + 1].getElementsByTagName('img')[0].src = '';
                document.getElementsByClassName('box')[i * col + j + 2].getElementsByTagName('img')[0].src = '';
                grid[i][j] = null;
                grid[i][j + 1] = null;
                grid[i][j + 2] = null;
                removed = true;
            }
        }
    }
    for (let j = 0; j < col; j++) {
        for (let i = 0; i < row - 2; i++) {
            if (grid[i][j] === grid[i + 1][j] && grid[i][j] === grid[i + 2][j]) {
                document.getElementsByClassName('box')[i * col + j].getElementsByTagName('img')[0].src = '';
                document.getElementsByClassName('box')[(i + 1) * col + j].getElementsByTagName('img')[0].src = '';
                document.getElementsByClassName('box')[(i + 2) * col + j].getElementsByTagName('img')[0].src = '';
                grid[i][j] = null;
                grid[i + 1][j] = null;
                grid[i + 2][j] = null;
                removed = true;
            }
        }
    }
    return removed;
}

function dropCells() {
    for (let j = 0; j < col; j++) {
        let emptyRows = [];
        for (let i = row - 1; i >= 0; i--) {
            if (!grid[i][j]) {
                emptyRows.push(i);
            } else if (emptyRows.length > 0) {
                let newRow = emptyRows.pop();
                grid[newRow][j] = grid[i][j];
                grid[i][j] = null;
                document.getElementsByClassName('box')[newRow * col + j].getElementsByTagName('img')[0].src = grid[newRow][j];
                document.getElementsByClassName('box')[i * col + j].getElementsByTagName('img')[0].src = '';
            }
        }
        for (let i = 0; i < emptyRows.length; i++) {
            grid[emptyRows[i]][j] = generaImmagine(emptyRows[i], j);
            document.getElementsByClassName('box')[emptyRows[i] * col + j].getElementsByTagName('img')[0].src = grid[emptyRows[i]][j];
        }
    }
}

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
                while (checkBoard()) {
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