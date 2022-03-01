import React from "react";
import "./IncorrectDataDialog.css";

const IncorrectDataDialog = ({ handleOk, title, message }) => {
  return (
    <div className="overlay-container">
      <div className="overlay-backdrop"></div>
      <div className="global-overlay-wrapper">
        <div className="overlay-pane">
          <div className="overlay-pane-title">
            <span>{title}</span>
          </div>
          <div className="overlay-pane-message">
            <span>{message}</span>
          </div>
          <div className="overlay-pane-button-wrapper">
            <button onClick={() => handleOk()} className="overlay-pane-button">Ok</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncorrectDataDialog;
