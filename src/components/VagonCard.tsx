import NextLink from 'next/link';
import { Link, Heading, Text, Stack, Button, Input, Flex } from '@chakra-ui/react';
import { Vagon } from '../types/vagon';
import { Photo } from '../types/photo';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { PlusSquareIcon } from '@chakra-ui/icons';

type Props = {
  vagon: Vagon;
};

export const VagonCard = ({ vagon }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const newPhoto = {
        vagonNumber: vagon.VagonNumber,
        src: base64String,
        date: Date.now(),
      };
      const photos: Photo[] = JSON.parse(localStorage.getItem('vagonPhotos') || '[]');
      const filtered = photos.filter((photo) => photo.vagonNumber !== vagon.VagonNumber);
      localStorage.setItem('vagonPhotos', JSON.stringify([newPhoto, ...filtered]));
      alert('Фото сохранено локально!');
    };
    reader.readAsDataURL(file);
  };

  return (
    <Flex
      boxSizing="border-box"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg="gray.100"
      borderColor="heroGradientEnd"
      _dark={{ bg: 'gray.800' }}
      flexDirection="column"
      justifyContent="center"
      gap={5}
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
        href={`/vagons/${vagon.VagonNumber}`}
        _hover={{ textDecoration: 'none', color: 'heroGradientStart' }}
      >
        <Heading color="heroGradientStart" size="md" cursor="pointer">
          Вагон №{vagon.VagonNumber}
        </Heading>
      </Link>
      <Stack gap={2}>
        <Text fontSize="sm">Тип: {vagon.VagonType}</Text>
        <Text fontSize="sm">Груз: {vagon.CargoName}</Text>
        <Text fontSize="sm">Владелец: {vagon.OwnerName}</Text>
        <Text fontSize="sm">Станция отправки: {vagon.DepartureStationName}</Text>
      </Stack>
      <Button
        leftIcon={<PlusSquareIcon />}
        bg="gray.300"
        _dark={{ bg: 'gray.700' }}
        color="heroGradientEnd"
        _hover={{ color: 'heroGradientStart' }}
        onClick={() => inputRef.current?.click()}
      >
        Загрузить фото
      </Button>
      <Input type="file" accept="image/*" display="none" ref={inputRef} onChange={handleUpload} />
    </Flex>
  );
};
