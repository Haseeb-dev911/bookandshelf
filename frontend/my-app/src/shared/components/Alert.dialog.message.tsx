import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


interface dialogType {
    title: string;
    description: string | undefined;
    open: boolean;
    redirectTo?: string;
    actionLabel?: string;
}

export function AlertDialogComponent({
    title, description, open, redirectTo = "/login", actionLabel = "Login to continue"
}: dialogType) {
    return (
        <Dialog
            open={!!open}
        >
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="[&>button]:hidden"
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <Button type="button" className="cursor-pointer">
                        <Link className="w-full h-full text-center mt-2" to={redirectTo} replace>{actionLabel}</Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}