'use client';

import React from 'react';
import { MoreVertical, Image as ImageIcon, Bookmark, SendHorizonal } from "lucide-react";
import Image from 'next/image';

const Posts = () => {
    return (
        <div className="space-y-6 py-4">
            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4">
                    <div className='flex justify-between'>
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                                alt="User"
                                className="h-10 w-10 rounded-md border-2 border-primary"
                            />
                            <div>
                                <h3 className="font-semibold">Cameron Williamson</h3>
                                <p className="text-sm text-gray-500">23 Aug at 4:21 PM</p>
                            </div>
                        </div>
                        <button className="ml-auto">
                            <MoreVertical className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>

                    <p className="mt-4 text-gray-600">
                        Here are some designs I’ve been working on!
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-2">
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                            alt="Post"
                            className="rounded-xl w-full"
                        />
                    </div>

                    {/* Replaced icons */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center space-x-10">
                            <button className="flex items-center space-x-2 text-gray-500">
                                <Image src="/icons/like.svg" alt="Like" width={20} height={20} />
                                <span>30</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500">
                                <Image src="/icons/comment.svg" alt="Comment" width={20} height={20} />
                                <span>12 Comments</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500">
                                <Image src="/icons/share.svg" alt="Share" width={20} height={20} />
                                <span>5 Shares</span>
                            </button>
                        </div>
                        <button className="flex items-center space-x-2 text-gray-500">
                            <Bookmark className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Comment Input */}
                <div className="p-4 border-t bg-gray-50 rounded-b-xl">
                    <div className="flex items-center space-x-3">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                            alt="User"
                            className="h-8 w-8 rounded-xl"
                        />
                        <div className="flex-1 flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Write your comment..."
                                className="flex-1 bg-white border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button className="p-2 hover:bg-gray-100 rounded-xl">
                                <ImageIcon className="h-5 w-5 text-gray-500" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-xl">
                                <SendHorizonal className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;