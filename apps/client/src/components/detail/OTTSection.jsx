import React from 'react';

export default function OTTSection({ ottProviders }) {
  return (
    <div className="ott-section">
      <h2>OTT Platforms</h2>
      <div className="ott-links">
        {ottProviders.length > 0 ? (
          ottProviders.map((provider, index) => (
            <div key={index} className="ott-item">
              <div className="ott-info">
                <p>{provider.provider_name}</p>
              </div>
              <button
                className="ott-button"
                onClick={() => window.open(provider.link, '_blank')}
              >
                Watch Now
              </button>
            </div>
          ))
        ) : (
          <p>No OTT platform information available.</p>
        )}
      </div>
    </div>
  );
}
