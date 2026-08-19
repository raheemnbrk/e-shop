"use client"

import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useDebounce } from "use-debounce"
import { useEffect, useState } from "react"
import { SelectDemo } from "../layout/select"

type SelectItem = {
    value: string
    label: string
}

type TableFiltersProps = {
    searchPlaceholder?: string
    selectItems?: SelectItem[]
    selectLabel?: string
}

export function TableFilters({
    searchPlaceholder = "Search...",
    selectItems,
    selectLabel = "Filter by",
}: TableFiltersProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState(searchParams.get("search") ?? "")
    const [debouncedSearch] = useDebounce(search, 400)

    const hasFilters = !!searchParams.get("search") || !!searchParams.get("filter")

    const updateParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString())
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "") {
                params.delete(key)
            } else {
                params.set(key, value)
            }
        })
        params.delete("page")
        router.push(`${pathname}?${params.toString()}`)
    }

    useEffect(() => {
        updateParams({ search: debouncedSearch })
    }, [debouncedSearch])

    const handleFilter = (value: string) => {
        updateParams({ filter: value })
    }

    const handleClear = () => {
        setSearch("")
        router.push(pathname)
    }

    return (
        <div className="flex items-center gap-3">
            <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 bg-card focus-visible:ring-primary focus-visible:border-primary"
            />

            {selectItems && (
                <SelectDemo
                    key={searchParams.get("filter") ?? selectItems[0].value}
                    items={selectItems}
                    defaultValue={searchParams.get("filter") ?? selectItems[0].value}
                    label={selectLabel}
                    onchange={handleFilter}
                />
            )}

            {hasFilters && (
                <button
                    onClick={handleClear}
                    className="flex items-center gap-2 h-10 px-5 py-2 rounded-lg border border-red-200 dark:border-red-900 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition cursor-pointer"
                >
                    <X className="h-4 w-4" />
                    Clear
                </button>
            )}
        </div>
    )
}