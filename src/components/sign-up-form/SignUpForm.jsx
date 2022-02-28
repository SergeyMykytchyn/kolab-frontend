import React, { useState } from "react";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form className="sign-up-form">
      <div className="sign-up-card">
        <div className="sign-up-cardTitle"><span class="sign-up-cardTitleText">Sign up</span></div>
        <div>
          
          <label for="inp" class="inp">
            <input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              type="text"
              id="inp"
              placeholder="&nbsp;"
            />
            <span class="label">First name</span>
            <span class="focus-bg"></span>
          </label>

          <label for="inp" class="inp">
            <input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              type="text"
              id="inp"
              placeholder="&nbsp;"
            />
            <span class="label">Last name</span>
            <span class="focus-bg"></span>
          </label>

          <label for="inp" class="inp">
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="text"
              id="inp"
              placeholder="&nbsp;"
            />
            <span class="label">Email</span>
            <span class="focus-bg"></span>
          </label>

          <label for="inp" class="inp">
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="text"
              id="inp"
              placeholder="&nbsp;"
            />
            <span class="label">Password</span>
            <span class="focus-bg"></span>
          </label>

          <label for="inp" class="inp">
            <input
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              type="text"
              id="inp"
              placeholder="&nbsp;"
            />
            <span class="label">Confirm password</span>
            <span class="focus-bg"></span>
          </label>

        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
