import React, { useState, useContext } from "react";
import "./SignInForm.css";
import TextField from "@mui/material/TextField";
import { UserContext } from "../../context/UserContext";
import Api from "../../api/Api";
import Dialog from "../dialog/Dialog";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [emailClicked, setEmailClicked] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordClicked, setPasswordClicked] = useState(false);

  const [isIncorrectData, setIsIncorrectData] = useState(false);

  const { setToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post("/User/sign-in", {
        email,
        password
      }).then(response => {
        localStorage.setItem("TOKEN", response.data.token);
        setToken(response.data.token);
      }).catch(err => {
        setIsIncorrectData(err.response.data.message);
      });
    } catch(err) {
      console.error(err);
    }
  };
  
  return (
    <>
      {isIncorrectData ? <Dialog handleClose={() => setIsIncorrectData(false)}>
        <div className="overlay-pane-title">
          <span>Error</span>
        </div>
        <div className="overlay-pane-message">
          <span>{isIncorrectData}</span>
        </div>
        <div className="overlay-pane-button-wrapper">
          <button onClick={() => setIsIncorrectData(false)} className="overlay-pane-button">Ok</button>
        </div>
      </Dialog> : null }
      <form className="sign-in-form">
        <div className="card">
          <div className="cardTitle"><span className="cardTitleText">Sign in</span></div>

            <TextField
              sx={{
                marginBottom: "8px",
                ".MuiFormHelperText-root": {
                  visibility: !emailClicked || email ? "hidden" : "visible"
                }
              }}
              required
              error={!emailClicked || email ? false: true}
              id="email"
              label="Email"
              variant="filled"
              helperText="Email is required"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setEmailClicked(true)}
            />

            <TextField
              sx={{
                marginBottom: "8px",
                ".MuiFormHelperText-root": {
                  visibility: !passwordClicked || password ? "hidden" : "visible"
                }
              }}
              required
              error={!passwordClicked || password ? false: true}
              id="password"
              label="Password"
              variant="filled"
              helperText="Password is required"
              fullWidth
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => setPasswordClicked(true)}
            />

            <button className="submitButton" onClick={handleSubmit}>
              <span className="submitButtonText">Sign in</span>
            </button>

        </div>
      </form>
    </>
  );
};

export default SignInForm;
