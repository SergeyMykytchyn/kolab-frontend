import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="header">
        <img className="logo" src="./assets/kolab-logo.svg" alt="Kolab"/>
        <div className="headerButtons">
          <span className="headerButtonsSignIn"><a href="/sign-in">Sign In</a></span>
          <a href="/sign-up">
            <div className="headerButtonsSignUp">
              <span className="headerButtonsSignUpText">Sign up free</span>
            </div>
          </a>
        </div>
      </div>
      <div className="hr"></div>
      <div className="content">
        <img className="line" src="./assets/line.svg" alt="line"/>
        <img className="stars" src="./assets/stars.svg" alt="stars"/>
        <div className="contentLeft">
          <img className="ellipse" src="./assets/bg-allipse.svg" alt="ellipse"/>
          <img className="plane" src="./assets/plane.svg" alt="palane"/>
          <div className="contentLeftTop">
            <span className="contentLeftTopTitle">New Home for Collaboration</span>
            <span className="contentLeftTopText">The online collaborative whiteboard platform to bring teams together, anytime, anywhere.</span>
            <a href="/sign-up">
              <div className="contentLeftTopButton">
                <span className="contentLeftTopButtonText">Get Started</span>
                <img className="arrow" src="./assets/arrow-right.svg" alt="arrow"/>
              </div>
            </a>
          </div>
          <span className="contentLeftCenterText">Free forever — no credit card required.</span>
          <img className="contentLeftBottom" src="./assets/landing-illustration-2.svg" alt="landing-illustration-2"/>
        </div>
        <div className="contentRight">
          <img src="./assets/landing-illustration-1.svg" alt="landing-illustration-1"/>
          <div className="contentRightBottom">
            <span className="contentRightBottomTitle">Stay organized and connected</span>
            <span className="contentRightBottomText">Bring your team's work together in one shared space. Choose the project view that suits your style, and collaborate no matter where you are.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
