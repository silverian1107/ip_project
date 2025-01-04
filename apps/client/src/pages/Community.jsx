import React, { useState } from 'react';
import '../styles/Community.css';

function Community() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="community-container">
      <div className="post">
        {/* Channel Info */}
        <div className="channel-info">
          <div className="channel-profile">
            <img
              src={require('../img/default-avatar.jpg')}
              alt="Channel"
              className="channel-avatar"
            />
            <span className="channel-name">Channel Name</span>
          </div>
          <button className="follow-btn">follow</button>
        </div>

        {/* Post Content */}
        <div className="post-content">
          <img
            src={require('../img/post-image.png')}
            alt="Post content"
            className="content-image"
          />
          <p className="content-text">
            I saw Im Sol running with a yellow umbrella, and I fell for Ryu Seon
            Jae at first sight, but now he's gone. What should I do? This can't
            be happening... The top 1 ending of Sun-Up is gone.
          </p>
        </div>

        {/* Likes/Comments Count */}
        <div className="interaction-counts">
          <span className="comment-count">💬 28</span>
          <span className="like-count">❤️ 5</span>
        </div>
      </div>

      <button className="post-create-btn" onClick={handleOpenModal}>
        <span className="material-icons">✏️</span>
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Post</h2>
              <div className="modal-buttons">
                <button className="control-btn" onClick={handleCloseModal}>
                  ×
                </button>
              </div>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Enter title"
                className="modal-input"
              />
              <textarea
                className="modal-textarea"
                placeholder="Enter content"
              />
            </div>
            <div className="modal-footer">
              <button className="submit-btn">Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Community;
