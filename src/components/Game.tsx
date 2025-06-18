import React, { useState, useEffect } from 'react';
import './Game.css';
import Board from '@components/Board';
import { checkWinner } from '@components/Winner';


const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);  //определяем кто первый ходит
  const winner = checkWinner(board); //определяем победителя
  const [botThinking, setBotThinking] = useState(false); //вкл и выкл бот
  const [thinkingDots, setThinkingDots] = useState(''); // думает бот анимация
  // const [score, setScore] = useState({ 'X': 0, 'O': 0);

  const handleClick = (index) => {
    const boardCopy = [...board];  //копируем доску
    if (winner || boardCopy[index] || botThinking) return;  //еще нет победителя продолжаем игру и блокируем клики ничего не возвращаем
    boardCopy[index] = xIsNext ? 'X' : '0'; //обозначение на доске
    setBoard(boardCopy); //отображается ход только крестик
    setXIsNext(false); //ход бота
    setBotThinking(true); //анимация работает
  };


  const startGame = () => {
    return (
      <button className="startButton" onClick={() => {
        setXIsNext(true); //всегда начинает крестик
        setBotThinking (false);
        setThinkingDots('');
        setBoard(Array(9).fill(null))}}>Новая игра</button>) //возвращает пустую доску

  };

  const makeBotMove = () => {
    const emptySquare = board
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null) as number[];

    if (emptySquare.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquare.length);
      const botMove = emptySquare[randomIndex];

      const boardCopy = [...board];
      boardCopy[botMove] = 'O';
      setBoard(boardCopy);
      setXIsNext(true);
    }
    setBotThinking(false);
  };

  useEffect(() => {
    if (!botThinking) {
      setThinkingDots('');
      return;
    }
    const timer = setInterval(() => {
      setThinkingDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(timer);
  }, [botThinking]);

  useEffect(() => {
    if (!xIsNext && !winner) {
      const timer = setTimeout(() => {
        makeBotMove();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [board, xIsNext, winner]);

  const whoIsNext = () => {
    if (winner) {
      return `Выиграл ${winner}`;
    } else if (board.includes(null)) {
      return botThinking
        ? `Бот думает${thinkingDots}`
        : `Сейчас ходит: ${xIsNext ? 'X' : 'O'}`;
    } else {
      return 'Никто не выиграл((';
    }
  };

  return (
    <div className="wrapper">
       <p className="nameGame">Крестики/нолики</p>
      {startGame()}
      <Board squares={board} click={handleClick} />
      <p className="infoGame">
        {whoIsNext()}
      </p>
    </div>
  );
};

export default Game;
