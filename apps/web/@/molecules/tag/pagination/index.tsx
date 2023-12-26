import React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface TagPaginationProps {
  totalPages: number
  currentPage?: number
}

const TagPagination: React.FC<TagPaginationProps> = ({ totalPages, currentPage }) => {
  const handlePageChange = (page: number) => {
    // TODO
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationPrevious href="#" />
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationLink
            key={i}
            href="#"
            // onClick={() => handlePageChange(i + 1)}
            isActive={i + 1 === Number(currentPage)}
          >
            {i + 1}
          </PaginationLink>
        ))}
        <PaginationNext href="#" />
      </PaginationContent>
    </Pagination>
  )
}

export default TagPagination
