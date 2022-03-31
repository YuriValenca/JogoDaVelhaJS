const X_CLASS = 'x';
const O_CLASS = 'o';
const CONDICOES_DE_VITORIA = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winnerMessageTextElement = document.querySelector('.winner-message-text')
const winnerMessageElement = document.getElementById('winner')
const cellElements = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const restartButton = document.getElementById('restart-button');
const darkMode = document.getElementById('darkMode');
const darkBody = document.getElementById('board');
const darkHeader = document.getElementById('dark-header');
let circleTurn;

startGame()

restartButton.addEventListener('click', startGame);

darkMode.addEventListener('change', function() {
    darkBody.classList.toggle('dark-mode')
})

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})
    });
    setBoardHoverClass();
    winnerMessageElement.classList.remove('show');

}

function handleClick(e) {
    const cell = e.target;
    const currentPlayer = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentPlayer);


    if(checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns()
        // Order here matters
        setBoardHoverClass()
    }

}


function endGame(draw) {
    if(draw) {
        winnerMessageTextElement.innerText = 'Deu empate'
    } else {
        winnerMessageTextElement.innerText = `${circleTurn ? "O" : "X"} venceu!`
    }

    winnerMessageElement.classList.add('show');

}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell, currentPlayer) {
    cell.classList.add(currentPlayer)
}


function swapTurns() {
    circleTurn = !circleTurn;
}


function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (circleTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentPlayer) {
    return CONDICOES_DE_VITORIA.some(combinacao => {
        return combinacao.every(index => {
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}