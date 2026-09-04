"use client";

import { DatePickerInput } from "@/components/ui/date-picker";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

export function DateFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const fromDate = from
        ? new Date(`${from}T00:00:00`)
        : undefined;

    const toDate = to
        ? new Date(`${to}T00:00:00`)
        : undefined;

    const updateParams = (
        param: "from" | "to",
        date: Date | undefined,
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (!date) {
            params.delete(param);
        } else {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            params.set(param, `${year}-${month}-${day}`);
        }

        params.delete("page");

        const query = params.toString();

        router.push(
            query ? `${pathname}?${query}` : pathname
        );
    };

    return (
        <div className="flex items-center gap-3">
            <DatePickerInput
                label="From"
                value={fromDate}
                placeholder="Select start date"
                onChange={(date) => updateParams("from", date)}
            />

            <DatePickerInput
                label="To"
                value={toDate}
                placeholder="Select end date"
                onChange={(date) => updateParams("to", date)}
            />
        </div>
    );
}