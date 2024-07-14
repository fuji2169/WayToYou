import React, { useState } from 'react';
import './PopupForm.css';

function SignInPopup({ closePopup, onSignInSuccess, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        setError('');
        onSignInSuccess();
        setUser(username);
        closePopup();
      } else {
        setError(data.message || 'Sign in failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className='username'>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='enter your username'
            />
          </div>
          <div className='password'>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='enter your password'
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Sign In</button>
          <button type="button" onClick={closePopup}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default SignInPopup;
