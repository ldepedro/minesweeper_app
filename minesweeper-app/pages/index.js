import { Box, Heading, Center, HStack, Button, Text, VStack } from "@chakra-ui/react";
import Board from "../components/Board";
import { useState } from "react";

export default function Home() {
  const [rows, setRows] = useState(9);
  const [cols, setCols] = useState(9);
  const [mines, setMines] = useState(10);
  const [key, setKey] = useState(0); // force remount

  const newGame = () => {
    // Random size and mines
    const randomRows = Math.floor(Math.random() * 6) + 9; // 9–14 rows
    const randomCols = Math.floor(Math.random() * 6) + 9; // 9–14 cols
    const maxMines = Math.floor(randomRows * randomCols * 0.2); // up to 20% mines
    const randomMines = Math.floor(Math.random() * (maxMines - 5)) + 5; // at least 5 mines

    setRows(randomRows);
    setCols(randomCols);
    setMines(randomMines);
    setKey((n) => n + 1); // reset board
  };

  return (
    <Center minH="100vh" bg="gray.100" p={6}>
      <Box p={6} bg="white" rounded="2xl" shadow="xl" borderWidth="1px" w="fit-content">
        <VStack spacing={4} align="stretch">
          <Heading size="lg" textAlign="center">Minesweeper</Heading>

          <HStack justify="space-between">
            <Button size="sm" onClick={newGame}>New Game</Button>
            <Text fontSize="sm" color="gray.500">
              Size: {rows}×{cols}, Mines: {mines}
            </Text>
          </HStack>

          <Board key={key} rows={rows} cols={cols} mines={mines} />

          <Text fontSize="xs" color="gray.500" textAlign="center">
            Tip: Right-click to place/remove 🚩 flags.
          </Text>
        </VStack>
      </Box>
    </Center>
  );
}
