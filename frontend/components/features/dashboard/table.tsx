"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"

export type Column<T> = {
    key: keyof T | string
    label: string
    className?: string
    render?: (row: T) => React.ReactNode
}

type DataTableProps<T> = {
    columns: Column<T>[]
    data: T[]
    isLoading?: boolean
    pagination?: {
        currentPage: number
        totalPages: number
        hasNextPage: boolean
        hasPreviousPage: boolean
    }
    onPageChange?: (page: number) => void
}

export function DataTable<T extends { id: string }>({
    columns,
    data,
    isLoading,
    pagination,
    onPageChange,
}: DataTableProps<T>) {
    const getPaginationPages = (current: number, total: number) => {
        if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
        if (current <= 3) return [1, 2, 3, 4, "...", total]
        if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total]
        return [1, "...", current - 1, current, current + 1, "...", total]
    }

    return (
        <div className="border border-border dark:border-dark-border rounded-md overflow-hidden ">
            <Table className="dark:text-dark-text-secondary" >
                <TableHeader>
                    <TableRow className="bg-card dark:bg-dark-primary">
                        {columns.map((col) => (
                            <TableHead
                                key={String(col.key)}
                                className={col.className}
                            >
                                {col.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <TableRow key={i}>
                                {columns.map((col) => (
                                    <TableCell key={String(col.key)}>
                                        <Skeleton className="h-4 w-full rounded bg-card dark:bg-dark-card" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center py-16 text-text-secondary text-sm"
                            >
                                No results found
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((col) => (
                                    <TableCell key={String(col.key)} className={col.className}>
                                        {col.render
                                            ? col.render(row)
                                            : String(row[col.key as keyof T] ?? "")}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {pagination && pagination.totalPages > 1 && (
                <div className="border-t border-border px-4 py-3">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        pagination.hasPreviousPage &&
                                        onPageChange?.(pagination.currentPage - 1)
                                    }
                                    className={
                                        !pagination.hasPreviousPage
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>

                            {getPaginationPages(
                                pagination.currentPage,
                                pagination.totalPages
                            ).map((page, i) =>
                                page === "..." ? (
                                    <PaginationItem key={`ellipsis-${i}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                ) : (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            isActive={page === pagination.currentPage}
                                            onClick={() => onPageChange?.(page as number)}
                                            className="cursor-pointer"
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        pagination.hasNextPage &&
                                        onPageChange?.(pagination.currentPage + 1)
                                    }
                                    className={
                                        !pagination.hasNextPage
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}