import {
  Box,
  Button,
  CloseButton,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import { Vagon } from "../../types/vagon";
import { VagonCard } from "../../components/VagonCard";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useFilterSortPaginate } from "../../hooks/useFilterSortPaginate";
import { getVagonsServerSideProps } from "../../utils/getServerSideProps";

type Props = {
  vagons: Vagon[];
};

const VagonsPage = ({ vagons }: Props) => {
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchVagonNumber, setSearchVagonNumber] = useState("");
  const [sortOption, setSortOption] = useState("");

  const filterFn = (vagon: Vagon) =>
    searchVagonNumber === "" || vagon.VagonNumber.includes(searchVagonNumber);

  const sortFn = (() => {
    switch (sortOption) {
      case "option1":
        return (a: Vagon, b: Vagon) =>
          Number(a.VagonNumber) - Number(b.VagonNumber);
      case "option2":
        return (a: Vagon, b: Vagon) =>
          Number(b.VagonNumber) - Number(a.VagonNumber);
      case "option3":
        return (a: Vagon, b: Vagon) =>
          a.DepartureStationName.localeCompare(b.DepartureStationName);
      case "option4":
        return (a: Vagon, b: Vagon) =>
          b.DepartureStationName.localeCompare(a.DepartureStationName);
      default:
        return null;
    }
  })();

  const { paginated, filtered, pageCount, currentPage, setCurrentPage, total } =
    useFilterSortPaginate(vagons, filterFn, sortFn, visibleCount);

  const clear = () => {
    setSearchVagonNumber("");
    setSortOption("");
    setCurrentPage(0);
  };

  return (
    <VStack spacing={5} width="full">
      <VStack spacing={2} maxW="300px" width="full">
        <Text fontSize="lg" fontWeight="bold" color="heroGradientStart">
          Поиск по номеру вагона:
        </Text>
        <Flex align="center" justify="space-between" gap={5} w="full">
          <InputGroup w="100%">
            <InputLeftElement pointerEvents={"none"}>
              <SearchIcon color="text" />
            </InputLeftElement>
            <Input
              type="number"
              placeholder="95621272"
              color="text"
              bg="gray.50"
              _dark={{ bg: "gray.900", color: "text" }}
              _focus={{
                borderColor: "heroGradientStart",
                boxShadow: "0 0 0 1px var(--chakra-colors-heroGradientStart)",
              }}
              _hover={{ borderColor: "heroGradientEnd" }}
              value={searchVagonNumber}
              onChange={(e) => setSearchVagonNumber(e.target.value)}
            />
          </InputGroup>
          <CloseButton onClick={clear} />
        </Flex>
      </VStack>
      <VStack spacing={2} maxW="300px" width="full">
        <Text fontSize="lg" fontWeight="bold" color="heroGradientStart">
          Отсортировать по:
        </Text>
        <Select
          placeholder="Умолчанию"
          color="text"
          _focus={{
            borderColor: "heroGradientStart",
            boxShadow: "0 0 0 1px var(--chakra-colors-heroGradientStart)",
          }}
          _hover={{ borderColor: "heroGradientEnd" }}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="option1">Номерам вагонов (возрастанию)</option>
          <option value="option2">Номерам вагонов (убыванию)</option>
          <option value="option3">Станциям отправления (возрастанию)</option>
          <option value="option4">Станциям отправления (убыванию)</option>
        </Select>
      </VStack>
      <Text fontSize="lg" fontWeight="bold" color="heroGradientStart">
        Найдено вагонов: {filtered.length}
      </Text>
      {filtered.length === 0 && (
        <Text fontSize="lg" mt={10} color="red.500">
          Нет вагонов, соответствующих критериям поиска.
        </Text>
      )}
      <SimpleGrid columns={[1, 2, 3, 4]} gap={5} justifyItems="center">
        {paginated.map((vagon) => (
          <Box key={vagon.VagonNumber} w="250px">
            <VagonCard vagon={vagon} />
          </Box>
        ))}
      </SimpleGrid>
      {filtered.length > visibleCount && (
        <Box>
          <Button
            leftIcon={<ChevronDownIcon />}
            onClick={() => setVisibleCount(visibleCount + 12)}
            color="heroGradientEnd"
            _hover={{ color: "heroGradientStart" }}
          >
            Показать еще
          </Button>
        </Box>
      )}
      <Box width={"full"}>
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Box>
    </VStack>
  );
};

export default VagonsPage;
export const getServerSideProps = getVagonsServerSideProps;
