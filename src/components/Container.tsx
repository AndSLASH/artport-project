import { Box, BoxProps } from "@chakra-ui/react";

export const Container = (props: BoxProps) => (
  <Box
    maxW="1200px"
    w="full"
    mx="auto"
    bg="gray.50"
    color="text"
    _dark={{ bg: "gray.900", color: "text" }}
    transition="all 0.15s ease-out"
    {...props}
  />
);
