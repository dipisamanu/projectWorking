let row = 5;
let col = 5;
let array = [];

for (let i = 0; i < 5; i++) {
    array[i] = [];
}

document.getElementById("grid").style.gridTemplateColumns = "repeat(" + col + ", 1fr)"
document.getElementById("grid").style.gridTemplateRows = "repeat(" + row + ", 1fr)"

let imagePaths = ['bottle.jpeg', '/Users/ottaviodipisa/Documents/GitHub/projectWorking/cardboard.jpeg', '/Users/ottaviodipisa/Documents/GitHub/projectWorking/plastic.jpeg', '/Users/ottaviodipisa/Documents/GitHub/projectWorking/waste.jpeg']; 

function getRandomImagePath() {
    return imagePaths[Math.floor(Math.random() * imagePaths.length)];
}

for (let i = 0; i < (25); i++) {
    let randomImagePath = getRandomImagePath();
    let s = "<div class='box'><img src='" + randomImagePath + "' alt='Image'></div>";
    document.getElementById("grid").innerHTML += s;
}
