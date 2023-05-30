import React from 'react'
import './login.css';
import { loginEndpoint } from '../../spotify';

export default function Login() {
    return (
      <div className="login-page">
        <img src="https://i.ibb.co/qjD1MRT/logo-powered-Spotify.png"
             alt="logo-spotify"
             className="logo" />

        <a href={loginEndpoint}>
          <div className="login-btn"> 
          <p className="text">Log in using</p>
          <img src="https://zeevector.com/wp-content/uploads/Spotify-Logo-PNG.png" 
                alt="Spotify" 
                className="spotiLogo"/>
          </div>
        </a>
      </div>
    );
  }
