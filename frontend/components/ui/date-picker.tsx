"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type DatePickerInputProps = {
    label?: string
    value?: Date
    onChange?: (date: Date | undefined) => void
    placeholder?: string
}

function formatDate(date: Date | undefined) {
    if (!date) return ""

    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

function isValidDate(date: Date) {
    return !isNaN(date.getTime())
}

export function DatePickerInput({
    label = "Date",
    value,
    onChange,
    placeholder = "Select date",
}: DatePickerInputProps) {
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(value)
    const [inputValue, setInputValue] = React.useState(formatDate(value))

    React.useEffect(() => {
        setInputValue(formatDate(value))
        setMonth(value)
    }, [value])

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-text dark:text-dark-text">
                {label}
            </label>

            <InputGroup className="rounded-md border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 dark:border-dark-border">
                <InputGroupInput
                    value={inputValue}
                    placeholder={placeholder}
                    onChange={(e) => {
                        const value = e.target.value
                        setInputValue(value)
                        const parsedDate = new Date(value)
                        if (isValidDate(parsedDate)) {
                            onChange?.(parsedDate)
                            setMonth(parsedDate)
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                    className="rounded-l-md border-0 bg-background px-3 py-2 text-text placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-0 dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary"
                />

                <InputGroupAddon align="inline-end" className="rounded-r-md">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <InputGroupButton
                                id="date-picker"
                                variant="ghost"
                                size="icon-xs"
                                aria-label="Select date"
                                className="cursor-pointer rounded-r-md border-0 bg-background px-3 py-2 hover:bg-background focus-visible:outline-none focus-visible:ring-0 dark:bg-dark-background dark:hover:bg-dark-background"
                            >
                                <CalendarIcon className="h-4 w-4 text-text-secondary dark:text-dark-text-secondary" />
                                <span className="sr-only">
                                    Select date
                                </span>
                            </InputGroupButton>
                        </PopoverTrigger>

                        <PopoverContent
                            className="w-auto overflow-hidden rounded-md bg-card p-0 dark:bg-dark-card"
                            align="end"
                            alignOffset={-8}
                            sideOffset={10}
                        >
                            <Calendar
                                mode="single"
                                selected={value}
                                month={month}
                                onMonthChange={setMonth}
                                onSelect={(date) => {
                                    onChange?.(date)
                                    setInputValue(formatDate(date))
                                    setOpen(false)
                                }}
                                className="rounded-md"
                                modifiersClassNames={{
                                    selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
                                    today: "bg-primary/10 text-primary font-semibold",
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}