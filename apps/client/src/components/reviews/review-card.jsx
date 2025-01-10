import { formatDistanceToNow } from 'date-fns';
import { FilePenLine, Trash } from 'lucide-react';
import React from 'react';

export default function ReviewCard({
  review,
  user,
  handleEditReview,
  handleDeleteReview,
  isMyProfile = false // Default to false
}) {
  return (
    <div
      className={`p-4 rounded-lg ${
        review.userId === user?.id ? 'bg-blue-900' : 'bg-gray-800/60'
      }`}
    >
      <div className="flex items-center justify-start gap-2">
        <h3 className="text-lg font-semibold leading-1">
          {isMyProfile
            ? review.drama.title
            : review.user.username || user.username}
        </h3>
        <p className="text-sm text-gray-400">
          {formatDistanceToNow(new Date(review.createdAt), {
            addSuffix: true
          })}
        </p>
        {review.user.id === user?.id && (
          <div className="flex ml-auto space-x-2">
            <button
              onClick={() => handleEditReview(review)}
              className="flex items-center gap-1 px-2 space-x-2 text-blue-600 transition duration-200 border border-transparent rounded-md hover:border-blue-600"
            >
              <FilePenLine size={16} />
              Edit
            </button>
            <button
              onClick={() => handleDeleteReview(review.id)}
              className="flex items-center gap-1 px-2 text-red-500 transition duration-200 border border-transparent rounded-md hover:border-red-500"
            >
              <Trash size={16} />
              Delete
            </button>
          </div>
        )}
      </div>
      <p className="my-2 text-yellow-400">
        {'★'.repeat(review.rating)}
        {'☆'.repeat(5 - review.rating)}
      </p>
      <p className="text-gray-300">{review.content}</p>
    </div>
  );
}
