import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { getVagonByIdServerSideProps } from '../../lib/getServerSideProps';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Vagon } from '../../types/vagon';
import { fetchVagonById } from '../../api/vagons';

export async function getServerSideProps(context) {
  const { id } = context.params;
  return await getVagonByIdServerSideProps(id);
}

export default function VagonDetailPage({ formattedVagon }) {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useQuery<Vagon | null>({
    queryKey: ['vagon', id],
    queryFn: () => fetchVagonById(id as string),
    initialData: formattedVagon,
    enabled: !!id,
  });

  return (
    <VStack spacing={8}>
      {!data && <Text color="red.500">Вагон не знайдено</Text>}
      <Box>
        <Text fontSize="2xl" fontWeight="bold" color="heroGradientStart">
          Вагон №{data.VagonNumber}
        </Text>
      </Box>
      <VStack spacing={2} align="start">
        <Text>Тип: {data.VagonType}</Text>
        <Text>Покрытый: {data.VagonIsCovered ? 'Да' : 'Нет'}</Text>
        <Text>Брутто: {data.WeightBrutto}</Text>
        <Text>Нетто: {data.WeightNet}</Text>
        <Text>Вид обработки: {data.ProcessingKind}</Text>
        <Text>Операция: {data.OperationKind}</Text>
        <Text>Груз: {data.CargoName}</Text>
        <Text>Владелец: {data.OwnerName}</Text>
        <Text>Частный: {data.IsPrivate ? 'Да' : 'Нет'}</Text>
        <Text>Отправитель: {data.ShipperName}</Text>
        <Text>Получатель: {data.ReceiverName}</Text>
        <Text>Железная дорога: {data.RailwayOwn}</Text>
        <Text>Номер накладной: {data.RailbillNumber}</Text>
        <Text>Вместимость: {data.Capacity}</Text>
        <Text>Станция отправки: {data.DepartureStationName}</Text>
        <Text>Страна назначения: {data.DestinationCountryName}</Text>
        <Text>Штампы груза: {data.CargoStamps}</Text>
      </VStack>
      <Button
        leftIcon={<ChevronLeftIcon />}
        onClick={() => router.back()}
        color="heroGradientEnd"
        _hover={{ color: 'heroGradientStart' }}
      >
        Назад
      </Button>
    </VStack>
  );
}
