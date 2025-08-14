import { Box } from "@chakra-ui/react";

export default function Cell({ cell, onClick, onRightClick }) {
  const getDisplay = () => {
    if (!cell.revealed) {
      return cell.flag ? "🚩" : "";
    }
    if (cell.mine) {
      return "💣";
    }
    return cell.adjacent > 0 ? cell.adjacent : "";
  };

  const bgColor = () => {
    if (cell.revealed) {
      return cell.mine
        ? "red.300"
        : "gray.200";
    }
    return "gray.400";
  };

  return (
    <Box
      w="32px"
      h="32px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bgColor()}
      border="1px solid"
      borderColor="gray.500"
      cursor={cell.revealed ? "default" : "pointer"}
      userSelect="none"
      fontWeight="bold"
      fontSize="sm"
      onClick={onClick}
      onContextMenu={onRightClick} // right-click handling
    >
      {getDisplay()}
    </Box>
  );
}
