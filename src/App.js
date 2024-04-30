import './App.css';
import { useState } from 'react';

function Square ({ value, onSquareClick, isWinner }) {
  return (
    <button
      className={`square ${isWinner ? 'winner' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board() {
  const [movesCount, setMovesCount] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] != null || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setMovesCount(movesCount + 1);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  }  

  const winnerInfo = calculateWinner(squares);
  let status;
  if (winnerInfo) {
    status = "Winner: " + winnerInfo.winner;
  } 
  else if (movesCount === 9) {
    status = "Draw";
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className='container'>
        <div className='content'>
          <div className='board'>
            <div className='status'>{status}</div>
            <div className='board-row'>
              {Array.from(Array(3).keys()).map(col => {
                const index = col;
                const isWinner = winnerInfo && winnerInfo.line.includes(index);
                return (
                  <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} isWinner={isWinner} />
                );
              })}
            </div>
            <div className='board-row'>
              {Array.from(Array(3).keys()).map(col => {
                const index = col + 3;
                const isWinner = winnerInfo && winnerInfo.line.includes(index);
                return (
                  <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} isWinner={isWinner} />
                );
              })}
            </div>
            <div className='board-row'>
              {Array.from(Array(3).keys()).map(col => {
                const index = col + 6;
                const isWinner = winnerInfo && winnerInfo.line.includes(index);
                return (
                  <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} isWinner={isWinner} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;