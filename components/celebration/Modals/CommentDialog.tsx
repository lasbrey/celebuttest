import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import Image from 'next/image';

interface CommentProps {
    commentDialogOpen: boolean;
    setcommentDialogOpen: (open: boolean) => void;
}

const CommentDialog: React.FC<CommentProps> = ({ commentDialogOpen, setcommentDialogOpen }) => {

    return (
        <Dialog open={commentDialogOpen} onOpenChange={setcommentDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Comments
                    </DialogTitle>
                </DialogHeader>

                <div className='gap-2 flex flex-col'>
                    <div className="flex space-x-3">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                            alt="test"

                            className="h-8 w-8 rounded-xl"
                        />
                        <div className="w-full">
                            <div className='bg-gray-100 rounded-xl p-3 w-full'>
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium text-sm">Nyero</h4>
                                    <span className="text-xs text-gray-400">1h ago</span>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">I am well fed</p>

                                <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                                    <button className="flex items-center space-x-1">
                                        <Image src="/icons/like.svg" alt="Like" width={20} height={20} />
                                        <span>0 Likes</span>
                                    </button>
                                    <button>Reply</button>
                                </div>
                            </div>
                            <div className="flex space-x-3 mt-4">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                                    alt="test"

                                    className="h-8 w-8 rounded-xl"
                                />
                                <div className="bg-gray-100 rounded-xl p-3 w-full">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-medium text-sm">Nyero</h4>
                                        <span className="text-xs text-gray-400">1m ago</span>
                                    </div>
                                    <p className="text-sm text-gray-700 mt-1">I am hungry</p>

                                    <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                                        <button className="flex items-center space-x-1">
                                            <Image src="/icons/like.svg" alt="Like" width={20} height={20} />
                                            <span>0 Likes</span>
                                        </button>
                                        <button>Reply</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setcommentDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => setcommentDialogOpen(false)}>Save</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog