import React, { useState, useContext } from "react";
import axios from "axios";
import "./HeaderGroups.css";
import { Logout, Add } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { GroupsContext } from "../../context/GroupsContext"
import Dialog from "../dialog/Dialog";
import Api from "../../api/Api";

const HeaderGroups = () => {
  const { addGroup, user } = useContext(GroupsContext);
  const history = useNavigate();

  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleJoin, setToggleJoin] = useState(false);
  const [joinId, setJoinId] = useState("");

  const logout = () => {
    localStorage.removeItem("TOKEN");
    history("/");
  };

  const toggleAddClick = () => {
    setToggleAdd(!toggleAdd);
  };

  const handleCreate = () => {
    const newGroup = {
      id: -1,
      name: "Name",
      description: "Description",
      creator: {
        firstName: user.data.firstName,
        lastName: user.data.lastName
      },
      isCreating: true
    };
    setToggleAdd(false);
    addGroup(newGroup);
  };

  const handleJoin = () => {
    setToggleJoin(true);
    setToggleAdd(false);
  };

  const handleJoinSubmit = async () => {
    try {
      setToggleJoin(false);
      const getConfig = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
          "Content-Type": "application/json"
        }
      };
      const newGroup = await axios({
        method: "post",
        url: "https://localhost:44343/api/Group/add-with-identificator",
        headers: getConfig.headers,
        data: JSON.stringify(joinId)
      });
      addGroup(newGroup.data);
    } catch(err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {toggleJoin ? 
        <Dialog handleClose={() => setToggleJoin(false)}>
          <div className="dialog-join-title">
            <span>Join the project</span>
          </div>
          <div className="dialog-join-input">
            <TextField
              fullWidth
              label="Id"
              value={joinId}
              onChange={e => setJoinId(e.target.value)}
            />
          </div>
          <div className="overlay-pane-button-wrapper">
            <button className="overlay-pane-button" onClick={() => handleJoinSubmit()}>Join</button>
          </div>
        </Dialog> : null }
      <div className="header">
        <div className="headerContent">

          <div className="headerContentStart">
            <a href="/"><img className="logo" src="./assets/kolab-logo.svg" alt="Kolab" /></a>
            <span className="headerContentStartTitle">Dashboard</span>
          </div>

          <div className="headerContentEnd">
            <Add className="add" onClick={() => toggleAddClick()} />
            {toggleAdd ? <div className="toggleAdd">
              { user.data.role === "teacher" ? <button className="toggleAddButton" onClick={() => handleCreate()}>Create a project</button> : null }
              <button className="toggleAddButton" onClick={() => handleJoin()}>Join the project</button>
            </div> : null }
            <div className="avatar">
              <a href="/">
                <div className="avatarCircle">
                  <img className="avatarIcon" src="./assets/avatar.svg" alt="avatar" />
                </div>
              </a>
            </div>
            <Logout className="logout" onClick={() => logout()} />
          </div>

        </div>
      </div>
    </>
  );
};

export default HeaderGroups;
