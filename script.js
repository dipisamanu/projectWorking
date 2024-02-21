let row = 5;
let col = 5;
let array = [];

for (let i = 0; i < 5; i++) {
    array[i] = [];
}
document.getElementById("grid").style.gridTemplateColumns = "repeat(" + col + ", 1fr)"
document.getElementById("grid").style.gridTemplateRows = "repeat(" + row + ", 1fr)"

for (let i = 0; i < (25); i++) {
    let box = "<div class='box'></div>";
    document.getElementById("grid").innerHTML += box;
}
for (let i = 0; i < 25; i++) {
    //inserire la cosa che ogni volta che genera la cella crea allinterno un numero random che identifica il tipo 
}
console.log(array, array.length);
