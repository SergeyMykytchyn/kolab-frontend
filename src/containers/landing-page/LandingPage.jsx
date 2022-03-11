import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <div className="landing-container">
        <div className="landing-header">
          <img className="landing-logo" src="./assets/kolab-logo.svg" alt="Kolab"/>
          <div className="landing-headerButtons">
            <span className="landing-headerButtonsSignIn"><a href="/sign-in">Sign In</a></span>
            <a href="/sign-up">
              <div className="landing-headerButtonsSignUp">
                <span className="landing-headerButtonsSignUpText">Sign up free</span>
              </div>
            </a>
          </div>
        </div>
        <div className="landing-hr"></div>
        <div className="landing-content">
          <img className="landing-line" src="./assets/line.svg" alt="line"/>
          <img className="landing-stars" src="./assets/stars.svg" alt="stars"/>
          <div className="landing-contentLeft">
            <img className="landing-ellipse" src="./assets/bg-allipse.svg" alt="ellipse"/>
            <img className="landing-plane" src="./assets/plane.svg" alt="palane"/>
            <div className="landing-contentLeftTop">
              <span className="landing-contentLeftTopTitle">New Home for Collaboration</span>
              <span className="landing-contentLeftTopText">The online collaborative whiteboard platform to bring teams together, anytime, anywhere.</span>
              <a href="/sign-up">
                <div className="landing-contentLeftTopButton">
                  <span className="landing-contentLeftTopButtonText">Get Started</span>
                  <img className="landing-arrow" src="./assets/arrow-right.svg" alt="arrow"/>
                </div>
              </a>
              <span className="landing-contentLeftCenterText">Free forever — no credit card required.</span>
            </div>
            <img className="landing-contentLeftBottom" src="./assets/landing-illustration-2.svg" alt="landing-illustration-2"/>
          </div>
          <div className="landing-contentRight">
            <div className="landing-contentRightBottom landing-contentRightBottomBefore">
              <span className="landing-contentRightBottomTitle">Stay organized and connected</span>
              <span className="landing-contentRightBottomText">Bring your team's work together in one shared space. Choose the project view that suits your style, and collaborate no matter where you are.</span>
            </div>
            <img className="landing-illustration-1" src="./assets/landing-illustration-1.svg" alt="landing-illustration-1"/>
            <div className="landing-contentRightBottom">
              <span className="landing-contentRightBottomTitle">Stay organized and connected</span>
              <span className="landing-contentRightBottomText">Bring your team's work together in one shared space. Choose the project view that suits your style, and collaborate no matter where you are.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
