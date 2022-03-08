import React, { useEffect, useContext, useState } from "react";
import "./ProfileForm.css";
import TextField from "@mui/material/TextField";
import { GroupsContext } from "../../context/GroupsContext";
import Api from "../../api/Api";
import { SERVER_HOST } from "../../constants/index";
import { HOST } from "../../constants/index";
import Dialog from "../dialog/Dialog";

const ProfileForm = () => {
  const { user, setUser } = useContext(GroupsContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isIncorrectData, setIsIncorrectData] = useState(false);
  const [successfullUpdate, setSuccessfullUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getConfig = {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
            "Accept": "application/json"
          }
        };
        const user = await Api.get("/User/user-info", getConfig);
        setUser(user.data);
        setFirstName(user.data.firstName);
        setLastName(user.data.lastName);
        setEmail(user.data.email);
      } catch(err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getConfig = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
          "Accept": "application/json"
        }
      };
      const payload = {
        firstName,
        lastName,
        email,
        password
      };
      Api.put("/User/update", payload, getConfig)
        .then(response => {
          setUser(response.data);
          setSuccessfullUpdate("Your data has been successfully updated");
        })
        .catch(err => setIsIncorrectData(err.response.data.message));
    } catch(err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {isIncorrectData ? 
        <Dialog handleClose={() => setIsIncorrectData(false)}>
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
      {successfullUpdate ? 
        <Dialog handleClose={() => setSuccessfullUpdate(false)}>
          <div className="overlay-pane-title">
            <span>Success</span>
          </div>
          <div className="overlay-pane-message">
            <span>{successfullUpdate}</span>
          </div>
          <div className="overlay-pane-button-wrapper">
            <button onClick={() => setSuccessfullUpdate(false)} className="overlay-pane-button">Ok</button>
          </div>
        </Dialog> : null }
      <form className="profile-form-container">
        <div className="profile-form">
          <div className="profile-avatarCircle" style={{ backgroundImage: user.img ? `url('${SERVER_HOST}/${user.img}')` : null }}>
            { !user.img ? <img className="profile-avatarIcon" src={`${HOST}/assets/avatar.svg`} alt="avatar" /> : null }
          </div>

            <TextField
              sx={{
                marginBottom: "16px"
              }}
              label="First name"
              variant="filled"
              fullWidth
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />

            <TextField
              sx={{
                marginBottom: "16px"
              }}
              label="Last name"
              variant="filled"
              fullWidth
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />

            <TextField
              sx={{
                marginBottom: "16px"
              }}
              label="Email"
              variant="filled"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <TextField
              sx={{
                marginBottom: "16px"
              }}
              label="Password"
              variant="filled"
              fullWidth
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button className="submitButton" onClick={handleSubmit}>
              <span className="submitButtonText">Save</span>
            </button>

        </div>
      </form>
    </>
  );
};

export default ProfileForm;
