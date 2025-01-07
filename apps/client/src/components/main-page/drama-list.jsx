import React from 'react';
import LoadingSpinner from '../ui/spinner';
import DramaCard from './drama-card';

export default function DramaList({
  dramas,
  onClickDramaItem,
  isLoading,
  title
}) {
  if (isLoading) {
    return (
      <div className="w-11/12 mx-auto space-y-4 lg:w-4/5">
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto space-y-6 lg:w-4/5">
      <h2 className="text-3xl font-bold text-blue-600">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {dramas.map((item) => (
          <DramaCard
            key={item.id}
            drama={item}
            onClickDramaItem={onClickDramaItem}
          />
        ))}
      </div>
    </div>
  );
}
