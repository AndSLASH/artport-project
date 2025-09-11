import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import { getVagonByIdServerSideProps } from "../../utils/getServerSideProps";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id } = context.params;
  return await getVagonByIdServerSideProps(id);
}

export default function VagonDetailPage({ formattedVagon }) {
  const router = useRouter();

  return (
    <VStack spacing={8}>
      {!formattedVagon && <Text color="red.500">Вагон не знайдено</Text>}
      <Box>
        <Text fontSize="2xl" fontWeight="bold" color="heroGradientStart">
          Вагон №{formattedVagon.VagonNumber}
        </Text>
      </Box>
      <VStack spacing={2} align="start">
        <Text>Тип: {formattedVagon.VagonType}</Text>
        <Text>Покрытый: {formattedVagon.VagonIsCovered ? "Да" : "Нет"}</Text>
        <Text>Брутто: {formattedVagon.WeightBrutto}</Text>
        <Text>Нетто: {formattedVagon.WeightNet}</Text>
        <Text>Тара: {formattedVagon.WeghtTare}</Text>
        <Text>Вид обработки: {formattedVagon.ProcessingKind}</Text>
        <Text>Операция: {formattedVagon.OperationKind}</Text>
        <Text>Груз: {formattedVagon.CargoName}</Text>
        <Text>Владелец: {formattedVagon.OwnerName}</Text>
        <Text>Частный: {formattedVagon.IsPrivate ? "Да" : "Нет"}</Text>
        <Text>Отправитель: {formattedVagon.ShipperName}</Text>
        <Text>Получатель: {formattedVagon.ReceiverName}</Text>
        <Text>Железная дорога: {formattedVagon.RailwayOwn}</Text>
        <Text>Номер накладной: {formattedVagon.RailbillNumber}</Text>
        <Text>Вместимость: {formattedVagon.Capacity}</Text>
        <Text>Станция отправки: {formattedVagon.DepartureStationName}</Text>
        <Text>Страна назначения: {formattedVagon.DestinationCountryName}</Text>
        <Text>Штампы груза: {formattedVagon.CargoStamps}</Text>
      </VStack>
      <Button
        leftIcon={<ChevronLeftIcon />}
        onClick={() => router.back()}
        color="heroGradientEnd"
        _hover={{ color: "heroGradientStart" }}
      >
        Назад
      </Button>
    </VStack>
  );
}
