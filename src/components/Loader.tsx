import { Center, Spinner } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Center flex="1" minH="60vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="heroGradientStart"
        size="xl"
      />
    </Center>
  );
};
