import React, { useEffect, useContext, useState } from "react";
import "./ProfileForm.css";
import TextField from "@mui/material/TextField";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { GroupsContext } from "../../context/GroupsContext";
import Api from "../../api/Api";
import { SERVER_HOST } from "../../constants/index";
import { HOST } from "../../constants/index";
import Dialog from "../dialog/Dialog";
import { imageExists } from "../../utils/index";

const ProfileForm = () => {
  const { user, setUser } = useContext(GroupsContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isIncorrectData, setIsIncorrectData] = useState(false);
  const [successfullUpdate, setSuccessfullUpdate] = useState(false);

  const [imageExistsValue, setImageExistsValue] = useState(false);

  const [file, setFile] = useState(null);

  const [isShown, setIsShown] = useState(false);

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

  useEffect(() => {
    const checkIfImageExists = async () => {
      if (user) {
        const result = await imageExists(user.img);
        setImageExistsValue(result);
      } else {
        setImageExistsValue(false);
      }
    };

    checkIfImageExists();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getConfig = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
          "Accept": "application/json"
        }
      };
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("img", file);
      Api.put("/User/update", formData, getConfig)
        .then(response => {
          setUser(response.data);
          setSuccessfullUpdate("Your data has been successfully updated");
        })
        .catch(err => setIsIncorrectData(err.response.data.message));
    } catch(err) {
      console.error(err.message);
    }
  };

  const handleUploadClick = (e) => {
    setFile(e.target.files[0]);
  };

  const binaryData = []
  binaryData.push(file);
  const fileURL = new Blob(binaryData, {type: "image/*"}); 

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
          <div onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} className="profile-avatarCircle"
            style={{
              backgroundImage: file ? `url(${window.URL.createObjectURL(fileURL)})` : user.img ? `url('${SERVER_HOST}/${user.img}')` : null,
              backgroundColor: file || user.img ? null : "#76b1a6"
            }}
          >
            <input id="avatar-file-input" type="file" accept="image/*" onChange={handleUploadClick} hidden/>
            {isShown ? <label className="file-input-label" htmlFor="avatar-file-input" >
              <AddAPhotoIcon className="add-photo-icon"/>
            </label> : null }
            { (!user.img && !file) || (!imageExistsValue && !file) ? <img className="profile-avatarIcon" src={`${HOST}/assets/avatar.svg`} alt="avatar" /> : null }
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
