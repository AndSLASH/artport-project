import React from "react";
import { HStack, IconButton, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type PaginationProps = {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
};

const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  if (pageCount <= 1) return null;

  // Параметри для скороченої пагінації
  const siblingCount = 1; // кількість сусідніх сторінок
  const boundaryCount = 1; // кількість сторінок на початку/кінці

  const range: (number | string)[] = [];
  const showDots = pageCount > 7;

  if (!showDots) {
    for (let i = 0; i < pageCount; i++) range.push(i);
  } else {
    const leftSibling = Math.max(currentPage - siblingCount, boundaryCount);
    const rightSibling = Math.min(
      currentPage + siblingCount,
      pageCount - boundaryCount - 1
    );

    // Початок
    for (let i = 0; i < boundaryCount; i++) range.push(i);
    // ...
    if (leftSibling > boundaryCount) range.push("start-ellipsis");
    // Середина
    for (let i = leftSibling; i <= rightSibling; i++) range.push(i);
    // ...
    if (rightSibling < pageCount - boundaryCount - 1)
      range.push("end-ellipsis");
    // Кінець
    for (let i = pageCount - boundaryCount; i < pageCount; i++) range.push(i);
  }

  return (
    <HStack justify="center" spacing={2}>
      <IconButton
        aria-label="Prev"
        icon={<ChevronLeftIcon />}
        variant="ghost"
        isDisabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {range.map((item, idx) => {
        if (item === "start-ellipsis" || item === "end-ellipsis") {
          return (
            <Button key={item + "" + idx} variant="ghost" isDisabled>
              ...
            </Button>
          );
        }
        return (
          <Button
            key={item}
            variant={item === currentPage ? "solid" : "ghost"}
            color={item === currentPage ? "heroGradientStart" : "text"}
            fontWeight={item === currentPage ? "bold" : "normal"}
            fontSize={item === currentPage ? "lg" : "md"}
            _hover={{ color: "heroGradientEnd" }}
            onClick={() => onPageChange(item as number)}
          >
            {(item as number) + 1}
          </Button>
        );
      })}
      <IconButton
        aria-label="Next"
        icon={<ChevronRightIcon />}
        variant="ghost"
        isDisabled={currentPage === pageCount - 1}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </HStack>
  );
};

export default Pagination;
