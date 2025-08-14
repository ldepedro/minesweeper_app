import { useState } from "react";
import { VStack, HStack, Button, Text } from "@chakra-ui/react";
import Cell from "./Cell";

function makeBoard(rows, cols, mines) {
  // Initialize empty board
  let board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      revealed: false,
      mine: false,
      flag: false,
      adjacent: 0
    }))
  );

  // Place mines randomly
  let placed = 0;
  while (placed < mines) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }

  // Calculate adjacent counts
  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].mine) {
          count++;
        }
      }
      board[r][c].adjacent = count;
    }
  }

  return board;
}

export default function Board({ rows, cols, mines }) {
  const [board, setBoard] = useState(() => makeBoard(rows, cols, mines));
  const [status, setStatus] = useState("playing"); // playing, win, lose

  const revealCell = (r, c) => {
    if (status !== "playing") return;

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const cell = newBoard[r][c];
    if (cell.revealed || cell.flag) return;

    cell.revealed = true;

    if (cell.mine) {
      setStatus("lose");
      // reveal all mines
      newBoard.forEach(row => row.forEach(c => { if (c.mine) c.revealed = true; }));
      setBoard(newBoard);
      return;
    }

    if (cell.adjacent === 0) {
      floodReveal(newBoard, r, c);
    }

    // Check win condition
    if (checkWin(newBoard)) {
      setStatus("win");
      // auto-reveal all mines
      newBoard.forEach(row => row.forEach(c => { if (c.mine) c.revealed = true; }));
    }

    setBoard(newBoard);
  };

  const floodReveal = (newBoard, r, c) => {
    const dirs = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    for (let [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        !newBoard[nr][nc].revealed &&
        !newBoard[nr][nc].mine
      ) {
        newBoard[nr][nc].revealed = true;
        if (newBoard[nr][nc].adjacent === 0) {
          floodReveal(newBoard, nr, nc);
        }
      }
    }
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();
    if (status !== "playing") return;

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const cell = newBoard[r][c];
    if (!cell.revealed) {
      cell.flag = !cell.flag;
    }

    // Check win condition after flagging
    if (checkWin(newBoard)) {
      setStatus("win");
      // auto-reveal all mines
      newBoard.forEach(row => row.forEach(c => { if (c.mine) c.revealed = true; }));
    }

    setBoard(newBoard);
  };

  const checkWin = (b) => {
    return b.every(row =>
      row.every(cell =>
        (cell.mine && !cell.revealed) || (!cell.mine && cell.revealed)
      )
    );
  };

  return (
    <VStack spacing={2}>
      <Text fontWeight="bold">
        {status === "playing" && "Keep going..."}
        {status === "win" && "🎉 You Win!"}
        {status === "lose" && "💥 You hit a mine!"}
      </Text>

      {board.map((row, rIdx) => (
        <HStack key={rIdx} spacing={0}>
          {row.map((cell, cIdx) => (
            <Cell
              key={cIdx}
              cell={cell}
              onClick={() => revealCell(rIdx, cIdx)}
              onRightClick={(e) => toggleFlag(e, rIdx, cIdx)}
            />
          ))}
        </HStack>
      ))}
    </VStack>
  );
}
