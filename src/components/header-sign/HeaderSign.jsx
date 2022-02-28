import React from "react";
import "./HeaderSign.css";

const HeaderSign = () => {
  return (
    <div className="sign-header">
      <div className="sign-headerContent">
        <a href="/"><img className="sign-logo" src="./assets/kolab-logo.svg" alt="Kolab"/></a>
        <div className="sign-headerButtons">
          <span className="sign-headerButtonsSignIn"><a href="/sign-in">Sign In</a></span>
          <a href="/sign-up">
            <div className="sign-headerButtonsSignUp">
              <span className="sign-headerButtonsSignUpText">Sign up free</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderSign;
