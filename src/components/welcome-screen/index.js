import React from "react";

import "./styles.css";

const WelcomeScreen = (props) => {
  const { getAccessToken } = props;
  return props.showWelcomeScreen ? (
    <div className="welcome-screen">
      <h1>Welcome to the Musto Easy-Meet</h1>
      <h4>
        Log in to see the upcoming events around the world for full-stack
        developers
      </h4>
      <div align="center">
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google sign-in"
            />
          </div>
          <button
            onClick={() => {
              getAccessToken();
            }}
            rel="nofollow noopener"
            className="google-btn__text"
          >
            <b>Sign in with google</b>
          </button>
        </div>
      </div>
      <a
        href="https://mustafa-sarshar.github.io/easy-meet/privacy.html"
        rel="nofollow noopener"
      >
        Privacy policy
      </a>
    </div>
  ) : null;
};
export default WelcomeScreen;
