'use client';

import React, { useState } from 'react';
import { MoreVertical, Image as ImageIcon, Bookmark, SendHorizonal, ThumbsUp, Smile } from "lucide-react";
import Image from 'next/image';
import mockPosts from "@/data/posts.json";


const Posts = () => {
    const [menuOpenPostId, setMenuOpenPostId] = useState<number | null>(null);
    const [expandedComments, setExpandedComments] = useState<number[]>([]);
    const [likes, setLikes] = useState<{ [key: number]: number }>({});
    const [showReplyInput, setShowReplyInput] = useState<{ [key: number]: boolean }>({});

    const toggleMenu = (postId: number) => {
        setMenuOpenPostId(prev => (prev === postId ? null : postId));
    };

    const toggleComments = (postId: number) => {
        setExpandedComments(prev =>
            prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
        );
    };

    const toggleLike = (commentId: number) => {
        setLikes(prev => ({
            ...prev,
            [commentId]: (prev[commentId] || 0) + 1
        }));
    };

    const toggleReplyInput = (commentId: number) => {
        setShowReplyInput(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    return (
        <div className="space-y-2">
            {mockPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm">
                    <div className="">
                        <div className="flex justify-between relative border-b p-4">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={post.author.avatar}
                                    alt="User"
                                    className="h-10 w-10 rounded-xl border-2 border-primary"
                                />
                                <div>
                                    <h3 className="font-semibold">{post.author.name}</h3>
                                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                                </div>
                            </div>

                            <div className="relative ml-auto">
                                <button onClick={() => toggleMenu(post.id)}>
                                    <MoreVertical className="h-5 w-5 text-gray-400" />
                                </button>
                                {menuOpenPostId === post.id && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border">
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                            onClick={() => setMenuOpenPostId(null)}
                                        >
                                            Not Interested
                                        </button>
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                            onClick={() => setMenuOpenPostId(null)}
                                        >
                                            Report Post
                                        </button>
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                            onClick={() => {
                                                navigator.clipboard.writeText(window.location.href + `/posts/${post.id}`);
                                                setMenuOpenPostId(null);
                                            }}
                                        >
                                            Copy Link
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="mt-4 text-gray-600 px-4">{post.content}</p>

                        {post.media.length > 0 && (
                            <div className="mt-4 grid grid-cols-1 gap-2 px-4">
                                {post.media.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt="Post media"
                                        className="rounded-xl w-full"
                                    />
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 p-4">
                            <div className="flex items-center space-x-10">
                                <button className="flex items-center space-x-2 text-gray-500">
                                    <Image src="/icons/like.svg" alt="Like" width={20} height={20} />
                                    <span>{post.comments.length}</span>
                                </button>
                                <button
                                    className="flex items-center space-x-2 text-gray-500"
                                    onClick={() => toggleComments(post.id)}
                                >
                                    <Image src="/icons/comment.svg" alt="Comment" width={20} height={20} />
                                    <span>{post.comments.length} Comments</span>
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

                    {expandedComments.includes(post.id) && (
                        <div className="px-4 pb-4 space-y-4">
                            {post.comments.map((comment) => (
                                <div key={comment.id} className="flex space-x-3">
                                    <img
                                        src={comment.author.avatar}
                                        alt={comment.author.name}
                                        className="h-8 w-8 rounded-xl"
                                    />
                                    <div className="bg-gray-100 rounded-xl p-3 w-full">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium text-sm">{comment.author.name}</h4>
                                            <span className="text-xs text-gray-400">{comment.timestamp}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-1">{comment.text}</p>

                                        <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                                            <button onClick={() => toggleLike(comment.id)} className="flex items-center space-x-1">
                                                <ThumbsUp className="h-4 w-4" />
                                                <span>{likes[comment.id] || 0} Likes</span>
                                            </button>
                                            <button onClick={() => toggleReplyInput(comment.id)}>Reply</button>
                                        </div>

                                        {showReplyInput[comment.id] && (
                                            <div className="mt-3 flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    placeholder="Write a reply..."
                                                    className="flex-1 bg-white border px-3 py-1 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                                <button className="p-1 hover:bg-gray-100 rounded-xl">
                                                    <SendHorizonal className="h-4 w-4 text-gray-500" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="p-4 border-t rounded-b-xl">
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                                alt="User"
                                className="h-9 w-9 rounded-xl"
                            />
                            <div className="flex-1 flex items-center gap-5">
                                <input
                                    type="text"
                                    placeholder="Write your comment..."
                                    className="flex-1 bg-white border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <div className='gap-2 flex'>
                                    <button className="py-2 rounded-xl">
                                        <Smile className="h-10 w-10 border rounded-full p-2 hover:text-white hover:bg-gray-300" />
                                    </button>
                                    <button className="py-2  rounded-xl">
                                        <SendHorizonal className="h-10 w-10 hover:text-white hover:bg-primary border border-primary rounded-full p-2 text-primary" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Posts;
