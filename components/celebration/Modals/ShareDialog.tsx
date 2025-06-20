import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface ShareProps {
    shareDialogOpen: boolean;
    setshareDialogOpen: (open: boolean) => void;
}


const ShareDialog: React.FC<ShareProps> = ({ shareDialogOpen, setshareDialogOpen }) => {

    return (
        <Dialog open={shareDialogOpen} onOpenChange={setshareDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Share
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-3 max-h-[300px] overflow-auto">
                    <p>Test Content</p>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setshareDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => setshareDialogOpen(false)}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ShareDialog