import React from 'react';
import { Bell, MoreVertical } from "lucide-react";
import Link from 'next/link';

const friendSuggestions = [
    { name: "Julia Smith", username: "juliasmith" },
    { name: "Vermillion D. Gray", username: "vermilliondgray" },
    { name: "Mai Senpai", username: "maisenpai" },
    { name: "Mai Senpai", username: "maisenpai" },
    { name: "Mai Senpai", username: "maisenpai" }
];

const celebrations = [
    {
        type: "Friend's Birthday",
        date: "Jun 25, 2028",
        icon: "🎂",
    },
    {
        type: "Holiday",
        date: "Jun 28, 2028",
        icon: "🌙",
    },
    {
        type: "Group Meetup",
        date: "Aug 19, 2028",
        icon: "👥",
    },
];

const RightSidebar = () => {
    return (
        <aside className="space-y-6 bg-white rounded-2xl p-6">
            <div>
                {/* Friend Suggestions */}
                <div className='p-4 mb-6'>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Friend Suggestions</h3>
                        <Link href="/friends" className="text-sm text-primary">See All</Link>
                    </div>
                    {friendSuggestions.map(({ name, username }) => (
                        <div key={username} className="flex items-center justify-between py-2">
                            <div className="flex items-center space-x-3">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                                    alt={name}
                                    className="h-10 w-10 rounded-xl"
                                />
                                <div>
                                    <h4 className="font-medium">{name}</h4>
                                    <p className="text-sm text-gray-500">@{username}</p>
                                </div>
                            </div>
                            <button className="text-white bg-primary px-4 py-1 rounded-lg text-sm hover:bg-primary/20">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>

                {/* Upcoming Celebrations */}
                <div className='p-4 mb-6'>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Upcoming Celebrations</h3>
                        <button>
                            <MoreVertical className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>
                    {celebrations.map((celebration, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between py-4"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-xl">
                                    {celebration.icon}
                                </div>
                                <div>
                                    <h4 className="font-medium">{celebration.type}</h4>
                                    <p className="text-sm text-gray-500">{celebration.date}</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <Bell className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default RightSidebar;