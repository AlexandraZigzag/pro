import React, { useState, useEffect, useCallback } from 'react';
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
    if (winner || board[index] || botThinking) return;  //еще нет победителя продолжаем игру и блокируем клики ничего не возвращаем

    const boardCopy = [...board];  //копируем доску
    boardCopy[index] = xIsNext ? 'X' : 'O'; //обозначение на доске
    setBoard(boardCopy); //отображается ход только крестик
    setXIsNext(!xIsNext);//ход бота
    if (!xIsNext) return;
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


  const makeBotMove = useCallback(() => {
    const emptySquares = board
      .map((square, index) => square === null ? index : null)
      .filter(val => val !== null);

    if (emptySquares.length === 0 || winner) {
      setBotThinking(false);
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const botMove = emptySquares[randomIndex];

    const boardCopy = [...board];
    boardCopy[botMove] = 'O';
    setBoard(boardCopy);
    setXIsNext(true);
    setBotThinking(false);
  }, [board, winner]);

  useEffect(() => {
    // Прекращаем выполнение если:
    // 1. Есть победитель
    // 2. Нет свободных клеток
    // 3. Сейчас очередь игрока (xIsNext)
    if (winner || !board.includes(null) || xIsNext) {
      setBotThinking(false);
      return;
    }

    // Запускаем ход бота
    setBotThinking(true);
    const timer = setTimeout(() => {
      const emptySquares = board
        .map((square, index) => square === null ? index : null)
        .filter(index => index !== null);

      if (emptySquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const boardCopy = [...board];
        boardCopy[emptySquares[randomIndex]] = 'O';
        setBoard(boardCopy);
        setXIsNext(true);
      }
      setBotThinking(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [xIsNext, winner, board]);

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
