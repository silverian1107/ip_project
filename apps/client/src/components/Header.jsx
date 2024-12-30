import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Header.css'

function Header() {
    const [language, setLanguage] = useState("KR"); // 기본 언어 설정
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage); // 언어 변경
        setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // 드롭다운 열기/닫기 토글
    };
    return (
        <div className="header">
            
            <div className="nav-left">
                <Link className="user-icon" to="/mypage" >👤</Link>
                <Link className="community" to="/community">💬</Link>
            </div>

            
            <Link className="logo" to="/">DramaSphere</Link>

        
            <div className="nav-right">
                <Link className="navbarMenu" to="/login">로그인</Link>
                <input type="text" placeholder="검색" className="search-bar" />
                 {/* 언어 선택 토글 */}
                <div className="language-selector">
                    <span
                        className="language"
                        onClick={toggleDropdown} // 화살표 클릭 시 드롭다운 토글
                    >
                        {language} ▼
                    </span>

                    {isDropdownOpen && (
                        <div className="dropdown">
                            <span
                                className="dropdown-item"
                                onClick={() => handleLanguageChange("KR")}
                            >
                                KR
                            </span>
                            <span
                                className="dropdown-item"
                                onClick={() => handleLanguageChange("EN")}
                            >
                                EN
                            </span>
                            <span
                                className="dropdown-item"
                                onClick={() => handleLanguageChange("VN")}
                            >
                                VN
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;