import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      color: '#333'
    }}>
      <div style={{
        fontSize: '7rem',
        fontWeight: 'bold',
        marginBottom: 0,
        color: '#ef233c'
      }}>
        404
      </div>
      <h2 style={{
        fontSize: '2.2rem',
        margin: '16px 0 8px 0'
      }}>
        Page Not Found
      </h2>
      <p style={{
        maxWidth: 400,
        textAlign: 'center',
        marginBottom: 32
      }}>
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        style={{
          padding: '12px 32px',
          borderRadius: 8,
          border: 'none',
          background: '#3a86ff',
          color: 'white',
          fontSize: '1rem',
          cursor: 'pointer',
          fontWeight: 600,
          boxShadow: '0 2px 10px rgba(58,134,255,.15)'
        }}
        onClick={() => navigate('/')}
      >
        Go Home
      </button>
    </main>
  );
};

export default NotFound;
