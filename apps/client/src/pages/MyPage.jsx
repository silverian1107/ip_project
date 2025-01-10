import React, { useState } from 'react';
import ProfileHeader from '../components/profile/profile-header';
import TabContent from '../components/profile/tab-content';
import LoadingSpinner from '../components/ui/spinner';
import { useProfile } from '../hooks/queries/use-user';
import { useBookmarkedDramas } from '../hooks/queries/use-drama';
import { useReviewByUser } from '../hooks/queries/use-review';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('Wishlist');
  const { data: account, isLoading, isError } = useProfile();

  const { data: bookmarked, isLoading: isLoadingBookmarked } =
    useBookmarkedDramas();

  const { data: reviews, isLoading: isLoadingReviews } = useReviewByUser();

  console.log('reviews', reviews);

  const handleTabClick = (tab) => setActiveTab(tab);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error loading profile data</div>;
  }

  if (isLoadingBookmarked || isLoadingReviews) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen text-white bg-gray-900/20">
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

          <TabContent
            activeTab={activeTab}
            dramas={bookmarked}
            reviews={reviews}
          />
        </div>
      </div>
    </div>
  );
}
