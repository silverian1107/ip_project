import React, { useState } from 'react';
import ProfileHeader from '../components/profile/profile-header';
import TabContent from '../components/profile/tab-content';
import LoadingSpinner from '../components/ui/spinner';
import { useProfile } from '../hooks/queries/use-user';

const dummyDramas = [
  {
    title: 'Eternal Sunshine',
    rating: 4.5,
    review: 'A masterpiece that explores the depths of human emotions.',
    date: '2024-07-07',
    image: '/placeholder.svg?height=300&width=200'
  },
  {
    title: 'Midnight Serenade',
    rating: 4.0,
    review: 'An enchanting journey through love and music.',
    date: '2024-07-08',
    image: '/placeholder.svg?height=300&width=200'
  }
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('Wishlist');
  const { data: account, isLoading, isError } = useProfile();

  const handleTabClick = (tab) => setActiveTab(tab);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error loading profile data</div>;
  }

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <div className="container px-4 py-8 mx-auto">
        <ProfileHeader profile={account} />

        <div className="mt-8">
          <div className="flex space-x-4 border-b border-gray-700">
            {['Wishlist', 'Reviews', 'Posts'].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 focus:outline-none ${
                  activeTab === tab
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <TabContent activeTab={activeTab} dramas={dummyDramas} />
        </div>
      </div>
    </div>
  );
}
