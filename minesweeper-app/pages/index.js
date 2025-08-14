// pages/index.js
import { Box, Heading, Center } from "@chakra-ui/react";
import Board from "../components/Board";

export default function Home() {
  return (
    <Center h="100vh" bg="gray.100">
      <Box p={5} bg="white" rounded="md" shadow="md">
        <Heading size="lg" mb={4}>Minesweeper</Heading>
        <Board rows={8} cols={8} mines={10} />
      </Box>
    </Center>
  );
}
