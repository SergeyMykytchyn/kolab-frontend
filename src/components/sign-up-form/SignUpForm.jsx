import React, { useState } from "react";
import "./SignUpForm.css";
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";
import Dialog from "../dialog/Dialog";

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

  const [role, setRole] = useState("");
  const [roleClicked, setRoleClicked] = useState(false);

  const [isIncorrectData, setIsIncorrectData] = useState(false);

  const roles = [
    { label: "Employee", value: "student" },
    { label: "Manager", value: "teacher" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post("/User/sign-up", {
        email,
        firstName,
        lastName,
        password,
        passwordConfirm,
        role
      }).then(res => history("/sign-in"))
        .catch(err => setIsIncorrectData(err.response.data.message));
    } catch(err) {
      console.error(err.message);
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

            <FormControl
              sx={{
                marginBottom: "8px",
                ".MuiFormHelperText-root": {
                  visibility: !roleClicked || role ? "hidden" : "visible"
                }
              }}
              required
              error={!roleClicked || role ? false: true}
              onBlur={() => setRoleClicked(true)}
              variant="filled"
              fullWidth
            > 
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <MenuItem value="student">Employee</MenuItem>
                <MenuItem value="teacher">Manager</MenuItem>
              </Select>
              <FormHelperText>Role is required</FormHelperText>
            </FormControl>

          </div>
          
          <button className="submitButton" onClick={handleSubmit}>
            <span className="submitButtonText">Sign up</span>
          </button>

        </div>
      </form>
    </>
  );
};

export default SignUpForm;
