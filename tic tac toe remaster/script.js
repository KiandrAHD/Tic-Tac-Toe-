document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = [];
    const xScoreElement = document.getElementById('xScore');
    const oScoreElement = document.getElementById('oScore');
    const gameInfoElement = document.getElementById('gameInfo');
    const statusElement = document.getElementById('status');
    const resetGameButton = document.getElementById('resetGame');
    const resetScoresButton = document.getElementById('resetScores');
    const themeToggle = document.getElementById('themeToggle');

    let boardState = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'x';
    let gameActive = true;
    let scores = { x: 0, o: 0 };

    function initializeBoard() {
        board.innerHTML = '';
        cells.length = 0;

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
            cells.push(cell);
        }
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameInfoElement.textContent = `Giliran Pemain ${currentPlayer.toUpperCase()}`;
        statusElement.textContent = '';
        gameActive = true;
    }

    function handleCellClick(e) {
        const index = e.target.getAttribute('data-index');

        if (boardState[index] !== '' || !gameActive) return;

        boardState[index] = currentPlayer;
        e.target.classList.add(currentPlayer);

        if (checkWin()) {
            handleWin();
            return;
        }

        if (checkTie()) {
            handleTie();
            return;
        }

        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        gameInfoElement.textContent = `Giliran Pemain ${currentPlayer.toUpperCase()}`;
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                cells[a].classList.add('winner');
                cells[b].classList.add('winner');
                cells[c].classList.add('winner');
                return true;
            }
            return false;
        });
    }

    function handleWin() {
        gameActive = false;
        scores[currentPlayer]++;
        updateScores();
        statusElement.textContent = `Pemain ${currentPlayer.toUpperCase()} menang!`;
        gameInfoElement.textContent = 'Permainan Selesai';
    }

    function checkTie() {
        return boardState.every(cell => cell !== '');
    }

    function handleTie() {
        gameActive = false;
        statusElement.textContent = 'Permainan seri!';
        gameInfoElement.textContent = 'Permainan Selesai';
    }

    function updateScores() {
        xScoreElement.textContent = scores.x;
        oScoreElement.textContent = scores.o;
    }

    resetGameButton.addEventListener('click', initializeBoard);

    resetScoresButton.addEventListener('click', () => {
        scores = { x: 0, o: 0 };
        updateScores();
        initializeBoard();
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌓';
    });

    initializeBoard();
});
