// components/Board.js
import { SimpleGrid } from "@chakra-ui/react";
import Cell from "./Cell";
import { useState } from "react";

export default function Board({ rows, cols, mines }) {
  const createBoard = () => {
    let board = Array(rows)
      .fill()
      .map(() => Array(cols).fill({ value: 0, revealed: false }));

    // Place mines
    let placed = 0;
    while (placed < mines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (board[r][c].value !== "M") {
        board[r][c] = { value: "M", revealed: false };
        placed++;
      }
    }

    // Calculate numbers
    const dirs = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    board = board.map((row, r) =>
      row.map((cell, c) => {
        if (cell.value === "M") return cell;
        let count = 0;
        dirs.forEach(([dr, dc]) => {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].value === "M") {
            count++;
          }
        });
        return { ...cell, value: count };
      })
    );

    return board;
  };

  const [board, setBoard] = useState(createBoard);

  const revealCell = (r, c) => {
    setBoard((prev) =>
      prev.map((row, ri) =>
        row.map((cell, ci) =>
          ri === r && ci === c ? { ...cell, revealed: true } : cell
        )
      )
    );
  };

  return (
    <SimpleGrid columns={cols} spacing={1}>
      {board.map((row, r) =>
        row.map((cell, c) => (
          <Cell
            key={`${r}-${c}`}
            value={cell.value}
            revealed={cell.revealed}
            onClick={() => revealCell(r, c)}
          />
        ))
      )}
    </SimpleGrid>
  );
}
