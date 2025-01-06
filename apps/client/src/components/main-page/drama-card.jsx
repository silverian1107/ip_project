import React from 'react';
import { IMG_BASE_URL } from '../MainPage';

export default function DramaCard({ drama, onClickDramaItem }) {
  return (
    <div className="drama-container" onClick={() => onClickDramaItem(drama)}>
      <img src={IMG_BASE_URL + drama.poster_path} alt={drama.name} />
      <div className="drama-info">
        <h4>{drama.name}</h4>
        <span>{drama.vote_average.toFixed(1)}</span>
      </div>
    </div>
  );
}
