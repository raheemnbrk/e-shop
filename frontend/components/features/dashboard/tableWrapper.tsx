import { TableFilters } from "./tableFilter"
import { DataTable, Column } from "./table"

type TableSelect = {
    items: { value: string; label: string }[];
    label?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    param: string;
};

type TableWrapperProps<T extends { id: string }> = {
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
    searchPlaceholder?: string
    selects?: TableSelect[]
}

export function TableWrapper<T extends { id: string }>({
    columns,
    data,
    isLoading,
    pagination,
    onPageChange,
    searchPlaceholder,
    selects
}: TableWrapperProps<T>) {
    return (
        <div className="border border-border dark:border-dark-border rounded-xl overflow-hidden p-3 flex flex-col gap-6">
            <TableFilters
                searchPlaceholder={searchPlaceholder}
                selects={selects}
            />
            <DataTable
                columns={columns}
                data={data}
                isLoading={isLoading}
                pagination={pagination}
                onPageChange={onPageChange}
            />
        </div>
    )
}