// 1. Додати нові фігури +
// 2. Стилізувати нові фігури +
// 3. Додати функцію рандому котра буде поветати випадкову фігуру +
// 4. Центрувати фігуру незалежно від ширини +



const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = [
    'O',
    'I',
    'S',
    'Z',
    'L',
    'J',
    'T'
]

const TETROMINOES = {
    'O': [
        [1, 1],
        [1, 1]
    ],
    'I': [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
    ],
    'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    'Z': [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    'L': [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    'J': [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1]
    ],
    'T': [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ]
}

function convertPositionToIndex(row, column){
    return row * PLAYFIELD_COLUMNS + column;
}

let playField;
let tetromino;

function generatePlayField(){
    for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
        const div = document.createElement(`div`);
        document.querySelector('.grid').append(div);
    }
    playField = new Array(PLAYFIELD_ROWS).fill()
                    .map( ()=> new Array(PLAYFIELD_COLUMNS).fill(0) )
    // console.log(playField);
}

function generateRandomTetromino() {
    const randomIndex = Math.floor(Math.random() * TETROMINO_NAMES.length);
    const name = TETROMINO_NAMES[randomIndex];
    const matrix = TETROMINOES[name];

    return {
        name,
        matrix,
        row: 1,
        column: Math.floor((PLAYFIELD_COLUMNS - matrix[0].length) / 2),
    };
}


function generateTetromino(){
    tetromino = generateRandomTetromino();
}

generatePlayField();
generateTetromino();

const cells = document.querySelectorAll('.grid div');

function drawPlayField(){
    for(let row = 0; row < PLAYFIELD_ROWS; row++){
        for(let column = 0; column < PLAYFIELD_COLUMNS; column++){
            if(playField[row][column] == 0) continue;
            const name = playField[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }
}


function drawTetromino(){
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for(let row = 0; row < tetrominoMatrixSize; row++){
        for(let column = 0; column < tetrominoMatrixSize; column++){
            if(!tetromino.matrix[row][column]) continue;           
            const cellIndex = convertPositionToIndex(
                tetromino.row + row,
                tetromino.column + column
            );
            cells[cellIndex].classList.add(name);
        }
    }
}

function draw(){
    cells.forEach(cell => cell.removeAttribute('class'));
    drawPlayField();
    drawTetromino();
}

draw();

document.addEventListener('keydown', onKeyDown);
function onKeyDown(e){
    // console.log(e);
    switch(e.key){
        case 'ArrowUp':
            rotateTetromino();    
            break;
        case 'ArrowDown':
            moveTetrominoDown();    
            break;
        case 'ArrowRight':
            moveTetrominoRight();    
            break;
        case 'ArrowLeft':
            moveTetrominoLeft();    
            break;
    }
    draw();
}

function rotateTetromino(){
    const originalMatrix = tetromino.matrix;
    const rotatedMatrix = [];

    for (let i = 0; i < originalMatrix[0].length; i++) {
        rotatedMatrix.push([]);
        for (let j = 0; j < originalMatrix.length; j++) {
            rotatedMatrix[i].push(originalMatrix[j][i]);
        }
    }
    rotatedMatrix.forEach(row => row.reverse());
    tetromino.matrix = rotatedMatrix;
}

function moveTetrominoDown(){
    tetromino.row += 1;
    drawTetromino();
}
function moveTetrominoRight(){
    tetromino.column += 1;
}
function moveTetrominoLeft(){
    tetromino.column -= 1;
}

