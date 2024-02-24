/// ADD CONTAINER ON PAGE LOAD
document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".container");
    createGrid(16);

    // COLOR SELECTED OPTION
    document.querySelector('.color-RGB').style.backgroundColor = '#f1c40f';
  });


/// FUNCTIONS TO GET COLOURS 

let lastColorFunction = getRandomRGBColor; // Default to getRandomRGBColor

// Check if darken effect is on
let darkenButton = document.getElementById('darken-toggle');
let darkIsToggled = false;

darkenButton.addEventListener('click', () => {
    interactionCount = -1;
    darkIsToggled = !darkIsToggled;

    deleteIsToggled = false;
    document.querySelector('#delete-toggle').style.backgroundColor = "";

    darkenButton.style.backgroundColor == "" ? darkenButton.style.backgroundColor = '#f1c40f' : darkenButton.style.backgroundColor = '';
});
      
// Check if delete effect is on
let deleteButton = document.getElementById('delete-toggle');
let deleteIsToggled = false;

deleteButton.addEventListener('click', () => {
    interactionCount = -1;
    deleteIsToggled = !deleteIsToggled;

    darkIsToggled = false;
    document.querySelector('#darken-toggle').style.backgroundColor = "";


    deleteButton.style.backgroundColor == "" ? deleteButton.style.backgroundColor = '#f1c40f' : deleteButton.style.backgroundColor = '';
});

function getWhite(){
    return 'white';
}

// Function to return the color
function getColor() {
    // if clicking BLACK button = return getBlack function
    // if clicking RGB button = return getRandomRBGcolor function.
    // if DARKEN is true = return getNextColor function.
    if (deleteIsToggled) {
        return getWhite();
    } else if(userPicked == true && darkIsToggled == false) {
        return document.querySelector('.color-user').value;
    } else if(userPicked == true && darkIsToggled == true) {
        return nextUserColor()
    } else if(darkIsToggled && lastColorFunction != getBlack) {
        return getNextColor();
    } else return lastColorFunction();
}

// Set Black as last Color
document.querySelector('.color-black').addEventListener('click', (event) => {
    lastColorFunction = getBlack;
    interactionCount = -1;

    event.target.style.backgroundColor = '#f1c40f';
    userPicked = false;
    document.querySelector('.color-RGB').style.backgroundColor = "";
    document.querySelector('.color-user').style.backgroundColor = "";


});
function getBlack() {
    return 'black'
}

// Set User's Picked Color as last Color
userPicked = false;

document.querySelector('.color-user').addEventListener('change', (event) => {
    interactionCount = -1;
    userPicked = true;
    event.target.style.backgroundColor = '#f1c40f';
    // Reset background color for other buttons
    document.querySelector('.color-black').style.backgroundColor = "";
    document.querySelector('.color-RGB').style.backgroundColor = "";
});

function nextUserColor() {
    interactionCount++
    const userColor = document.querySelector('.color-user').value;

    const rgb = hexToRgb(userColor); // Convert hexadecimal color to RGB
    const { r, g, b } = rgb;
    const increment = interactionCount * 10;

    const newR = Math.max(0, r - increment); // Decrease each component by the increment
    const newG = Math.max(0, g - increment);
    const newB = Math.max(0, b - increment);

    return `rgb(${newR}, ${newG}, ${newB})`;
}

// Set RBG as last Color
document.querySelector('.color-RGB').addEventListener('click', (event) => {
    lastColorFunction = getRandomRGBColor;
    interactionCount = -1;
    event.target.style.backgroundColor = '#f1c40f';
    userPicked = false;

    document.querySelector('.color-black').style.backgroundColor = "" ;
    document.querySelector('.color-user').style.backgroundColor = "";


});
function getRandomRGBColor() {

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256); 
    const b = Math.floor(Math.random() * 256); 


    return `rgba(${r}, ${g}, ${b})`;
}
  
// SET DARKENING EFFECT

// Track the number of interactions
let interactionCount = -1;

// Function to get the next color based on the current interaction count
function getNextColor() {
    interactionCount++; 
    const increment = interactionCount * 10;

    if (lastColorFunction === getRandomRGBColor) {
        // If the last color function is RGB, progressively darken each RGB component
        const rgbColor = lastColorFunction();
        const [r, g, b] = rgbColor.match(/\d+/g); // Extract RGB components
        const newR = Math.max(0, r - increment); // Decrease each component by the increment
        const newG = Math.max(0, g - increment);
        const newB = Math.max(0, b - increment);

        return `rgb(${newR}, ${newG}, ${newB})`; // Construct the new RGB color
    } else {return getColor()}
}


// FUNCTIONS TO CREATE SQUARES
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

        document.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        
       square.addEventListener('mousedown', () => {
            isMouseDown = true; 
            square.style.backgroundColor = getColor();
        });

        square.addEventListener('mouseenter', () => {
            if (isMouseDown) {
                square.style.backgroundColor = getColor();
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

    interactionCount = -1;
});

clearButton.addEventListener('mousedown', () => {
    clearButton.style.backgroundColor = '#922B21'
})

clearButton.addEventListener('mouseup', () => {
    clearButton.style.backgroundColor = ''
})

/// NEW BUTTON 
let newButton = document.querySelector('.new');
newButton.addEventListener('click', () => {
    let gridSize = window.prompt('How many squares per side?', 16);
    if (gridSize !== ('0' && null)) {
        createGrid(gridSize);
    }

    interactionCount = -1;
});

newButton.addEventListener('mousedown', () => {
    newButton.style.backgroundColor = '#239B56'
})

newButton.addEventListener('mouseup', () => {
    newButton.style.backgroundColor = ''
})

// Function to convert hexadecimal color to RGB
function hexToRgb(hex) {
    // Remove '#' if present
    hex = hex.replace(/^#/, '');

    // Parse hexadecimal color string to integers
    const bigint = parseInt(hex, 16);

    // Extract RGB components
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}