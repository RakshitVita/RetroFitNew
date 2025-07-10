import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../../../Zustand_State/AuthStore';
import './LoginG.css';

const logoPath = './/assets/logo.png';

const LoginG = ({ onClose }) => {
  const signup = useAuthStore((state) => state.signup);

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = credentialResponse.credential;
    signup(decoded);
    if (onClose) onClose();
  };

  const handleGoogleError = () => {
    console.error('Login Failed');
  };

  return (
    <div className="login-modal-backdrop">
      <div className="login-modal-content">
        {/* Cross Icon */}
        <button
          className="login-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <img
          src={logoPath}
          alt="Retro Fit Logo"
          className="login-modal-logo"
        />
        <h2 className="login-modal-title">
          Welcome to <span className="highlight">RETRO FIT</span>
        </h2>
        <div className="login-modal-google">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginG;