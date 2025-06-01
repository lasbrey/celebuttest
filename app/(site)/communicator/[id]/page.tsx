"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Image as ImageIcon,
  Smile,
  Send,
  Paperclip,
  Mic,
  ArrowLeft,
  Check,
  CheckCheck,
} from "lucide-react";
import Link from "next/link";

const conversation = {
  id: 1,
  user: {
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    isOnline: true,
    lastSeen: "Just now",
  },
  messages: [
    {
      id: 1,
      sender: "them",
      text: "Hey! Are you coming to the birthday party? 🎉",
      time: "2:30 PM",
      status: "read",
    },
    {
      id: 2,
      sender: "me",
      text: "Yes, definitely! What time does it start?",
      time: "2:31 PM",
      status: "read",
    },
    {
      id: 3,
      sender: "them",
      text: "Great! It starts at 7 PM. Don't forget to bring your camera 📸",
      time: "2:32 PM",
      status: "read",
    },
    {
      id: 4,
      sender: "me",
      text: "Perfect! I'll be there. Should I bring anything else?",
      time: "2:33 PM",
      status: "sent",
    },
  ],
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(conversation.messages);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const chatId = params.id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent",
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="grid grid-cols-12 min-h-screen">
          {/* Chat Area */}
          <div className="col-span-8 bg-white flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center space-x-3">
                <Link href="/communicator" className="p-2 hover:bg-gray-100 rounded-xl">
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div className="relative">
                  <img
                    src={conversation.user.avatar}
                    alt={conversation.user.name}
                    className="w-10 h-10 rounded-xl ring-2 ring-primary/50"
                  />
                  {conversation.user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-xl border-2 border-white" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold">{conversation.user.name}</h2>
                  <p className="text-sm text-gray-500">
                    {conversation.user.isOnline ? "Online" : conversation.user.lastSeen}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <Phone className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <Video className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-3 ${
                      msg.sender === "me"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div className="flex items-center justify-end space-x-1 mt-1">
                      <span className={`text-xs ${
                        msg.sender === "me" ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {msg.time}
                      </span>
                      {msg.sender === "me" && (
                        <div className="text-blue-100">
                          {msg.status === "read" ? (
                            <CheckCheck className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white/80 backdrop-blur-sm sticky bottom-0">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                    className="p-2 hover:bg-gray-100 rounded-xl"
                  >
                    <Paperclip className="h-5 w-5 text-gray-600" />
                  </button>
                  {showAttachMenu && (
                    <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border p-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg">
                          <ImageIcon className="h-5 w-5 text-primary/50" />
                          <span>Photo</span>
                        </button>
                        <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg">
                          <Video className="h-5 w-5 text-green-500" />
                          <span>Video</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 p-1 hover:bg-gray-100 rounded-xl"
                  >
                    <Smile className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <Mic className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Chat Info Sidebar */}
          <div className="col-span-4 bg-gray-50 border-l p-4">
            <div className="text-center mb-6">
              <img
                src={conversation.user.avatar}
                alt={conversation.user.name}
                className="w-24 h-24 rounded-xl mx-auto mb-4 ring-4 ring-primary/50"
              />
              <h2 className="text-xl font-semibold">{conversation.user.name}</h2>
              <p className="text-gray-500">
                {conversation.user.isOnline ? "Online" : conversation.user.lastSeen}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Shared Media</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="aspect-square bg-gray-200 rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Shared Files</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex items-center space-x-2 p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Paperclip className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Document.pdf</p>
                        <p className="text-sm text-gray-500">2.5 MB</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}