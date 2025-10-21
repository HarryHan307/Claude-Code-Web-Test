// 게임 변수 선언
const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const playerDisplay = document.getElementById('player');
const messageDisplay = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = { X: 0, O: 0 };

// 승리 조건 배열
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// 셀 클릭 이벤트 리스너 추가
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// 리셋 버튼 이벤트 리스너
resetBtn.addEventListener('click', resetGame);

// 셀 클릭 핸들러
function handleCellClick(index) {
    // 게임이 끝났거나 이미 채워진 셀이면 무시
    if (!gameActive || gameState[index] !== '') {
        return;
    }

    // 현재 플레이어 마크 표시
    gameState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());

    // 승리 체크
    checkResult();
}

// 게임 결과 확인
function checkResult() {
    let roundWon = false;
    let winningCombination = null;

    // 승리 조건 확인
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            winningCombination = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        // 승리 표시
        messageDisplay.textContent = `${currentPlayer} 승리!`;
        messageDisplay.classList.add('win');

        // 승리한 셀에 애니메이션 추가
        winningCombination.forEach(index => {
            cells[index].classList.add('winning');
        });

        // 점수 업데이트
        scores[currentPlayer]++;
        updateScoreDisplay();

        gameActive = false;
        return;
    }

    // 무승부 확인
    if (!gameState.includes('')) {
        messageDisplay.textContent = '무승부!';
        messageDisplay.classList.add('draw');
        gameActive = false;
        return;
    }

    // 플레이어 교체
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.textContent = currentPlayer;
}

// 점수 표시 업데이트
function updateScoreDisplay() {
    scoreXDisplay.textContent = scores.X;
    scoreODisplay.textContent = scores.O;
}

// 게임 리셋
function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    playerDisplay.textContent = currentPlayer;
    messageDisplay.textContent = '';
    messageDisplay.classList.remove('win', 'draw');

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning');
    });
}

// 페이지 로드 시 점수 초기화
updateScoreDisplay();
