import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface CashGiftProps {
    celebrateDialogOpen: boolean;
    setcelebrateDialogOpen: (open: boolean) => void;
}

const CashGift: React.FC<CashGiftProps> = ({ celebrateDialogOpen, setcelebrateDialogOpen }) => {

    return (
        <Dialog open={celebrateDialogOpen} onOpenChange={setcelebrateDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Celebrate with Cash Gift
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-3 max-h-[200px] overflow-auto">
                    <p className='font-thin'>Send a gift to celebrate Sophia's special day.</p>
                </div>
                <div>
                    <h5 className='font-bold '>Gift Amount</h5>
                </div>
                <div className='grid grid-cols-3 justify-center items-center gap-5'>
                    <div className='justify-center text-center cursor-pointer hover:bg-primary bg-[#F5F0F2] rounded-md p-2'>$5</div>
                    <div className='justify-center text-center cursor-pointer hover:bg-primary bg-[#F5F0F2] rounded-md p-2'>$10</div>
                    <div className='justify-center text-center cursor-pointer hover:bg-primary bg-[#F5F0F2] rounded-md p-2'>$15</div>
                    <div className='justify-center text-center cursor-pointer hover:bg-primary bg-[#F5F0F2] rounded-md p-2'>$20</div>
                    <div className='justify-center text-center cursor-pointer hover:bg-primary bg-[#F5F0F2] rounded-md p-2'>$25</div>
                    <div className='justify-center text-center cursor-pointer hover:bg-primary bg-[#F5F0F2] rounded-md p-2'>$30</div>
                </div>

                <div>
                    <Input placeholder='Custom Amount' className='bg-[#F5F0F2] border-none' />
                    <p className='py-4 text-sm font-extralight'>Join others in celebrating Sophia's special day with a cash gift.
                        Your contribution will add to the joy of her birthday.
                    </p>
                </div>
                <div className='flex justify-between'>
                    <p>Send Annonymously</p>
                    <Switch />
                </div>
                <div className='bg-primary text-center py-2 rounded-md text-white' onClick={() => setcelebrateDialogOpen(false)}>
                    <p>Send Gift</p>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default CashGift