import React, { useState } from "react";
import "./SignUpForm.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";

const SignUpForm = () => {
  const history = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [firstNameClicked, setFirstNameClicked] = useState(false);
  
  const [lastName, setLastName] = useState("");
  const [lastNameClicked, setLastNameClicked] = useState(false);

  const [email, setEmail] = useState("");
  const [emailClicked, setEmailClicked] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordClicked, setPasswordClicked] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmClicked, setPasswordConfirmClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/User/sign-up", {
        email,
        firstName,
        lastName,
        password,
        passwordConfirm,
        role: "student"
      });
      console.log(response);
      history("/sign-in");
    } catch(err) {
      console.error(err.message);
    }
  };

  return (
    <form className="sign-up-form">
      <div className="sign-up-card">
        <div className="sign-up-cardTitle"><span className="sign-up-cardTitleText">Sign up</span></div>
        <div>

          <TextField
            sx={{
              marginBottom: "8px",
              ".MuiFormHelperText-root": {
                visibility: !firstNameClicked || firstName ? "hidden" : "visible"
              }
            }}
            required
            error={!firstNameClicked || firstName ? false: true}
            id="filled-error-helper-text-required"
            label="First name"
            variant="filled"
            helperText="First name is required"
            fullWidth
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            onBlur={() => setFirstNameClicked(true)}
          />
          
          <TextField
            sx={{
              marginBottom: "8px",
              ".MuiFormHelperText-root": {
                visibility: !lastNameClicked || lastName ? "hidden" : "visible"
              }
            }}
            required
            error={!lastNameClicked || lastName ? false: true}
            id="filled-error-helper-text-required"
            label="Last name"
            variant="filled"
            helperText="Last name is required"
            fullWidth
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            onBlur={() => setLastNameClicked(true)}
          />

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

          <TextField
            sx={{
              marginBottom: "8px",
              ".MuiFormHelperText-root": {
                visibility: !passwordConfirmClicked || passwordConfirm ? "hidden" : "visible"
              }
            }}
            required
            error={!passwordConfirmClicked || passwordConfirm ? false: true}
            id="filled-error-helper-text-required"
            label="Confirm password"
            variant="filled"
            helperText="Confirm password is required"
            fullWidth
            type="password"
            autoComplete="new-password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            onBlur={() => setPasswordConfirmClicked(true)}
          />

        </div>
        
        <button className="submitButton" onClick={handleSubmit}>
          <span className="submitButtonText">Sign up</span>
        </button>

      </div>
    </form>
  );
};

export default SignUpForm;
