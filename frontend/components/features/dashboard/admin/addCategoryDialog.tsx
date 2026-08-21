"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2, Upload } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { addCategorySchema } from "@/lib/validators/categorySchema";
import { useAddCategory } from "@/lib/hooks/categories/useAddCategory";
import { useUpdateCategory } from "@/lib/hooks/categories/useUpdateCategory";
import { addCategoryInput, Category } from "@/types/categoryTypes";

interface CategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: Category | null;
    parentId?: string | null;
}

export function CategoryDialog({
    open,
    onOpenChange,
    category,
    parentId,
}: CategoryDialogProps) {
    const { addCategory, isPending: isAdding } = useAddCategory();
    const { updateCategory, isPending: isUpdating } = useUpdateCategory();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | undefined>();
    const [preview, setPreview] = useState<string | null>(null);

    const isEditing = !!category;
    const isPending = isAdding || isUpdating;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<addCategoryInput>({
        resolver: zodResolver(addCategorySchema),
        defaultValues: {
            name: "",
            parentId: parentId ?? undefined,
        },
    });

    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
                parentId: category.parentId ?? undefined,
            });

            setPreview(category.image ?? null);
        } else {
            reset({
                name: "",
                parentId: parentId ?? undefined,
            });

            setPreview(null);
        }

        setFile(undefined);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [category, parentId, reset]);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        setFile(selectedFile);

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    };

    const handleChooseImage = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = (data: addCategoryInput) => {
        if (isEditing && category) {
            updateCategory(
                {
                    id: category.id,
                    input: data,
                    file: file as File,
                },
                {
                    onSuccess: () => {
                        reset();
                        setFile(undefined);
                        setPreview(null);
                        onOpenChange(false);
                    },
                },
            );

            return;
        }

        if (!file) return;

        addCategory(
            {
                input: data,
                file,
            },
            {
                onSuccess: () => {
                    reset();
                    setFile(undefined);
                    setPreview(null);
                    onOpenChange(false);
                },
            },
        );
    };

    const handleClose = () => {
        if (isPending) return;

        reset();
        setFile(undefined);
        setPreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="border-border bg-card text-text dark:border-dark-border dark:bg-dark-card dark:text-dark-text sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-text dark:text-dark-text">
                        {isEditing ? "Edit category" : "Add category"}
                    </DialogTitle>

                    <DialogDescription className="text-text-secondary dark:text-dark-text-secondary">
                        {isEditing
                            ? "Update the category information."
                            : parentId
                                ? "Create a new subcategory."
                                : "Create a new root category."}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium text-text dark:text-dark-text">
                            Category image
                        </label>

                        <div className="flex items-center gap-5">
                            <div className="relative h-24 w-24 shrink-0">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Category preview"
                                        className="h-24 w-24 rounded-2xl border border-border object-cover dark:border-dark-border"
                                    />
                                ) : (
                                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-dashed border-border bg-background dark:border-dark-border dark:bg-dark-background">
                                        <Upload className="h-8 w-8 text-text-secondary dark:text-dark-text-secondary" />
                                    </div>
                                )}

                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={handleChooseImage}
                                    className="absolute bottom-1 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Camera className="h-4 w-4" />
                                </button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleFileChange}
                                    disabled={isPending}
                                    className="hidden"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-text dark:text-dark-text">
                                    Upload category image
                                </p>

                                <p className="mt-1 text-xs leading-5 text-text-secondary dark:text-dark-text-secondary">
                                    PNG, JPG or WEBP
                                    <br />
                                    Recommended size: 500 × 500px
                                </p>

                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={handleChooseImage}
                                    className="mt-2 cursor-pointer text-sm font-medium text-primary transition hover:text-primaryHover disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Choose image
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-text dark:text-dark-text">
                            Category name
                        </label>

                        <Input
                            {...register("name")}
                            placeholder="e.g. Electronics"
                            disabled={isPending}
                            className="border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary"
                        />

                        {errors.name && (
                            <p className="mt-1.5 text-xs text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="border-t border-border pt-5 dark:border-dark-border">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isPending}
                            className="cursor-pointer bg-primary text-white hover:bg-primaryHover disabled:cursor-not-allowed"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isPending || (!isEditing && !file)}
                            className="cursor-pointer bg-primary text-white hover:bg-primaryHover disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}

                            {isPending
                                ? isEditing
                                    ? "Updating..."
                                    : "Adding..."
                                : isEditing
                                    ? "Update category"
                                    : "Add category"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}