import React, { useState, useEffect } from "react";
import "./SignInForm.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";

const SignInForm = () => {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [emailClicked, setEmailClicked] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordClicked, setPasswordClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/User/sign-in", {
        email,
        password
      });
      console.log(response.data.token);
      localStorage.setItem("TOKEN", response.data.token);
      history("/groups");
    } catch(err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("TOKEN") != null) {
      history("/groups");
    }
  }, []);

  return (
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
            id="filled-error-helper-text-required"
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
            id="filled-error-helper-text-required"
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
  );
};

export default SignInForm;
