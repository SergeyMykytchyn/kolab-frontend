import React, { useState } from "react";
import "./SignUpForm.css";
import TextField from "@mui/material/TextField";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameClicked, setFirstNameClicked] = useState(false);
  
  const [lastName, setLastName] = useState("");
  const [lastNameClicked, setLastNameClicked] = useState(false);

  const [email, setEmail] = useState("");
  const [emailClicked, setEmailClicked] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordClicked, setPasswordClicked] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordClicked, setConfirmPasswordClicked] = useState(false);

  return (
    <form className="sign-up-form">
      <div className="sign-up-card">
        <div className="sign-up-cardTitle"><span class="sign-up-cardTitleText">Sign up</span></div>
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
                visibility: !confirmPasswordClicked || confirmPassword ? "hidden" : "visible"
              }
            }}
            required
            error={!confirmPasswordClicked || confirmPassword ? false: true}
            id="filled-error-helper-text-required"
            label="Confrim password"
            variant="filled"
            helperText="Confrim password is required"
            fullWidth
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            onBlur={() => setConfirmPasswordClicked(true)}
          />

        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
