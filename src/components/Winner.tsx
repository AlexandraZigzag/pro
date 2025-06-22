
import './Winner.css';

export function checkWinner(squares) {
  const winningCombinations = [
    [0, 1, 2], // первая строка
    [3, 4, 5], // вторая строка
    [6, 7, 8], // третья строка
    [0, 3, 6], // первый столбец
    [1, 4, 7], // второй столбец
    [2, 5, 8], // третий столбец
    [0, 4, 8], // диагональ
    [2, 4, 6] // диагональ
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

      // Подсвечиваем выигрышные клетки
      combo.forEach(index => {
        const squareElement = document.querySelector(`.square:nth-child(${index + 1})`);
        if (squareElement) {
          squareElement.classList.add('winning-square');
        }
      });

      return squares[a]; // Возвращаем 'X' или 'O'
    }
  }

  // Сбрасываем подсветку при новом ходе
  document.querySelectorAll('.square').forEach(sq => {
    sq.classList.remove('winning-square');
  });

  return null;
}
