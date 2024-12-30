import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate(); // 네비게이션 훅

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다!");
            return;
        }
        alert(`회원가입 성공!\n이메일: ${email}`);
        navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
    };

    return (
        <div className="auth-container">
            <h1 className="auth-logo">DramaSphere</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="email">아이디</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    id="email" 
                    type="email" 
                    placeholder="Email" 
                />

                <label htmlFor="password">비밀번호</label>
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    id="password" 
                    type="password" 
                    placeholder="Password" 
                />

                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm Password" 
                />

                <button type="submit" className="auth-button">회원가입</button>
            </form>
        </div>
    );
}

export default SignUp;
