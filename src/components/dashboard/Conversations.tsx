import React from 'react';
import { MessageSquare, Search, Filter, MoreVertical } from 'lucide-react';

const Conversations: React.FC = () => {
  const conversations = [
    {
      id: 1,
      name: "Sarah Chen",
      lastMessage: "Thanks for helping me understand different perspectives!",
      time: "2m ago",
      unread: 2,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      lastMessage: "I never thought about it that way before...",
      time: "1h ago",
      unread: 0,
    },
    {
      id: 3,
      name: "Aisha Patel",
      lastMessage: "This cultural insight is fascinating",
      time: "3h ago",
      unread: 1,
    },
    {
      id: 4,
      name: "David Kim",
      lastMessage: "Can you explain more about that perspective?",
      time: "1d ago",
      unread: 0,
    },
  ];

  return (
    <div className="h-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Conversations</h2>
        <button className="text-[#5BC0BE] hover:text-[#4DA8A7]">
          <MessageSquare size={24} />
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]/50"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="space-y-4">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5BC0BE] to-[#6E44FF] flex items-center justify-center text-white font-semibold">
              {conversation.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">{conversation.name}</h3>
                <span className="text-sm text-gray-500">{conversation.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
            </div>
            <div className="flex items-center gap-2">
              {conversation.unread > 0 && (
                <span className="w-6 h-6 rounded-full bg-[#5BC0BE] text-white text-sm flex items-center justify-center">
                  {conversation.unread}
                </span>
              )}
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversations;