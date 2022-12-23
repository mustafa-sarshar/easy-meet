import React from "react";

import "./styles.css";

const WelcomeScreen = (props) => {
  const { getAccessToken } = props;

  return props.showWelcomeScreen ? (
    <div className="welcome-screen">
      <div className="welcome-screen__title">
        <h1>Welcome to the Musto Easy-Meet</h1>
        <p>Find upcoming events around the world for full-stack developers</p>
      </div>
      <div className="welcome-screen__body" align="center">
        <h4>To use the app, you may sign in with your google account</h4>
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
        target="_blank"
        rel="nofollow noreferrer"
      >
        Privacy policy
      </a>
    </div>
  ) : null;
};
export default WelcomeScreen;
