import React from 'react';
import DramaCard from './drama-card';

export default function DramaList({ dramas, onClickDramaItem }) {
  return (
    <div className="app-container">
      {dramas.map((item) => (
        <DramaCard
          key={item.id}
          drama={item}
          onClickDramaItem={onClickDramaItem}
        />
      ))}
    </div>
  );
}
