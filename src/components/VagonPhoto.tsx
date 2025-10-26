import NextLink from 'next/link';
import { Link, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { Photo } from '../types/photo';
import { SmallCloseIcon } from '@chakra-ui/icons';

type Props = {
  photo: Photo;
  onDelete: (vagonNumber: string) => void;
};

export const VagonPhoto = ({ photo, onDelete }: Props) => (
  <Flex
    boxSizing="border-box"
    flexDirection="column"
    alignItems="center"
    gap={2}
    w="full"
    h="full"
    borderWidth="1px"
    borderRadius="lg"
    borderColor="heroGradientEnd"
    overflow="hidden"
    bg="gray.100"
    _dark={{ bg: 'gray.800' }}
    textAlign="center"
    transition="transform 0.2s, box-shadow 0.2s"
    willChange="transform"
    transformOrigin="center"
    _hover={{
      transform: 'scale(1.03)',
      borderColor: 'heroGradientStart',
    }}
  >
    <Link
      as={NextLink}
      href={`/vagons/${photo.vagonNumber}`}
      _hover={{ textDecoration: 'none', color: 'heroGradientStart' }}
    >
      <Image
        display="flex"
        src={photo.src}
        alt={`Фото вагона ${photo.vagonNumber}`}
        width="100%"
        height="200px"
        objectFit="cover"
      />
    </Link>
    <VStack spacing={2} align="center" pb={4}>
      <VStack spacing={1} align="center">
        <Text fontWeight="bold">Вагон №{photo.vagonNumber}</Text>
        <Text fontSize="xs" color="gray.500">
          {new Date(photo.date).toLocaleString()}
        </Text>
      </VStack>
      <Button
        leftIcon={<SmallCloseIcon />}
        justifyContent="center"
        iconSpacing={1}
        size="sm"
        colorScheme="red"
        onClick={() => onDelete(photo.vagonNumber)}
      >
        Удалить фото
      </Button>
    </VStack>
  </Flex>
);
