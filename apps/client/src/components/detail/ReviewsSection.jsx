import React, { useEffect, useState } from 'react';
import { useReview } from '../../hooks/queries/use-review';
import { useProfile } from '../../hooks/queries/use-user';
import ReviewCard from '../reviews/review-card';

export default function ReviewsSection({ id, reviews }) {
  const { data: user, isLoading } = useProfile();
  const [localReviews, setLocalReviews] = useState(reviews);
  const reviewMutate = useReview();

  const [newReview, setNewReview] = useState({
    content: '',
    rating: 0,
    hoverRating: 0
  });

  useEffect(() => {
    setLocalReviews(reviews);
  }, [reviews]);

  const [editingReview, setEditingReview] = useState(null);

  const handleAddReview = async () => {
    if (newReview.content.trim() === '' || newReview.rating === 0) return;

    const newReviewObj = {
      author: user?.username || '익명',
      content: newReview.content,
      rating: newReview.rating,
      createdAt: new Date(),
      userId: user?.id,
      user: { id: user?.id }
    };

    try {
      await reviewMutate.mutateAsync({
        dramaId: id,
        rating: newReview.rating,
        content: newReview.content
      });
      setLocalReviews((prev) => [...prev, newReviewObj]);
      setNewReview({ content: '', rating: 0, hoverRating: 0 });
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  const handleUpdateReview = () => {
    if (
      !editingReview ||
      newReview.content.trim() === '' ||
      newReview.rating === 0
    )
      return;
    setLocalReviews((prev) =>
      prev.map((review) =>
        review.id === editingReview.id
          ? { ...review, content: newReview.content, rating: newReview.rating }
          : review
      )
    );
    setEditingReview(null);
    setNewReview({ content: '', rating: 0, hoverRating: 0 });
  };

  const handleStarClick = (rating) => {
    setNewReview((prev) => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating
    }));
  };

  const handleMouseEnter = (rating) => {
    setNewReview((prev) => ({ ...prev, hoverRating: rating }));
  };

  const handleMouseLeave = () => {
    setNewReview((prev) => ({ ...prev, hoverRating: 0 }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 text-white rounded-lg">
      <h2 className="mb-6 text-2xl font-bold">Reviews</h2>
      {localReviews.length > 0 ? (
        <div className="space-y-2">
          {localReviews
            .sort((a, b) =>
              a.userId === user?.id ? -1 : b.userId === user?.id ? 1 : 0
            )
            .map((review) => (
              <ReviewCard user={user} review={review} key={review.id} />
            ))}
        </div>
      ) : (
        <p className="text-gray-400">No reviews available.</p>
      )}

      <div className="mt-8">
        <h3 className="mb-4 text-xl font-semibold">
          {editingReview ? 'Edit Your Review' : 'Add a Review'}
        </h3>
        {user ? (
          <>
            <div className="flex mb-4 space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-2xl cursor-pointer ${
                    newReview.hoverRating >= star || newReview.rating >= star
                      ? 'text-yellow-400'
                      : 'text-gray-400'
                  }`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleMouseEnter(star)}
                  onMouseLeave={handleMouseLeave}
                  role="button"
                  aria-label={`${star} star${star !== 1 ? 's' : ''}`}
                >
                  {newReview.hoverRating >= star || newReview.rating >= star
                    ? '★'
                    : '☆'}
                </span>
              ))}
            </div>
            <textarea
              placeholder="Write your review..."
              value={newReview.content}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, content: e.target.value }))
              }
              className="w-full p-3 text-white transition duration-200 bg-gray-800 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-700"
              rows={4}
            />
            <button
              onClick={editingReview ? handleUpdateReview : handleAddReview}
              className="px-6 py-2 mt-4 text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500"
            >
              {editingReview ? 'Update Review' : 'Submit Review'}
            </button>
          </>
        ) : (
          <p className="text-yellow-400">You must log in to leave a review.</p>
        )}
      </div>
    </div>
  );
}
