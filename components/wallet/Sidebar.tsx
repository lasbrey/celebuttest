"use client";
import React from 'react'


const portfolio = [
    { name: "Cash Gift", amount: 5500, color: "bg-purple-100", textColor: "text-purple-600", icon: "🎁" },
    { name: "Take me out", amount: 2050.45, color: "bg-red-100", textColor: "text-red-600", icon: "🍽️" },
    { name: "Drink", amount: 2000, color: "bg-primary", textColor: "text-primary", icon: "🥤" },
    { name: "Gift Card", amount: 600, color: "bg-green-100", textColor: "text-green-600", icon: "🎫" },
    { name: "Wishlist", amount: 3250, color: "bg-indigo-100", textColor: "text-indigo-600", icon: "🎯" },
    { name: "Celevision/Subscription Fee", amount: 310, color: "bg-indigo-100", textColor: "text-indigo-600", icon: "📺" },
    { name: "Celebration Revenue", amount: 310, color: "bg-indigo-100", textColor: "text-indigo-600", icon: "🎉" },
    { name: "Retail Coupons", amount: 310, color: "bg-indigo-100", textColor: "text-indigo-600", icon: "🏷️" },
];

const Sidebar = () => {
    return (
        <>
            {/* Balance Card */}
            <div className="bg-white rounded-xl p-6">
                <h2 className="text-sm text-gray-600 mb-2">Balance</h2>
                <p className="text-3xl font-semibold text-amber-500">$13710.45</p>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-xl p-6 my-8">
                <h2 className="font-medium mb-4">My Portfolio</h2>
                <div className="space-y-4">
                    {portfolio.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
                                    <span className="text-lg">{item.icon}</span>
                                </div>
                                <span className="font-medium">{item.name}</span>
                            </div>
                            <span className={`${item.textColor} font-medium`}>${item.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Sidebar