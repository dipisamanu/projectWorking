let cells = ["glass", "cardboard", "plastic", "waste"];
let board = [];
let rows = 5;
let columns = 5;
let score = 0;
let selCell;
let otherCell;
let numElementi = {
    "vetro" : 0,
    "carta" : 0,
    "secco" : 0,
    "plastica" : 0
}
window.onload = function () {
    startGame();
    window.setInterval(function () {
        distruggi();
        caduta();
        genera();
        aggiornaBarra();
    }, 200);
}

function randomCella() {
    return cells[Math.floor(Math.random() * cells.length)];
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cell = document.createElement("img");
            cell.id = r.toString() + "-" + c.toString();
            cell.src = "images/" + randomCella() + ".png";
            cell.addEventListener("dragstart", dragStart);
            cell.addEventListener("dragover", dragOver);
            cell.addEventListener("dragenter", dragEnter);
            cell.addEventListener("dragleave", dragLeave);
            cell.addEventListener("drop", dragDrop);
            cell.addEventListener("dragend", dragEnd);
            cell.addEventListener("click", function () {
                if (cell.src.includes("riciclo")) {
                    potereDelRiciclo(r, c);
                }
            });
            cell.addEventListener("click", function () {
                if (cell.src.includes("amoreNatura")) {
                    removeAttornoCells(r, c);
                }
            });
            document.getElementById("board").append(cell);
            row.push(cell); // Aggiungi la cella alla riga corrente
        }
        board.push(row); // Aggiungi la riga completa alla matrice board
    }
    // Elimina eventuali combinazioni di tris o quadris
    while (checkValid()) {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                board[r][c].src = "images/" + randomCella() + ".png";
            }
        }
    }
}


function dragStart() {
    //this refers to cell that was clicked on for dragging
    selCell = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() { }

function dragDrop() {
    //this refers to the target cell that was dropped on
    otherTile = this;
}

function dragEnd() {
    if (selCell.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }
    let selCoords = selCell.id.split("-"); // id="0-0" -> ["0", "0"]
    let r = parseInt(selCoords[0]);
    let c = parseInt(selCoords[1]);
    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);
    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;
    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;
    let isAdiacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdiacent) {
        let selImg = selCell.src;
        let otherImg = otherTile.src;
        selCell.src = otherImg;
        otherTile.src = selImg;
        let validMove = checkValid();
        if (!validMove) {
            let selImg = selCell.src;
            let otherImg = otherTile.src;
            selCell.src = otherImg;
            otherTile.src = selImg;
        }
    }
}

function distruggi() {
    crushFive();
    crushFour();
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushFive() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 4; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            let candy4 = board[r][c + 3];
            let candy5 = board[r][c + 4];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank") && !candy1.src.includes("riciclo") && !candy1.src.includes("amoreNatura")) {
                if (candy1.src.includes("waste")) {
                    score += (1 * 5)
                    numElementi.secco += 5;
                } else if (candy1.src.includes("plastic")) {
                    score += (3 * 5)
                    numElementi.plastica += 5;
                } else if (candy1.src.includes("cardboard")) {
                    score += (2 * 5)
                    numElementi.carta += 5;
                } else if (candy1.src.includes("glass")) {
                    score += (5 * 5)
                    numElementi.vetro += 5;
                }
                candy1.src = "images/blank.png";
                candy2.src = "images/blank.png";
                candy3.src = "images/blank.png";
                candy4.src = "images/blank.png";
                candy5.src = "images/amoreNatura.png";
            }
        }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 4; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            let candy4 = board[r + 3][c];
            let candy5 = board[r + 4][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank") && !candy1.src.includes("riciclo") && !candy1.src.includes("amoreNatura")) {
                if (candy1.src.includes("waste")) {
                    score += (1 * 5)
                    numElementi.secco += 5;
                } else if (candy1.src.includes("plastic")) {
                    score += (3 * 5)
                    numElementi.plastica += 5;
                } else if (candy1.src.includes("cardboard")) {
                    score += (2 * 5)
                    numElementi.carta += 5;
                } else if (candy1.src.includes("glass")) {
                    score += (5 * 5)
                    numElementi.vetro += 5;
                }
                candy1.src = "images/blank.png";
                candy2.src = "images/blank.png";
                candy3.src = "images/blank.png";
                candy4.src = "images/blank.png";
                candy5.src = "images/amoreNatura.png";
            }
        }
    }
}

