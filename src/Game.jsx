// Game.js
import React, { useState } from "react";
import Board from "./Board"; // 引入 Board 組件
import "./App.css"; // 引入 CSS 樣式文件

// 主遊戲組件，管理遊戲的狀態和回顧遊戲歷史
export default function Game() {
  // history 存儲所有步驟的棋盤狀態，currentMove 記錄當前是哪一步
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  // xIsNext 用來判斷下一位玩家是 'X' 還是 'O'
  const xIsNext = currentMove % 2 === 0;

  // currentSquares 存儲當前步驟的棋盤狀態
  const currentSquares = history[currentMove];

  // 處理玩家進行下一步操作
  function handlePlay(nextSquares) {
    // 保存當前棋盤狀態到歷史，並更新步驟
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1); // 將當前步數設置為最新步數
  }

  // 用來跳轉到指定步數的歷史棋盤
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // 重新開始遊戲
  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  // 計算遊戲歷史，並返回每一步的 "Go to move #" 按鈕
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "移動至 #" + move;
    } else {
      description = "重新開始遊戲";
    }
    return (
      <li key={move}>
        {/* 點擊後跳轉到相應的步驟 */}
        <button onClick={() => (move === 0 ? restartGame() : jumpTo(move))}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      {/* 顯示棋盤 */}
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      {/* 顯示歷史紀錄列表 */}
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
