// Alteradores de classe do board
const X_CLASS = 'x';
const O_CLASS = 'o';

// Controladores do jogo
let vezJogadorO;
const mensagemFimJogo = document.querySelector('.winner-message-text')
const divFimJogo = document.getElementById('winner')
const tiles = document.querySelectorAll('.tile');
const board = document.getElementById('board');
const restartButton = document.getElementById('restart-button');
const CONDICOES_DE_VITORIA = [
    // horizontais
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // verticais
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonais
    [0, 4, 8],
    [2, 4, 6]
]

// Controladores dark mode e daltonic mode
const darkMode = document.getElementById('darkMode');
const darkBody = document.getElementById('board');
const daltonicAlert = document.getElementById('daltonicMode');

daltonicAlert.addEventListener('click', function() {
    alert("Pensando na inclusão, força motriz da inclusio, todas as cores aqui utilizadas são acessíveis a pessoas daltônicas!")
    daltonicAlert.disabled = true;
})

darkMode.addEventListener('change', function() {
    darkBody.classList.toggle('dark-mode')
})



restartButton.addEventListener('click', startGame);
// Chamando startGame() para resetar o board no começo do programa
startGame()


// startGame docstring: Inicia o jogo, retornando as classes para os valores iniciais
function startGame() {
    vezJogadorO = false;
    tiles.forEach(tile => {
        tile.classList.remove(X_CLASS);
        tile.classList.remove(O_CLASS);
        tile.removeEventListener('click', handleClick);
        tile.addEventListener('click', handleClick, {once: true})
    });
    setBoardHoverClass();
    divFimJogo.classList.remove('show');

}

// handleClick docstring: Recebe o evento de click no tile, verifica qual jogador tem seu turno atual e coloca a letra dele. Além disso, verifica as condições de vitória a cada clique (jogada)
function handleClick(e) {
    const tile = e.target;
    const jogadorAtual = vezJogadorO ? O_CLASS : X_CLASS;
    placeMark(tile, jogadorAtual);


    if(checkWin(jogadorAtual)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns()
        // Ordem importa, primeiro troca o turno (de X pra O e vice-versa) pra depois o hover do próximo jogador ser o correto
        setBoardHoverClass()
    }

}

// endGame docstring: Verifica se a condição de empate é verdadeira e a depender do resultado do jogo, mostra o texto de acordo com esse resultado
function endGame(draw) {
    if(draw) {
        mensagemFimJogo.innerText = 'Deu empate'
    } else {
        mensagemFimJogo.innerText = `${vezJogadorO ? "O" : "X"} venceu!`
    }

    divFimJogo.classList.add('show');
}

// isDraw docstring: verifica se todas as tiles estão preenchidas e sem vencedor. Retorna true se o empate for verdadeiro, mandando o true pra função endgame, ativando o empate. Se houver vitória, um valor false (que só é ativado em caso de vitória) é passado para endGame()
function isDraw() {
    return [...tiles].every(tile => {
        return tile.classList.contains(X_CLASS) || tile.classList.contains(O_CLASS)
    })
}

// placeMark docstring: adiciona no tile a letra relativa ao jogador da vez
function placeMark(tile, jogadorAtual) {
    tile.classList.add(jogadorAtual)
}

// swapTurns docstring: alterna os turnos entre os jogadores
function swapTurns() {
    vezJogadorO = !vezJogadorO;
}

// setBoardHoverClass docstring: identifica qual jogador tem a vez de jogar para ativar o efeito de hover da sua letra no board
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (vezJogadorO) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}
// checkWin docstring: verifica no array de arrays CONDICOES_DE_VITORIA se alguma das combinações foi atingida, verificando se todos os índices da condição de vitória estão marcados por um dos jogadores
function checkWin(jogadorAtual) {
    return CONDICOES_DE_VITORIA.some(combinacao => {
        return combinacao.every(index => {
            return tiles[index].classList.contains(jogadorAtual)
        })
    })
}