function crushFour() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            let candy4 = board[r][c + 3];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank") && !candy1.src.includes("riciclo") && !candy1.src.includes("amoreNatura")) {
                if (candy1.src.includes("waste")) {
                    score += (1 * 4)
                    numElementi.secco += 4;
                } else if (candy1.src.includes("plastic")) {
                    score += (3 * 4)
                    numElementi.plastica += 4;
                } else if (candy1.src.includes("cardboard")) {
                    score += (2 * 4)
                    numElementi.carta += 4;
                } else if (candy1.src.includes("glass")) {
                    score += (5 * 4)
                    numElementi.vetro += 4;
                }
                candy1.src = "images/blank.png";
                candy2.src = "images/blank.png";
                candy3.src = "images/blank.png";
                candy4.src = "images/riciclo.png";
            }
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            let candy4 = board[r + 3][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank") && !candy1.src.includes("riciclo") && !candy1.src.includes("amoreNatura")) {
                if (candy1.src.includes("waste")) {
                    score += (1 * 4)
                    numElementi.secco += 4;
                } else if (candy1.src.includes("plastic")) {
                    score += (3 * 4)
                    numElementi.plastica += 4;
                } else if (candy1.src.includes("cardboard")) {
                    score += (2 * 4)
                    numElementi.carta += 4;
                } else if (candy1.src.includes("glass")) {
                    score += (5 * 4)
                    numElementi.vetro += 4;
                }
                candy1.src = "images/blank.png";
                candy2.src = "images/blank.png";
                candy3.src = "images/blank.png";
                candy4.src = "images/riciclo.png";
            }
        }
    }
}

function crushThree() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank") && !candy1.src.includes("riciclo") && !candy1.src.includes("amoreNatura")) {
                if (candy1.src.includes("waste")) {
                    score += (1 * 3)
                    numElementi.secco += 3;
                } else if (candy1.src.includes("plastic")) {
                    score += (3 * 3)
                    numElementi.plastica += 3;
                } else if (candy1.src.includes("cardboard")) {
                    score += (2 * 3)
                    numElementi.carta += 3;
                } else if (candy1.src.includes("glass")) {
                    score += (5 * 3)
                    numElementi.vetro += 3;
                }
                candy1.src = "images/blank.png";
                candy2.src = "images/blank.png";
                candy3.src = "images/blank.png";

            }
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank") && !candy1.src.includes("riciclo") && !candy1.src.includes("amoreNatura")) {
                if (candy1.src.includes("waste")) {
                    score += (1 * 3)
                    numElementi.secco += 3;
                } else if (candy1.src.includes("plastic")) {
                    score += (3 * 3)
                    numElementi.plastica += 3;
                } else if (candy1.src.includes("cardboard")) {
                    score += (2 * 3)
                    numElementi.carta += 3;
                } else if (candy1.src.includes("glass")) {
                    score += (5 * 3)
                    numElementi.vetro += 3;
                }
                candy1.src = "images/blank.png";
                candy2.src = "images/blank.png";
                candy3.src = "images/blank.png";

            }
        }
    }
}

function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function caduta() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "images/blank.png";
        }
    }
}

function genera() {
    // Check if there are any matches before generating new cells
    if (checkValid()) {
        return;
    }
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "images/" + randomCella() + ".png";
        }
    }
}

function potereDelRiciclo(row, column) {
    // Verifica se le celle adiacenti esistono prima di accedere ad esse
    if (row < 0 || row >= rows || column < 0 || column >= columns) {
        return;
    }
    // Rimuovi le celle adiacenti
    let candy0 = board[row][column];
    candy0.src = "images/blank.png";
    // Verifica la presenza di celle adiacenti e rimuovile se esistono
    if (row + 1 < rows) {
        let candy1 = board[row + 1][column];
        if (candy1.src.includes("riciclo")) {
            potereDelRiciclo(row + 1, column);
        }
        calcoloScore(candy1);
        candy1.src = "images/blank.png";
    }
    if (column + 1 < columns) {
        let candy2 = board[row][column + 1];
        if (candy2.src.includes("riciclo")) {
            potereDelRiciclo(row, column + 1);
        }
        calcoloScore(candy2);
        candy2.src = "images/blank.png";
    }
    if (row - 1 >= 0) {
        let candy3 = board[row - 1][column];
        if (candy3.src.includes("riciclo")) {
            potereDelRiciclo(row - 1, column);
        }
        calcoloScore(candy3);
        candy3.src = "images/blank.png";
    }
    if (column - 1 >= 0) {
        let candy4 = board[row][column - 1];
        if (candy4.src.includes("riciclo")) {
            potereDelRiciclo(row, column - 1);
        }
        calcoloScore(candy4);
        candy4.src = "images/blank.png";
    }
}

function removeAttornoCells(row, column) {
    // Verifica se le celle adiacenti esistono prima di accedere ad esse
    if (row < 0 || row >= rows || column < 0 || column >= columns) {
        return;
    }
    // Rimuovi le celle adiacenti
    let candy0 = board[row][column];
    candy0.src = "images/blank.png";
    // Verifica la presenza di celle adiacenti e rimuovile se esistono
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (row + i >= 0 && row + i < rows && column + j >= 0 && column + j < columns) {
                let candy = board[row + i][column + j];
                if (candy.src.includes("amoreNatura")) {
                    removeAttornoCells(row + i, column + j);
                }
                calcoloScore(candy);
                candy.src = "images/blank.png";
            }
        }
    }
}

function calcoloScore(tipo) {
    if (tipo.src.includes("waste")) {
        score += 1
        numElementi.secco++;
    } else if (tipo.src.includes("glass")) {
        score += 5
        numElementi.vetro++;
    } else if (tipo.src.includes("cardboard")) {
        score += 2
        numElementi.carta++;
    } else if (tipo.src.includes("plastic")) {
        score += 3
        numElementi.plastica++;
    }
}

function aggiornaBarra(){
    console.log(numElementi);
}