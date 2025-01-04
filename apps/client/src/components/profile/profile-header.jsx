import React from 'react';
import { PencilIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ProfileHeader({ profile }) {
  const { t } = useTranslation('profile');
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-6">
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img
        src={profile.avatarUrl || '/user.png'}
        alt="Profile Picture"
        className="w-24 h-24 border-2 border-blue-400 rounded-full"
      />
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">
            {profile.fullName || profile.username}
          </h2>
          <button
            onClick={() => {
              navigate('/edit-profile');
            }}
            className="flex items-center gap-2 p-1 px-2 transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
          >
            <PencilIcon size={16} />
            <span>{t('editProfile')}</span>
          </button>
        </div>
        <p className="text-gray-400">{profile.email}</p>
        <p className="mt-2">
          <span className="font-semibold text-blue-400">
            {profile.followings.length}
          </span>{' '}
          {t('following')}{' '}
          <span className="font-semibold text-blue-400">
            {profile.followers.length}
          </span>{' '}
          {t('followers')}
        </p>
      </div>
    </div>
  );
}
