// export function calculateWinner(squares: string) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ];
//   for (let i = 0; i < squares.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

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

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 'X' или 'O'
    }
  }

  return null; // победителя нет
}
