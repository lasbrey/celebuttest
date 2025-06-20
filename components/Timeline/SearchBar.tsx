import React from 'react'
import { Edit3Icon } from "lucide-react";
import Image from 'next/image';

const SearchBar = () => {
    return (
        <div className="flex items-center justify-between bg-white border-b">
            <div className="flex flex-row gap-10 lg:max-w-2xl mx-auto py-4 w-full ">

                <div className="flex items-center w-full max-w-md bg-white border border-primary/50 rounded-full px-4 py-2 shadow-sm">
                    <input
                        type="text"
                        placeholder="Search for friends, family, fans and followers"
                        className="flex-1 outline-none bg-transparent text-sm"
                    />
                    <svg
                        className="w-5 h-5 text-primary mr-2 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
                    </svg>
                </div>
                {/* Add Post Button */}
                <button className="ml-4 cursor-pointer hover:bg-primary/20 border border-primary text-primary px-4 py-2 rounded-full font-medium flex items-center gap-2 transition">
                    Speak To <Image src="/icons/Edit.svg" alt="Like" width={20} height={20} />
                </button>
            </div>
        </div>
    )
}

export default SearchBar