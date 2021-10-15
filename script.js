let gridRange = document.getElementById('grid-range');
let rangeLabel = document.getElementById('range-label');
let etchGrid = document.getElementById('etch-grid');

function adjustEtchGrid(current_num_squares, length) {
    if (current_num_squares < length**2) {
        for (let i = current_num_squares; i < length**2; i++) {
            let square = document.getElementsByClassName('square')[0];
            let newSquare = square.cloneNode();
            etchGrid.appendChild(newSquare);
        }
    }
    if (current_num_squares > length**2) {
        for (let i = current_num_squares; i > length**2; i--) {
            etchGrid.removeChild(etchGrid.firstChild);
        }
    }
}

rangeLabel.textContent = gridRange.value + ' x ' + gridRange.value;
adjustEtchGrid(etchGrid.childElementCount, gridRange.value);

gridRange.oninput = function() {
    let sideLength = gridRange.value
    let num_squares = etchGrid.childElementCount;
    
    rangeLabel.textContent = sideLength + ' x ' + sideLength;
    etchGrid.style.gridTemplateRows = 'repeat(' + sideLength + ', 1fr)';
    etchGrid.style.gridTemplateColumns = 'repeat(' + sideLength + ', 1fr)';
    adjustEtchGrid(num_squares, sideLength);
}