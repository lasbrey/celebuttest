"use client";

import { Image as ImageIcon, Users, Music, MapPin, Heart, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";

interface MediaUploadProps {
    onBack: () => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onBack }) => {
    const uploadProgress = 40; // Example value

    return (
        <div className="">
            {/* Media Upload Section */}
            {uploadProgress > 0 && (
                <div className="mt-4 space-y-4 bg-white rounded-xl p-6 shadow-sm mb-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <ImageIcon className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-medium">Dashboard recording.mp4</h3>
                                <p className="text-sm text-gray-500">16 MB</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <button onClick={onBack} className="flex items-center text-gray-600 mb-6">
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back
                    </button>

                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                        <div className="mx-auto w-16 h-16 mb-4">
                            <ImageIcon className="w-full h-full text-gray-400" />
                        </div>
                        <p className="text-gray-600 mb-2">Drop your image/video here or</p>
                        <button className="text-primary font-medium hover:text-primary">browse</button>
                    </div>


                </div>

                {/* Details Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
                    <div>
                        <Label className="text-sm font-medium">Description</Label>
                        <textarea
                            className="mt-1 w-full h-24 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Write something about this celebration..."
                        />
                    </div>

                    <div>
                        <Label className="text-sm font-medium">Tag</Label>
                        <button className="mt-1 w-full flex items-center justify-between p-3 border rounded-lg text-gray-600 hover:border-primary">
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5" />
                                <span>Tag People</span>
                            </div>
                        </button>
                    </div>

                    <div>
                        <Label className="text-sm font-medium">Add Music</Label>
                        <button className="mt-1 w-full flex items-center justify-between p-3 border rounded-lg text-gray-600 hover:border-primary">
                            <div className="flex items-center space-x-2">
                                <Music className="h-5 w-5" />
                                <span>Search Music</span>
                            </div>
                        </button>
                    </div>

                    <div>
                        <Label className="text-sm font-medium">Location</Label>
                        <button className="mt-1 w-full flex items-center justify-between p-3 border rounded-lg text-gray-600 hover:border-primary">
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-5 w-5" />
                                <span>Search Locations</span>
                            </div>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium">Settings</h3>
                        <div>
                            <Label className="text-sm font-medium">When to post</Label>
                            <RadioGroup defaultValue="now" className="mt-2 flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="now" id="now" />
                                    <Label htmlFor="now">Now</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="scheduled" id="scheduled" />
                                    <Label htmlFor="scheduled">Scheduled</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Who can see this post</Label>
                            <button className="mt-1 w-full flex items-center justify-between p-3 border rounded-lg text-gray-600 hover:border-primary">
                                <span>Everyone</span>
                            </button>
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Allow users to:</Label>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="comments" />
                                    <label htmlFor="comments" className="text-sm">Comment</label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Update wishlist</Label>
                            <button className="mt-1 w-full flex items-center justify-between p-3 border rounded-lg text-gray-600 hover:border-primary">
                                <div className="flex items-center space-x-2">
                                    <Heart className="h-5 w-5" />
                                    <span>Add Wishlist</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaUpload;