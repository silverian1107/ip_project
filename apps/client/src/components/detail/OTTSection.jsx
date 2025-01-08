import React from 'react';
import { IMG_BASE_URL_SM } from '../MainPage';

const getProviderColor = (providerName) => {
  switch (providerName.toLowerCase()) {
    case 'netflix':
      return 'bg-red-600';
    case 'wavve':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

function OTTSection({ ottProviders }) {
  if (!ottProviders || ottProviders.length === 0) {
    return (
      <div className="p-4">
        <h2 className="mb-4 text-2xl font-bold">OTT Platforms</h2>
        <div className="p-4 text-center rounded-lg bg-gray-100/90">
          <p className="text-gray-800">
            No OTT platforms available for this content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">OTT Platforms</h2>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {ottProviders.map((provider) => (
          <div
            key={provider.provider_id}
            className={`relative aspect-square rounded-lg overflow-hidden ${getProviderColor(provider.provider_name)} group`}
          >
            <img
              src={`${IMG_BASE_URL_SM}${provider.logo_path}`}
              alt={provider.provider_name}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
              <p className="px-1 mb-1 text-xs font-semibold text-center text-white">
                {provider.provider_name}
              </p>
              <button className="px-1 py-1 text-xs font-semibold text-black transition-colors duration-300 bg-white rounded-md hover:bg-opacity-90">
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OTTSection;
