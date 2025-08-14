// components/Cell.js
import { Button } from "@chakra-ui/react";

export default function Cell({ value, onClick, revealed }) {
  return (
    <Button
      size="sm"
      w="40px"
      h="40px"
      bg={revealed ? "gray.300" : "gray.500"}
      color={revealed ? "black" : "white"}
      onClick={onClick}
    >
      {revealed && value !== 0 ? value : ""}
    </Button>
  );
}
