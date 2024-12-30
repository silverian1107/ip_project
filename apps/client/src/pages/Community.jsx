import React, { useState } from "react";
import "../styles/Community.css";

function Community() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="community-container">
            <div className="post">
                {/* 채널 정보 */}
                <div className="channel-info">
                    <div className="channel-profile">
                        <img 
                            src={require("../img/default-avatar.jpg")}
                            alt="Channel" 
                            className="channel-avatar"
                        />
                        <span className="channel-name">Channel Name</span>
                    </div>
                    <button className="follow-btn">follow</button>
                </div>

                {/* 게시물 내용 */}
                <div className="post-content">
                    <img 
                        src={require("../img/post-image.png")}
                        alt="Post content" 
                        className="content-image"
                    />
                    <p className="content-text">
                        아니 노란 우산 쓰고 달려오던 임솔 보고 첫눈에 반했던 류선재가 사라졌는데 진짜 어떡하지 이건아니지예.. 오천만 수범이들이 꼽는 선업튀 엔딩 top1이 사라졌다고 지금
                    </p>
                </div>

                {/* 좋아요/댓글 카운트 */}
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
                            <h2>새 글</h2>
                            <div className="modal-buttons">
                                <button className="control-btn" onClick={handleCloseModal}>×</button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <input 
                                type="text" 
                                placeholder="제목을 입력하세요" 
                                className="modal-input"
                            />
                            <textarea 
                                className="modal-textarea"
                                placeholder="내용을 입력하세요"
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="submit-btn">등록</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Community;
