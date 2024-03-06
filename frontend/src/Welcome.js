import React from 'react';
import { useNavigate } from 'react-router-dom';
import helloImage from './hello.jpg';

function Welcome() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/signup');
  };

  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${helloImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          maxWidth: '300px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Welcome</h2>
        <button
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#5cb85c',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onClick={handleUserClick}
        >
          User
        </button>
        <button
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#d9534f',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onClick={handleAdminClick}
        >
          Admin
        </button>
      </div>
    </div>
  );
}

export default Welcome;


