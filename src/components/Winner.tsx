
import './Winner.css';

export function checkWinner(squares) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

      combo.forEach(index => {
        const squareElement = document.querySelector(`.square:nth-child(${index + 1})`);
        if (squareElement) {
          squareElement.classList.add('winning-square');
        }
      });

      return squares[a];
    }
  }

  document.querySelectorAll('.square').forEach(sq => {
    sq.classList.remove('winning-square');
  });

  return null;
}
