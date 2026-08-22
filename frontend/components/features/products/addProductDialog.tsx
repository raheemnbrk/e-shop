"use client"

import { useEffect, useState } from "react"
import { X, ImagePlus } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SelectDemo } from "@/components/features/layout/select"
import { useCreateProduct } from "@/lib/hooks/seller/useCreateProduct"
import { useUpdateProduct } from "@/lib/hooks/seller/useUpdateProduct"
import { useGetCategories } from "@/lib/hooks/categories/useGetCategories"
import { createProductSchema } from "@/lib/validators/seller.schema"

const productFormSchema = createProductSchema.extend({
    discount: z.coerce.number().optional(),
})

type ProductDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    product?: any | null
}

export function ProductDialog({ open, onOpenChange, product }: ProductDialogProps) {
    const isEdit = !!product
    const { data: categories, isLoading: categoriesLoading } = useGetCategories()
    const { createProduct, isPending: creating } = useCreateProduct()
    const { updateProduct, isPending: updating } = useUpdateProduct()
    const isPending = creating || updating

    const [images, setImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<z.input<typeof productFormSchema>, any, z.output<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 1,
            categoryId: "",
            available: true,
            discount: 0,
        },
    })

    const categoryId = watch("categoryId")

    useEffect(() => {
        if (!open) return

        if (product) {
            reset({
                name: product.name ?? "",
                description: product.description ?? "",
                price: product.price ?? 0,
                stock: product.stock ?? 1,
                categoryId: product.categoryId ?? "",
                available: product.available ?? true,
                discount: product.discount ?? 0,
            })
            if (product.images?.length) {
                setImagePreviews(product.images)
            } else if (product.image) {
                setImagePreviews([product.image])
            }
            setImages([])
        } else {
            reset({
                name: "",
                description: "",
                price: 0,
                stock: 1,
                categoryId: "",
                available: true,
                discount: 0,
            })
            setImages([])
            setImagePreviews([])
        }
    }, [open, product, reset])

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? [])
        if (!files.length) return
        const newFiles = files.slice(0, 5 - images.length)
        setImages((prev) => [...prev, ...newFiles])
        setImagePreviews((prev) => [...prev, ...newFiles.map((f) => URL.createObjectURL(f))])
        e.target.value = ""
    }

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
        setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    }

    const onSubmit = async (values: z.output<typeof productFormSchema>) => {
        if (isEdit) {
            updateProduct(
                {
                    id: product.id,
                    input: {
                        name: values.name,
                        description: values.description,
                        price: values.price,
                        stock: values.stock,
                        categoryId: values.categoryId,
                        available: values.available,
                        discount: values.discount ?? 0,
                    },
                    files: images,
                },
                { onSuccess: () => onOpenChange(false) }
            )
        } else {
            createProduct(
                {
                    input: {
                        name: values.name,
                        description: values.description,
                        price: values.price,
                        stock: values.stock,
                        categoryId: values.categoryId,
                        available: values.available,
                    },
                    files: images,
                },
                { onSuccess: () => onOpenChange(false) }
            )
        }
    }

    const categoryItems = categories?.map((c) => ({ value: c.id, label: c.name })) ?? []

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto bg-card dark:bg-dark-card sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl text-text dark:text-dark-text">
                        {isEdit ? "Edit Product" : "Add Product"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text dark:text-dark-text">
                            Product Images
                        </label>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 mt-2">
                            {imagePreviews.map((preview, index) => (
                                <div
                                    key={`${preview}-${index}`}
                                    className="relative aspect-square overflow-hidden rounded-lg border border-border dark:border-dark-border"
                                >
                                    <img src={preview} alt={`Product image ${index + 1}`} className="h-full w-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute right-1 top-1 cursor-pointer flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-500"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ))}
                            {imagePreviews.length < 5 && (
                                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border text-text-secondary transition hover:border-primary hover:text-primary dark:border-dark-border dark:text-dark-text-secondary">
                                    <ImagePlus className="h-6 w-6" />
                                    <span className="mt-1 text-xs">Add image</span>
                                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImagesChange} />
                                </label>
                            )}
                        </div>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                            Upload 1–5 images.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text dark:text-dark-text">Product Name</label>
                        <Input {...register("name")} placeholder="Enter product name" className="border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary mt-2" />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text dark:text-dark-text">Description</label>
                        <Textarea {...register("description")} placeholder="Enter product description" rows={4} className="border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary mt-2" />
                        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text dark:text-dark-text">Price</label>
                            <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} placeholder="0.00" className="border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary mt-2" />
                            {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text dark:text-dark-text">Stock</label>
                            <Input type="number" {...register("stock", { valueAsNumber: true })} placeholder="0" className="border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary mt-2" />
                            {errors.stock && <p className="text-xs text-red-500">{errors.stock.message}</p>}
                        </div>
                    </div>


                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text dark:text-dark-text">Category</label>
                        <SelectDemo
                            items={categoryItems}
                            label={categoriesLoading ? "Loading categories..." : "Select category"}
                            defaultValue={categoryId}
                            onchange={(value) => setValue("categoryId", value, { shouldValidate: true })}
                        />
                        {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text dark:text-dark-text mb-3">Availability</label>
                        <SelectDemo
                            items={[
                                { value: "true", label: "Available" },
                                { value: "false", label: "Not available" },
                            ]}
                            label="Availability"
                            defaultValue={String(watch("available") ?? true)}
                            onchange={(value) => setValue("available", value === "true", { shouldValidate: true })}
                        />
                    </div>

                    {isEdit && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text dark:text-dark-text">Discount (%)</label>
                            <Input
                                type="number"
                                min={0}
                                max={90}
                                {...register("discount", { valueAsNumber: true })}
                                placeholder="0"
                                className="mt-3 border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary"
                            />

                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                Maximum discount is 90%.
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 border-t border-border pt-5 dark:border-dark-border">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending || categoriesLoading}
                            className="cursor-pointer bg-primary hover:bg-primaryHover text-white"
                        >
                            {isPending ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}