import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/queries/use-user';
import { IMG_BASE_URL_SM } from '../MainPage';
import ReviewCard from '../reviews/review-card';
import LoadingSpinner from '../ui/spinner';

export default function TabContent({ activeTab, dramas, reviews }) {
  const { data: user, isLoading } = useProfile();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (activeTab === 'Wishlist') {
    return (
      <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-3 md:grid-cols-4">
        {dramas.map((drama, index) => (
          <div
            key={index}
            className="overflow-hidden transition-transform rounded-lg shadow-lg cursor-pointer bg-gray-800/80 hover:scale-105"
            onClick={() => navigate(`/drama/${drama.id}`)}
          >
            <img
              src={IMG_BASE_URL_SM + drama.posterPath}
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
        {reviews.map((review) => (
          <ReviewCard review={review} key={review.id} user={user} isMyProfile />
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
