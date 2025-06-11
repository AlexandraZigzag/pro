import React, { useState } from 'react';
import './Game.css';
import Board from '@components/Board';
import { checkWinner } from '@components/Winner';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = checkWinner(board);
  const handleClick = (index) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = xIsNext ? 'X' : '0';
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };

  const startGame = () => {
    return (
      <button className="startButton" onClick={() => setBoard(Array(9).fill(null))}>Начать заново</button>
    )
  };


 //
 //  const resetGame = () => {
 //      setBoard(Array(9).fill(null));
 //      setXIsNext(true);
 // };

  return (
    <div className="wrapper">
      { startGame () }
      {/*{ resetGame() }*/}
      <Board squares={board} click={handleClick} />
      <p className="infoGame">
        {winner ? 'Победитель ' + winner : 'Сейчас ходит ' + (xIsNext ? 'X' : '0')}
      </p>
    </div>
  );
};

export default Game;
