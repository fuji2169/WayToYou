import React, { useState } from 'react';
import './PopupForm.css';

function SignUpPopup({ closePopup, onSignUpSuccess, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Sign up successful!');
        setError('');
        onSignUpSuccess();
        setUser(username);
        setTimeout(() => closePopup(), 2000);
      } else {
        setError(data.message || 'Sign up failed. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setSuccess(''); // Clear success message on error
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Sign Up</h2>
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
          {success && <div className="success-message">{success}</div>}
          <button type="submit">Sign Up</button>
          <button type="button" onClick={closePopup}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPopup;
