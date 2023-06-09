import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Library from '../library';
import Player from '../player';
import Mood from '../mood';
import './home.css';
import Sidebar from '../../components/sidebar';
import Login from '../auth/login';
import { setClientToken } from '../../spotify';

const AUTO_SIGN_OUT_TIME = 300000; // 5 minutes in milliseconds

export default function Home() {
  const [token, setToken] = useState('');

  const handleSignOut = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/login'; // Replace with your login page URL
  };

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const hash = window.location.hash;
    window.location.hash = '';
    if (!token && hash) {
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem('token', _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }

    let signOutTimer;
    const resetSignOutTimer = () => {
      clearTimeout(signOutTimer);
      signOutTimer = setTimeout(() => {
        handleSignOut();
      }, AUTO_SIGN_OUT_TIME);
    };

    const handleUserActivity = () => {
      resetSignOutTimer();
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    resetSignOutTimer();

    return () => {
      clearTimeout(signOutTimer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/player" element={<Player />} />
        </Routes>
      </div>
    </Router>
  );
}
