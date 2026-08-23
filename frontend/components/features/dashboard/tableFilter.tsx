"use client";

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    useRouter,
    useSearchParams,
    usePathname,
} from "next/navigation";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { SelectDemo } from "../layout/select";

type SelectItem = {
    value: string;
    label: string;
};

type TableSelect = {
    items: SelectItem[];
    label?: string;
    param: string;
    defaultValue?: string;
};

type TableFiltersProps = {
    searchPlaceholder?: string;
    selects?: TableSelect[];
};

export function TableFilters({
    searchPlaceholder = "Search...",
    selects = [],
}: TableFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(
        searchParams.get("search") ?? ""
    );

    const [debouncedSearch] = useDebounce(search, 400);

    const hasFilters =
        !!searchParams.get("search") ||
        selects.some((select) =>
            Boolean(searchParams.get(select.param))
        );

    const updateParams = (
        updates: Record<string, string | null>
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        params.delete("page");

        const query = params.toString();

        router.push(
            query ? `${pathname}?${query}` : pathname
        );
    };

    useEffect(() => {
        updateParams({
            search: debouncedSearch,
        });
    }, [debouncedSearch]);

    const handleFilter = (
        param: string,
        value: string
    ) => {
        updateParams({
            [param]: value === "ALL" || value === "all" ? null : value,
        });
    };

    const handleClear = () => {
        setSearch("");
        router.push(pathname);
    };

    return (
        <div className="flex items-center gap-3 overflow-auto">
            <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="focus-visible:ring-primary focus-visible:border-primary h-10 bg-card dark:bg-dark-card min-w-48"
            />

            {selects.map((select) => {
                const currentValue =
                    searchParams.get(select.param) ??
                    select.defaultValue ??
                    select.items[0]?.value;

                return (
                    <SelectDemo
                        key={select.param}
                        items={select.items}
                        defaultValue={currentValue}
                        label={select.label}
                        onchange={(value) =>
                            handleFilter(
                                select.param,
                                value
                            )
                        }
                    />
                );
            })}

            {hasFilters && (
                <button
                    onClick={handleClear}
                    className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-red-200 px-5 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                >
                    <X className="h-4 w-4" />
                    Clear
                </button>
            )}
        </div>
    );
}