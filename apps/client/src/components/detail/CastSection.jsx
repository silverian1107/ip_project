import React from 'react';
import { Link } from 'react-router-dom';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

export default function CastSection({ cast }) {
  return (
    <div className="drama-cast">
      <h2>Cast</h2>
      <div className="cast-slider">
        {cast.length > 0 ? (
          cast.map((member) => (
            <Link
              to={`/actor/${member.id}`}
              key={member.id}
              className="cast-card"
            >
              <img
                className="cast-image"
                src={
                  member.profile_path
                    ? `${IMG_BASE_URL}${member.profile_path}`
                    : 'https://via.placeholder.com/100x100?text=No+Image'
                }
                alt={member.name}
              />
              <p className="cast-name">{member.name}</p>
              <p className="cast-character">
                {member.character || 'No character information available'}
              </p>
            </Link>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </div>
    </div>
  );
}
