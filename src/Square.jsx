import React from 'react';
import "./App.css";  // 引入 CSS 樣式文件

// 代表棋格的方塊
function Square({ value, onSquareClick }) {
  return (
    // 按鈕樣式用來顯示棋格
    <button className="square" onClick={onSquareClick}>
      {value}  {/* 顯示當前棋格的內容（'X' 或 'O' 或 null） */}
    </button>
  );
}

export default Square;