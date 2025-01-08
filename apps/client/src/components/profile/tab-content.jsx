import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';

export default function TabContent({ activeTab, dramas }) {
  if (activeTab === 'Wishlist') {
    return (
      <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-3 md:grid-cols-4">
        {dramas.map((drama, index) => (
          <div
            key={index}
            className="overflow-hidden transition-transform rounded-lg shadow-lg bg-gray-800/80 hover:scale-105"
          >
            <img
              src={drama.image}
              alt={drama.title}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{drama.title}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 'Reviews') {
    return (
      <div className="mt-6 space-y-6">
        {dramas.map((drama, index) => (
          <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold">{drama.title}</h3>
              <div className="flex items-center space-x-1 text-yellow-400">
                <Star size={18} fill="currentColor" />
                <span>{drama.rating}</span>
              </div>
            </div>
            <p className="mt-2 text-gray-300">{drama.review}</p>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
              <span>{drama.date}</span>
              <button className="flex items-center space-x-1 text-blue-400 transition-colors hover:text-blue-300">
                <ThumbsUp size={16} />
                <span>1</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 'Posts') {
    return (
      <div className="mt-6 text-center text-gray-400">
        <h3 className="text-xl">No posts available.</h3>
      </div>
    );
  }

  return null;
}
