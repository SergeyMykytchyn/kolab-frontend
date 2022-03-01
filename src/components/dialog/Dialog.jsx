import React from "react";
import "./Dialog.css";

const Dialog = ({ children }) => {
  return (
    <div className="overlay-container">
      <div className="overlay-backdrop"></div>
      <div className="global-overlay-wrapper">
        <div className="overlay-pane">
          { children }
        </div>
      </div>
    </div>
  );
};

export default Dialog;
