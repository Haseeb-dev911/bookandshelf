import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface dialogType {
    title: string,
    description: string | undefined,
    open: boolean,
    onclose: () => void
}

export function DialogComponent({ title, description, open, onclose }: dialogType) {
    return (
        <Dialog
            open={!!open}
            onOpenChange={(isOpen: boolean) => { if (!isOpen) onclose(); }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" className="cursor-pointer" onClick={onclose}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}