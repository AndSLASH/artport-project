import { Stack, StackProps } from "@chakra-ui/react";

export const Main = (props: StackProps) => (
  <Stack
    as="main"
    flex="1"
    w="full"
    pt="132px"
    pb={8}
    px={4}
    bg="gray.50"
    color="text"
    _dark={{ bg: "gray.900", color: "text" }}
    {...props}
  />
);
