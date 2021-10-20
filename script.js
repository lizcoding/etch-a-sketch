/*
--- TO-DO ---
1. Change Rainbow Button Color.
2. Enable Color Picker for Color Button.
3. Update background color of Color Button when a new color is picked.
4. Change Eraser Button color maybe?
5. Change Font Family.
6. Change CSS for button.active and button:hover.
*/

let gridRange = document.getElementById('grid-range');
let rangeLabel = document.getElementById('range-label');
let etchGrid = document.getElementById('etch-grid');
let rainbowButton = document.getElementById('rainbow');
let colorButton = document.getElementById('color');
let clearButton = document.getElementById('clear');
let eraserButton = document.getElementById('eraser');
let colorPicker = document.getElementById('color-picker');

const rainbowArray = ['#F01000D9', '#F44336D9', '#FFAE07D9', '#F0D226D9', '#CDDC1BD9', '#6DD200D9', '#43C87BD9', '#00B5B7D9',
    '#1C90E3D9', '#2853D2D9', '#4426ADD9', '#2E007BD9'];
let previousIndex= null;

function getRainbowColor() {
    if (previousIndex == null || previousIndex == rainbowArray.length - 1) {
        previousIndex = 0;
    } else {
        previousIndex += 1
    }
    return rainbowArray[previousIndex];
}

const eraser = 'white';
let rainbow = getRainbowColor();
let currentColor = colorPicker.value;

colorPicker.oninput = function() {
    colorButton.style.backgroundColor = colorPicker.value;
}
 
function clearAll() {
    let squares = document.getElementsByClassName('square');
    for (let square of squares) {
        square.style.backgroundColor = eraser;
    }
}

function setCurrentColor() {
    if (colorButton.classList.contains('active')) {
        currentColor = colorPicker.value;
    }
    if (rainbowButton.classList.contains('active')) {
        currentColor = getRainbowColor();
    }
    if (eraserButton.classList.contains('active')) {
        currentColor = eraser;
    }
}

function deactivateButtons(e) {
    if (rainbowButton.classList.contains('active')) {
        rainbowButton.classList.remove('active');
    }
    if (colorButton.classList.contains('active')) {
        colorButton.classList.remove('active');
    }
    if (eraserButton.classList.contains('active')) {
        eraserButton.classList.remove('active');
    }
    e.target.classList.add('active');
}

function adjustListeners() {
    if (rainbowButton.classList.contains('active')) {
        rainbowButton.classList.remove('active');
    }
    if (colorButton.classList.contains('active')) {
        colorButton.classList.remove('active');
    }
    if (eraserButton.classList.contains('active')) {
        eraserButton.classList.remove('active');
    }
}

function adjustEtchGrid(current_num_squares, length) {
    // Manually add event listener to first square
    let target = document.getElementsByClassName('square')[0];
    target.addEventListener('mouseenter', e => {
        setCurrentColor();
        target.style.backgroundColor = currentColor;
    });

    if (current_num_squares < length**2) {
        for (let i = current_num_squares; i < length**2; i++) {
            let square = document.getElementsByClassName('square')[0];
            let newSquare = square.cloneNode();
            etchGrid.appendChild(newSquare);
            let target = document.getElementsByClassName('square')[etchGrid.childElementCount - 1];
            target.addEventListener('mouseenter', e => {
                setCurrentColor();
                target.style.backgroundColor = currentColor;
            });
        }
    }
    if (current_num_squares > length**2) {
        for (let i = current_num_squares; i > length**2; i--) {
            etchGrid.removeChild(etchGrid.lastChild);
        }
    }
    let clearSquares = document.getElementsByClassName('square');
    for (let item of clearSquares) {
        item.style.backgroundColor = eraser;
    }
}

gridRange.oninput = function() {
    let sideLength = gridRange.value
    let num_squares = etchGrid.childElementCount;
    
    rangeLabel.textContent = sideLength + ' x ' + sideLength;
    etchGrid.style.gridTemplateRows = 'repeat(' + sideLength + ', 1fr)';
    etchGrid.style.gridTemplateColumns = 'repeat(' + sideLength + ', 1fr)';
    adjustEtchGrid(num_squares, sideLength);
}

// Initialize grid range setting
rangeLabel.textContent = gridRange.value + ' x ' + gridRange.value;
adjustEtchGrid(etchGrid.childElementCount, gridRange.value);

// Enable clear button
clearButton.addEventListener('click', clearAll);

// Set active modes for color, rainbow, and eraser buttons
colorButton.addEventListener('click', deactivateButtons);
rainbowButton.addEventListener('click', deactivateButtons);
eraserButton.addEventListener('click', deactivateButtons);
