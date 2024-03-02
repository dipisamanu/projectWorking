let types = ["bottle", "waste", "cardboard", "glass", "plastic"]
let board = [];
let rows = 5;
let columns = 5;

window.onload = function () { //quando viene caricata la pagina
    startGame();
    //ogni decimo di secondo 
    window.setInterval(function () {
        // crushCandy();
        // slideCandy();
        // generateCandy();
    }, 100);
}

function randomCell() {
    return types[Math.floor(Math.random() * types.length)]; //0 - 4.99
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img id="0-0" src="./images/Waste.png">
            let tile = document.createElement("img"); //crea un elemento immagine
            tile.id = r.toString() + "-" + c.toString(); //all'id della cella aggiungo il numero di row e col
            tile.src = "images/" + randomCell() + ".png"; //gli attribuisco una random image
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);

}