"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, File, Folder, MoreHorizontalIcon, PlusIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ConfirmationDialog } from "@/components/features/layout/confirmationButton"
import { Category } from "@/types/categoryTypes"
import { useGetCategories } from "@/lib/hooks/categories/useGetCategories"
import { CategoryDialog } from "@/components/features/dashboard/admin/addCategoryDialog"
import { CategorySkeleton } from "@/components/loading/categorySkeleton"
import { useDeleteCategory } from "@/lib/hooks/categories/useDeleteCategory"

function CategoryActions({
    deleting,
    onDelete,
    onAddSubcategory,
    onEdit,
}: {
    deleting: boolean
    onDelete: () => void
    onAddSubcategory: () => void
    onEdit: () => void
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-background hover:text-primary dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-primary"
                >
                    <MoreHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open category actions</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 bg-card dark:border-dark-border dark:bg-dark-card">
                <DropdownMenuItem
                    className="cursor-pointer text-text dark:text-dark-text data-highlighted:bg-primary data-highlighted:text-white"
                    onSelect={(e) => e.preventDefault()}
                    onClick={onAddSubcategory}
                >
                    Add subcategory
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer text-text dark:text-dark-text data-highlighted:bg-primary data-highlighted:text-white"
                    onSelect={(e) => e.preventDefault()}
                    onClick={onEdit}
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border dark:bg-dark-border" />
                <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                >
                    <ConfirmationDialog
                        title="Delete category?"
                        description="This will permanently delete this category and its related data. This action cannot be undone."
                        actionText="Delete category"
                        onConfirm={onDelete}
                        trigger={
                            <button type="button" disabled={deleting} className="w-full cursor-pointer text-left">
                                Delete
                            </button>
                        }
                    />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default function CategoriesPage() {
    const { data: categories, isLoading } = useGetCategories()
    const [expandedCategories, setExpandedCategories] = useState<string[]>([])
    const { deleteCategory, isPending: deleting } = useDeleteCategory()
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [selectedParentId, setSelectedParentId] = useState<string | null>(null)

    const toggleCategory = (id: string) => {
        setExpandedCategories((current) =>
            current.includes(id)
                ? current.filter((categoryId) => categoryId !== id)
                : [...current, id]
        )
    }

    const isExpanded = (id: string) => expandedCategories.includes(id)

    if (isLoading) return <CategorySkeleton />

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-text dark:text-dark-text md:text-2xl">
                        Categories
                    </h1>
                    <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                        Manage all categories across the platform
                    </p>
                </div>
                <button
                    onClick={() => {
                        setSelectedCategory(null)
                        setSelectedParentId(null)
                        setCategoryDialogOpen(true)
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primaryHover"
                >
                    <PlusIcon className="h-4 w-4" />
                    Add Category
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card dark:border-dark-border dark:bg-dark-card">
                <div className="divide-y divide-border dark:divide-dark-border">
                    {categories?.map((category: Category) => {
                        const expanded = isExpanded(category.id)
                        const hasChildren = category.children && category.children.length > 0

                        return (
                            <div key={category.id}>
                                <div className="flex min-h-16 items-center gap-3 px-4 py-3 transition-colors hover:bg-background/60 dark:hover:bg-dark-background/60 md:px-5">
                                    <button
                                        onClick={() => toggleCategory(category.id)}
                                        disabled={!hasChildren}
                                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors ${hasChildren
                                            ? "cursor-pointer text-text-secondary hover:bg-background hover:text-primary dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-primary"
                                            : "cursor-default text-transparent"
                                            }`}
                                    >
                                        {expanded
                                            ? <ChevronDown className="h-4 w-4" />
                                            : <ChevronRight className="h-4 w-4" />
                                        }
                                    </button>

                                    <Folder className="h-5 w-5 shrink-0 text-primary" />

                                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-border bg-background dark:border-dark-border dark:bg-dark-background">
                                        {category.image ? (
                                            <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-text-secondary dark:text-dark-text-secondary">
                                                {category.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex min-w-0 items-center gap-2">
                                            <span className="truncate text-sm font-semibold text-text dark:text-dark-text">
                                                {category.name}
                                            </span>
                                            <span className="hidden truncate text-xs text-text-secondary dark:text-dark-text-secondary sm:block">
                                                /{category.slug}
                                            </span>
                                        </div>
                                    </div>

                                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                                        {category.productCount ?? 0} products
                                    </span>

                                    <CategoryActions
                                        deleting={deleting}
                                        onDelete={() => deleteCategory(category.id)}
                                        onAddSubcategory={() => {
                                            setSelectedCategory(null)
                                            setSelectedParentId(category.id)
                                            setCategoryDialogOpen(true)
                                        }}
                                        onEdit={() => {
                                            setSelectedCategory(category)
                                            setSelectedParentId(null)
                                            setCategoryDialogOpen(true)
                                        }}
                                    />
                                </div>

                                <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    }`}>
                                    <div className="overflow-hidden">
                                        <div className="ml-10 border-l border-border dark:border-dark-border md:ml-14">
                                            {category.children?.map((child) => (
                                                <div
                                                    key={child.id}
                                                    className="relative flex min-h-14 items-center gap-3 border-t border-border px-4 py-2 pl-5 transition-colors hover:bg-background/60 dark:border-dark-border dark:hover:bg-dark-background/60 md:pl-6"
                                                >
                                                    <span className="absolute -left-px top-1/2 h-px w-3 bg-border dark:bg-dark-border" />

                                                    <File className="h-4 w-4 shrink-0 text-text-secondary dark:text-dark-text-secondary" />

                                                    <div className="h-6 w-6 shrink-0 overflow-hidden rounded-lg border border-border bg-background dark:border-dark-border dark:bg-dark-background">
                                                        {child.image ? (
                                                            <img src={child.image} alt={child.name} className="h-full w-full object-cover" />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-text-secondary dark:text-dark-text-secondary">
                                                                {child.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex min-w-0 items-center gap-2">
                                                            <span className="truncate text-sm font-medium text-text dark:text-dark-text">
                                                                {child.name}
                                                            </span>
                                                            <span className="hidden truncate text-xs text-text-secondary dark:text-dark-text-secondary sm:block">
                                                                /{child.slug}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                                                        {child.productCount ?? 0} products
                                                    </span>

                                                    <CategoryActions
                                                        deleting={deleting}
                                                        onDelete={() => deleteCategory(child.id)}
                                                        onAddSubcategory={() => {
                                                            setSelectedCategory(null)
                                                            setSelectedParentId(child.id)
                                                            setCategoryDialogOpen(true)
                                                        }}
                                                        onEdit={() => {
                                                            setSelectedCategory(child)
                                                            setSelectedParentId(null)
                                                            setCategoryDialogOpen(true)
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <CategoryDialog
                open={categoryDialogOpen}
                onOpenChange={setCategoryDialogOpen}
                category={selectedCategory}
                parentId={selectedParentId}
            />
        </div>
    )
}