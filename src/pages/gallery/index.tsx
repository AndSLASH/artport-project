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
import { VagonPhoto } from "../../components/VagonPhoto";
import { Photo } from "../../types/photo";
import { useEffect, useState } from "react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useFilterSortPaginate } from "../../hooks/useFilterSortPaginate";
import Pagination from "../../components/Pagination";

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchVagonNumber, setSearchVagonNumber] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPhotos = JSON.parse(
        localStorage.getItem("vagonPhotos") || "[]"
      );
      setPhotos(storedPhotos);
    }
  }, []);

  const filterFn = (photo: Photo) =>
    searchVagonNumber === "" || photo.vagonNumber.includes(searchVagonNumber);

  const sortFn = (() => {
    switch (sortOption) {
      case "option1":
        return (a: Photo, b: Photo) =>
          Number(a.vagonNumber) - Number(b.vagonNumber);
      case "option2":
        return (a: Photo, b: Photo) =>
          Number(b.vagonNumber) - Number(a.vagonNumber);
      case "option3":
        return (a: Photo, b: Photo) => Number(a.date) - Number(b.date);
      case "option4":
        return (a: Photo, b: Photo) => Number(b.date) - Number(a.date);
      default:
        return null;
    }
  })();

  const handleDelete = (vagonNumber: string) => {
    const updatedPhotos = photos.filter((p) => p.vagonNumber !== vagonNumber);
    localStorage.setItem("vagonPhotos", JSON.stringify(updatedPhotos));
    setPhotos(updatedPhotos);
  };

  const { paginated, filtered, pageCount, currentPage, setCurrentPage, total } =
    useFilterSortPaginate(photos, filterFn, sortFn, visibleCount);

  const clear = () => {
    setSearchVagonNumber("");
    setSortOption("");
    setCurrentPage(0);
  };

  return (
    <VStack spacing={5} w="full">
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
          <option value="option3">Дата сохранения (возрастанию)</option>
          <option value="option4">Дата сохранения (убыванию)</option>
        </Select>
      </VStack>
      <Text fontSize="lg" fontWeight="bold" color="heroGradientStart">
        Найдено фото: {filtered.length}
      </Text>
      {photos.length === 0 && (
        <Text textAlign="center" mt={10} color="red.500">
          Нет сохраненных фото вагонов.
        </Text>
      )}
      <SimpleGrid columns={[1, 2, 3, 4]} gap={5} justifyItems="center">
        {paginated.map((photo) => (
          <Box key={photo.vagonNumber} w="250px">
            <VagonPhoto photo={photo} onDelete={handleDelete} />
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
}
