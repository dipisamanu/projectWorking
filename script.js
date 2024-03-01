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
let imageKeys = Object.keys(percorsoImmagini);
function generaImmagine(i, j) {
    let imagePath;
    do {
        imagePath = imageKeys[Math.floor(Math.random() * 4)];
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
                while (checkThree()) {
                    slideCandy();
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
function crushCandy() {
    //crushFive();
    //crushFour();
    crushThree();
    document.getElementById("score").innerText = score;

}
function checkThree() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col - 2; c++) {
            let box1 = document.getElementsByClassName('box')[r * col + c].getElementsByTagName('img')[0];
            let box2 = document.getElementsByClassName('box')[r * col + c + 1].getElementsByTagName('img')[0];
            let box3 = document.getElementsByClassName('box')[r * col + c + 2].getElementsByTagName('img')[0];
            if (box1.src.includes("blank") || box2.src.includes("blank") || box3.src.includes("blank")) {
                continue; // Se una delle immagini è "blank", passa alla prossima iterazione
            }
            if (box1.src === box2.src && box2.src === box3.src) {
                box1.src = "images/blank.png";
                box2.src = "images/blank.png";
                box3.src = "images/blank.png";
            }
        }
    }

    for (let c = 0; c < col; c++) {
        for (let r = 0; r < row - 2; r++) {
            let box1 = document.getElementsByClassName('box')[r * col + c].getElementsByTagName('img')[0];
            let box2 = document.getElementsByClassName('box')[(r + 1) * col + c].getElementsByTagName('img')[0];
            let box3 = document.getElementsByClassName('box')[(r + 2) * col + c].getElementsByTagName('img')[0];
            if (box1.src.includes("blank") || box2.src.includes("blank") || box3.src.includes("blank")) {
                continue; // Se una delle immagini è "blank", passa alla prossima iterazione
            }
            if (box1.src === box2.src && box2.src === box3.src) {
                box1.src = "images/blank.png";
                box2.src = "images/blank.png";
                box3.src = "images/blank.png";
            }
        }
    }
}
function slideCandy() {
    for (let c = 0; c < col; c++) {
        let emptySpaces = 0; 
        for (let r = row - 1; r >= 0; r--) {
            if (grid[r][c].src.includes("blank")) {
                emptySpaces++;
            } else if (emptySpaces > 0) {
                let newIndex = r + emptySpaces;
                grid[newIndex][c].src = grid[r][c].src; 
                grid[r][c].src = "images/blank.png";
            }
        }
    }
}
function generateCandy() {
    for (let c = 0; c < col;  c++) {
        if (grid[0][c].src.includes("blank")) {
            grid[0][c].src = "./images/" + generaImmagine() + ".png";
        }
    }
}