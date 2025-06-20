"use client";

import React, { useRef, useState } from "react";
import { X, Smile, Image as ImageIcon, Calendar, Settings, Plus, Clock, AtSign } from "lucide-react";
import { createPortal } from "react-dom";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatar, getUserDisplayName } from "@/lib/auth";
import { postsApi } from "@/services/api";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useToast } from '@/hooks/use-toast';

const MAX_MEDIA = 6;

const PostModal = ({ onClose }: { onClose: () => void }) => {
    const { toast } = useToast();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user } = useAuth();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const newFiles = Array.from(e.target.files).slice(0, MAX_MEDIA - mediaFiles.length);
        setMediaFiles((prev) => [...prev, ...newFiles].slice(0, MAX_MEDIA));
    };

    const handleRemoveImage = (index: number) => {
        setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleEmojiSelect = (emoji: any) => {
        setContent((prev) => prev + emoji.native);
        setShowEmojiPicker(false);
    };

    const handlePost = async () => {
        if (!content || loading) return;
        try {
            setLoading(true);

            const mediaPayload: any = {};
            for (let i = 0; i < mediaFiles.length; i++) {
                const file = mediaFiles[i];
                const arrayBuffer = await file.arrayBuffer();
                const headers = {
                    "content-type": [file.type],
                };

                mediaPayload[`media_${i + 1}`] = {
                    filename: file.name,
                    header: headers,
                    size: file.size,
                    data: Array.from(new Uint8Array(arrayBuffer)),
                };
            }

            await postsApi.createPost({
                message: content,
                ...mediaPayload,
            });

            toast({
                title: "Post created",
                description: "Your post was published successfully.",
                variant: "success",
            });

            setTimeout(() => {
                onClose();
            }, 500);

        } catch (err) {
            toast({
                title: "Error",
                description: "Your post was not published.",
                variant: "destructive",
            });
            console.error("Post failed:", err);
        } finally {
            setLoading(false);
        }
    };


    if (!user) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl w-full max-w-xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                    <X className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="flex items-center mb-4 space-x-3">
                    <img
                        src={getUserAvatar(user)}
                        alt="User"
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="font-semibold">{getUserDisplayName(user)}</h2>
                        <span className="text-sm text-gray-500">Post to Anyone</span>
                    </div>
                </div>

                {/* Textarea */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What do you want to talk about?"
                    rows={6}
                    className="w-full p-2 text-lg border-0 focus:outline-none resize-none placeholder-gray-500"
                />

                {/* Image Preview with Remove Option */}
                {mediaFiles.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {mediaFiles.map((file, i) => (
                            <div key={i} className="relative">
                                <img
                                    src={URL.createObjectURL(file)}
                                    className="w-full h-28 object-cover rounded-md"
                                    alt={`upload-${i}`}
                                />
                                <button
                                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5"
                                    onClick={() => handleRemoveImage(i)}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Action bar */}
                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center space-x-4 text-gray-600">
                        {/* Emoji Button + Picker */}
                        <div className="relative">
                            <Smile
                                className="h-5 w-5 cursor-pointer"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            />
                            {showEmojiPicker && (
                                <div className="absolute bottom-full mb-2 z-50">
                                    <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
                                </div>
                            )}
                        </div>

                        {/* Image Picker */}
                        <ImageIcon
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        />
                        <AtSign className="h-5 w-5 cursor-pointer" />
                        {/* <Calendar className="h-5 w-5 cursor-pointer" />
                        <Settings className="h-5 w-5 cursor-pointer" />
                        <Plus className="h-5 w-5 cursor-pointer" /> */}
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handlePost}
                            disabled={!content || loading}
                            className="bg-primary text-white px-4 py-1.5 rounded-full disabled:opacity-50"
                        >
                            {loading ? "Posting..." : "Post"}
                        </button>
                    </div>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
        </div>,
        document.body
    );
};

export default PostModal;
