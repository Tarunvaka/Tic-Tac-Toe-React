import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(""));

  const [xIsNext, setXIsNext] = useState(true);

  const [winner, setWinner] = useState("");

  const [firstPlayer, setFirstPlayer] = useState("X");

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes("")) {
      setWinner("Tie");
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setWinner("");
    setXIsNext(firstPlayer === "X");
  };

  const selectFirstPlayer = (player) => {
    setFirstPlayer(player);
    setXIsNext(player === "X");
    setBoard(Array(9).fill(""));
    setWinner("");
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  return (
    <div className="game">
      <div className="status">
        {winner
          ? winner === "Tie"
            ? "It's a Tie!"
            : `Winner: ${winner}`
          : `Next player: ${xIsNext ? "X" : "O"}`}
      </div>
      <div className="board">
        <div className="row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="controls">
        <button onClick={restartGame}>Restart Game</button>
        <div className="select-first">
          <p>Select First Player:</p>
          <button onClick={() => selectFirstPlayer("X")}>X</button>
          <button onClick={() => selectFirstPlayer("O")}>O</button>
        </div>
      </div>
    </div>
  );
};

export default App;
