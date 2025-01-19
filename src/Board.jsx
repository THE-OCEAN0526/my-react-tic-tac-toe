// Board.js
import React from 'react';
import Square from './Square';  // 引入 Square 組件
import './App.css';  // 引入 CSS 樣式文件

// 棋盤組件，負責顯示棋盤並處理每次玩家的點擊
function Board({ xIsNext, squares, onPlay }) {
  // 處理棋格被點擊的情況
  function handleClick(i) {
    // 如果已經有勝者或該棋格已經被點擊過，則不進行任何操作
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // 複製當前的棋盤狀態
    const nextSquares = squares.slice();
    // 根據當前玩家決定是 'X' 還是 'O'
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    // 將更新後的棋盤狀態傳遞給父組件
    onPlay(nextSquares);
  }

  // 計算當前棋盤是否有獲勝者
  const winner = calculateWinner(squares);
  const isTie = !winner && !squares.includes(null);
  let status;
  // 如果有勝者，顯示勝者
  if (winner) {
    status = '恭喜Winner是: ' + winner;
  }else if(isTie){
    status = '平手，請重新開始';
  } else {
    // 否則顯示下一位玩家是誰
    status = '下一位 是: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      {/* 顯示遊戲狀態（下一位玩家或勝者） */}
      <div className="status">{status}</div>
      {/* 顯示棋盤的三行 */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// 計算是否有玩家獲勝
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],  // 第一行
    [3, 4, 5],  // 第二行
    [6, 7, 8],  // 第三行
    [0, 3, 6],  // 第一列
    [1, 4, 7],  // 第二列
    [2, 5, 8],  // 第三列
    [0, 4, 8],  // 主對角線
    [2, 4, 6],  // 副對角線
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;  // 如果沒有獲勝者，返回 null
}

export default Board;
