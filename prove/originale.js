document.addEventListener('DOMContentLoaded', () => {
    let grid = document.querySelector('.grid')
    let scoreDisplay = document.getElementById('score')
    let width = 5
    let cells = []
    let score = 0
    
    let immagini = [
    'images/bottle.png',
    'images/cardboard.png',
    'images/plastic.png',
    'images/waste.png'
    ]
    
    //create your board
    function createBoard() {
      for (let i = 0; i < width*width; i++) {
        let cell = document.createElement('div')
        cell.setAttribute('draggable', true)
        cell.setAttribute('id', i)
        let randomColor = Math.floor(Math.random() * immagini.length)
        cell.style.backgroundImage = immagini[randomColor]
        grid.appendChild(cell)
        cells.push(cell)
      }
    }
    createBoard()
    
    // Dragging the Candy
    let colorBeingDragged
    let colorBeingReplaced
    let cellIdBeingDragged
    let cellIdBeingReplaced
    
    cells.forEach(cell => cell.addEventListener('dragstart', dragStart))
    cells.forEach(cell => cell.addEventListener('dragend', dragEnd))
    cells.forEach(cell => cell.addEventListener('dragover', dragOver))
    cells.forEach(cell => cell.addEventListener('dragenter', dragEnter))
    cells.forEach(cell => cell.addEventListener('drageleave', dragLeave))
    cells.forEach(cell => cell.addEventListener('drop', dragDrop))
    
    function dragStart(){
        colorBeingDragged = this.style.backgroundImage
        cellIdBeingDragged = parseInt(this.id)
        // this.style.backgroundImage = ''
    }
    
    function dragOver(e) {
        e.preventDefault()
    }
    
    function dragEnter(e) {
        e.preventDefault()
    }
    
    function dragLeave() {
        this.style.backgroundImage = ''
    }
    
    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage
        cellIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        cells[cellIdBeingDragged].style.backgroundImage = colorBeingReplaced
    }
    
    function dragEnd() {
        //What is a valid move?
        let validMoves = [cellIdBeingDragged -1 , cellIdBeingDragged -width, cellIdBeingDragged +1, cellIdBeingDragged +width]
        let validMove = validMoves.includes(cellIdBeingReplaced)
    
        if (cellIdBeingReplaced && validMove) {
            cellIdBeingReplaced = null
        }  else if (cellIdBeingReplaced && !validMove) {
           cells[cellIdBeingReplaced].style.backgroundImage = colorBeingReplaced
           cells[cellIdBeingDragged].style.backgroundImage = colorBeingDragged
        } else  cells[cellIdBeingDragged].style.backgroundImage = colorBeingDragged
    }
    
    //drop candies once some have been cleared
    function moveIntocellBelow() {
        for (i = 0; i < 55; i ++) {
            if(cells[i + width].style.backgroundImage === '') {
                cells[i + width].style.backgroundImage = cells[i].style.backgroundImage
                cells[i].style.backgroundImage = ''
                let firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                let isFirstRow = firstRow.includes(i)
                if (isFirstRow && (cells[i].style.backgroundImage === '')) {
                  let randomColor = Math.floor(Math.random() * immagini.length)
                  cells[i].style.backgroundImage = immagini[randomColor]
                }
            }
        }
    }
    
    
    ///Checking for Matches
    //for row of Four
      function checkRowForFour() {
        for (i = 0; i < 60; i ++) {
          let rowOfFour = [i, i+1, i+2, i+3]
          let decidedColor = cells[i].style.backgroundImage
          let isBlank = cells[i].style.backgroundImage === ''
    
          let notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
          if (notValid.includes(i)) continue
    
          if(rowOfFour.every(index => cells[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            rowOfFour.forEach(index => {
            cells[index].style.backgroundImage = ''
            })
          }
        }
      }
      checkRowForFour()
    
    //for column of Four
      function checkColumnForFour() {
        for (i = 0; i < 39; i ++) {
          let columnOfFour = [i, i+width, i+width*2, i+width*3]
          let decidedColor = cells[i].style.backgroundImage
          let isBlank = cells[i].style.backgroundImage === ''
    
          if(columnOfFour.every(index => cells[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            columnOfFour.forEach(index => {
            cells[index].style.backgroundImage = ''
            })
          }
        }
      }
    checkColumnForFour()
    
      //for row of Three
      function checkRowForThree() {
        for (i = 0; i < 61; i ++) {
          let rowOfThree = [i, i+1, i+2]
          let decidedColor = cells[i].style.backgroundImage
          let isBlank = cells[i].style.backgroundImage === ''
    
          let notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
          if (notValid.includes(i)) continue
    
          if(rowOfThree.every(index => cells[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            rowOfThree.forEach(index => {
            cells[index].style.backgroundImage = ''
            })
          }
        }
      }
      checkRowForThree()
    
    //for column of Three
      function checkColumnForThree() {
        for (i = 0; i < 47; i ++) {
          let columnOfThree = [i, i+width, i+width*2]
          let decidedColor = cells[i].style.backgroundImage
          let isBlank = cells[i].style.backgroundImage === ''
    
          if(columnOfThree.every(index => cells[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            columnOfThree.forEach(index => {
            cells[index].style.backgroundImage = ''
            })
          }
        }
      }
    checkColumnForThree()
    
    // Checks carried out indefintely - Add Button to clear interval for best practise, or clear on game over/game won. If you have this indefinite check you can get rid of calling the check functions above.
    window.setInterval(function(){
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
        moveIntocellBelow()
      }, 100)
    })