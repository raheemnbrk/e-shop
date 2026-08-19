"use client";

import {
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableSkeletonProps {
    columns: number;
    rows?: number;
}

export function DataTableSkeleton({
    columns,
    rows = 8,
}: DataTableSkeletonProps) {
    return (
        <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow
                    key={rowIndex}
                    className="border-border dark:border-dark-border"
                >
                    {Array.from({ length: columns }).map(
                        (_, columnIndex) => (
                            <TableCell
                                key={columnIndex}
                                className="px-5 py-4"
                            >
                                <Skeleton className="h-4 w-full rounded bg-border dark:bg-dark-border" />
                            </TableCell>
                        ),
                    )}
                </TableRow>
            ))}
        </TableBody>
    );
}