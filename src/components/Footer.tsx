import { Flex, FlexProps, Box, Link, HStack } from "@chakra-ui/react";
import NextLink from "next/link";

const routes = [
  { label: "Главная", href: "/" },
  { label: "Вагони", href: "/vagons" },
  { label: "Галерея", href: "/gallery" },
];

export const Footer = (props: FlexProps) => (
  <Box
    as="footer"
    py={8}
    w="full"
    bg="gray.50"
    borderTop="2px solid"
    borderColor="gray.300"
    _dark={{ bg: "gray.900", borderColor: "gray.700" }}
    zIndex={10}
  >
    <Flex
      maxW="1200px"
      w="full"
      px={4}
      mx="auto"
      align="center"
      justify="center"
      {...props}
    >
      <HStack spacing={4}>
        {routes.map((route) => (
          <Link
            as={NextLink}
            href={route.href}
            key={route.href}
            fontWeight="normal"
            color="text"
            _hover={{ color: "heroGradientStart", textDecoration: "none" }}
            _active={{ color: "heroGradientEnd" }}
          >
            {route.label}
          </Link>
        ))}
      </HStack>
    </Flex>
  </Box>
);
