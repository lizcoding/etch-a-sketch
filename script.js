let gridRange = document.getElementById('grid-range');
let rangeLabel = document.getElementById('range-label');
let etchGrid = document.getElementById('etch-grid');
let rainbowButton = document.getElementById('rainbow');
let colorButton = document.getElementById('color');
let clearButton = document.getElementById('clear');
let eraserButton = document.getElementById('eraser');

function clearAll() {
    let squares = document.getElementsByClassName('square');
    for (let square of squares) {
        square.className = 'square';
    }
}

function getEventListener() {
    if (colorButton.classList.contains('active')) {
        return 'permahover';
    }
    if (rainbowButton.classList.contains('active')) {
        return 'rainbow';
    }
    if (eraserButton.classList.contains('active')) {
        return 'eraser';
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
    target.className = 'square ' + getEventListener();
    });

    if (current_num_squares < length**2) {
        for (let i = current_num_squares; i < length**2; i++) {
            let square = document.getElementsByClassName('square')[0];
            let newSquare = square.cloneNode();
            etchGrid.appendChild(newSquare);
            let target = document.getElementsByClassName('square')[etchGrid.childElementCount - 1];
            target.addEventListener('mouseenter', e => {
                target.className = 'square ' + getEventListener();
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
        item.className = 'square';
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
