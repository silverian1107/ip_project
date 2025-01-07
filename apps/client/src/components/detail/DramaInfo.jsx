import React from 'react';

export default function DramaInfo({ details, drama, currentLanguage, crew }) {
  return (
    <div className="drama-info">
      <p>
        <strong>Network:</strong>{' '}
        {details.networks && details.networks.length > 0
          ? details.networks.map((network) => network.name).join(', ')
          : 'No information available'}
      </p>
      <p>
        <strong>Air Date:</strong>{' '}
        {details.first_air_date
          ? details.last_air_date &&
            details.last_air_date !== details.first_air_date
            ? `${details.first_air_date} ~ ${details.last_air_date}`
            : `${details.first_air_date} (Ongoing)`
          : 'No information available'}
      </p>
      <p>
        <strong>Genre:</strong>{' '}
        {details.genres && details.genres.length > 0
          ? details.genres.map((genre) => genre.name).join(', ')
          : 'No information available'}
      </p>
      <p>
        <strong>Overview:</strong>{' '}
        {drama.overviewTranslations[currentLanguage] ||
          'No information available'}
      </p>
      <p>
        <strong>Production Companies:</strong>{' '}
        {details.production_companies && details.production_companies.length > 0
          ? details.production_companies
              .map((company) => company.name)
              .join(', ')
          : 'No information available'}
      </p>
      <p>
        <strong>Cast & Crew:</strong>
      </p>
      <ul>
        {crew && crew.length > 0 ? (
          crew.map((member) => (
            <li key={member.credit_id}>
              {member.name} ({member.job})
            </li>
          ))
        ) : (
          <li>No crew information available.</li>
        )}
      </ul>
    </div>
  );
}
