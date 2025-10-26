import { Heading, Text, Stack, HStack, Image, Link, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';

const Index = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Stack spacing={8} align="center" justify="center" h="100vh">
      <Image src="/file.svg" alt="Artport Logo" boxSize="80px" mb={2} />
      <Heading as="h1" size="2xl" textAlign="center">
        Artport
      </Heading>
      <Text fontSize="xl" color="text" textAlign="center" maxW="600px">
        Сервис для просмотра вагонов, галереи и управления железнодорожными данными. Удобно, быстро,
        современно.
      </Text>
      <HStack spacing={6}>
        <Link
          as={NextLink}
          href="/vagons"
          px={6}
          py={3}
          borderRadius="md"
          fontWeight="bold"
          bg="heroGradientStart"
          color={isDark ? 'gray.800' : 'white'}
          fontSize="lg"
          _hover={{
            bg: isDark ? 'pink.400' : 'purple.600',
            textDecoration: 'none',
          }}
          display="inline-block"
        >
          Перейти к вагонам
        </Link>
        <Link
          as={NextLink}
          href="/gallery"
          px={6}
          py={3}
          borderRadius="md"
          fontWeight="bold"
          bg="heroGradientEnd"
          color={isDark ? 'gray.800' : 'white'}
          fontSize="lg"
          _hover={{
            bg: isDark ? 'yellow.400' : 'pink.500',
            textDecoration: 'none',
          }}
          display="inline-block"
        >
          Галерея
        </Link>
      </HStack>
    </Stack>
  );
};

export default Index;
