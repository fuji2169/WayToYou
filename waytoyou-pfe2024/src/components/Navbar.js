import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import './NavbarStyle.css';
import SignUpPopup from './SignUpPopup';
import SignInPopup from './SignInPopup';

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleSignOut = () => {
    // Perform sign out actions (e.g., clear session, cookies)
    setIsAuthenticated(false);
  };

  const handleSignUpSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleSignInSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">Way To You</h1>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <a href={item.url} className={item.cName}>
              <i className={item.icon}></i>
              {item.title}
            </a>
          </li>
        ))}
        {isAuthenticated ? (
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        ) : (
          <>
            <li>
              <button onClick={() => setShowSignUp(true)}>Sign Up</button>
            </li>
            <li>
              <button onClick={() => setShowSignIn(true)}>Sign In</button>
            </li>
          </>
        )}
      </ul>
      {showSignUp && <SignUpPopup closePopup={() => setShowSignUp(false)} onSignUpSuccess={handleSignUpSuccess} />}
      {showSignIn && <SignInPopup closePopup={() => setShowSignIn(false)} onSignInSuccess={handleSignInSuccess} />}
    </nav>
  );
}

export default Navbar;
