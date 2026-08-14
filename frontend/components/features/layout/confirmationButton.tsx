import { Trash2Icon } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
    title: string;
    description: string;
    actionText?: string;
    cancelText?: string;
    onConfirm: () => void;
    triggerText?: string;
    trigger?: React.ReactNode;
}

export function ConfirmationDialog({
    title,
    description,
    actionText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    triggerText = "Delete",
    trigger,
}: ConfirmationDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger ?? (
                    <Button variant="destructive" className="cursor-pointer">
                        <Trash2Icon />
                        {triggerText}
                    </Button>
                )}
            </AlertDialogTrigger>

            <AlertDialogContent size="sm" className="bg-card text-text dark:bg-dark-card dark:text-dark-text">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>

                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline" className="cursor-pointer" >
                        {cancelText}
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={onConfirm}
                    >
                        {actionText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}