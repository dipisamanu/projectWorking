let rows = 5;
let columns = 5;
let grid = [];
let gridElement = document.getElementById("grid");
gridElement.style.gridTemplateColumns = "repeat(" + columns + ", 1fr)";
gridElement.style.gridTemplateRows = "repeat(" + rows + ", 1fr)";
let immagini = ["waste","bottle","cardboard","plastic","blank"];
let selBox = null;

function random(){
    return immagini[Math.floor(Math.random()*(immagini.length-1))];
}

function creaGriglia() {
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < columns; j++) {
            let immagine = random();
            let s = "<div class='box' data-row='" + i + "' data-col='" + j + "' value='images/" + immagine + ".png'><img src='images/" + immagine + ".png' alt='Image'></div>";
            gridElement.innerHTML += s;
            grid[i][j] = immagine;
        }
    }
}
let boxes = document.getElementsByClassName('box');

for (let i = 0; i < grid.length; i++) {
    grid[i].addEventListener('click', function () {
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


creaGriglia();
