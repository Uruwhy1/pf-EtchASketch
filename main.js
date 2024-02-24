/// ADD CONTAINER ON PAGE LOAD
document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".container");
    createGrid(16);
  });

  
// FUNCTIONS
function resetGrid() {
    const container = document.querySelector(".container");
    container.innerHTML = '';
}


function generateSquares(size) {
    const container = document.querySelector(".container");

    // ADD CSS RULE TO HTML TO CALCULATE SQUARE SIZE
    const style = document.createElement('style');
    style.textContent = `
        .container div {
            width: calc(100% / ${size});
            height: calc(100% / ${size});
        }
    `;
    document.head.appendChild(style);

       
    // LOOP TO CREATE SQUARES
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        container.appendChild(square);


        // TRACK MOUSE CLICK
        isMouseDown = false;

        square.addEventListener('mousedown', () => {
            isMouseDown = true; 
            square.style.backgroundColor = 'black';
        });

        square.addEventListener('mouseenter', () => {
            if (isMouseDown) {
                square.style.backgroundColor = 'black';
            }
        });

        square.addEventListener('mouseup', () => {
            isMouseDown = false; 
        });
    }
}

function createGrid(size) {
    resetGrid()
    generateSquares(size)    
}

/// CLEAR BUTTON
let clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.style.backgroundColor = 'white'
    })
});

/// NEW BUTTON 
let newButton = document.querySelector('.new');
newButton.addEventListener('click', () => {
    let gridSize = window.prompt('How many squares per side?', 16);
    if (gridSize !== ('0' && null)) {
        createGrid(gridSize);
    }
});