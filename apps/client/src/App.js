import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyPage from './pages/MyPage';
import Detail from './pages/Detail';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import EditProfile from './pages/EditProfile';
import ActorFilmography from './pages/ActorFilmography';
import Community from './pages/Community';
import QueryProvider from './libs/react-query-provider';
import { Toaster } from 'sonner';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function App() {
  // 프로필 정보를 상태로 관리
  const [profile, setProfile] = useState({
    name: '닉네임',
    email: 'oooooo@gmail.com',
    profilePic: 'https://via.placeholder.com/100',
    following: 53,
    follower: 53
  });

  return (
    <QueryProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            {/* MyPage와 EditProfile에 profile과 setProfile을 전달 */}
            <Route path="/mypage" element={<MyPage profile={profile} />} />
            <Route
              path="/edit-profile"
              element={
                <EditProfile profile={profile} setProfile={setProfile} />
              }
            />
            <Route
              path="/community"
              element={<Community profile={profile} />}
            />

            <Route path="/drama/:id" element={<Detail />} />
            <Route path="/actor/:id" element={<ActorFilmography />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="bottom-right" />
      </I18nextProvider>
    </QueryProvider>
  );
}

export default App;
