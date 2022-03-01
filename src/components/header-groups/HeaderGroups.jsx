import React, { useState } from "react";
import "./HeaderGroups.css";
import { Logout, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const HeaderGroups = ({ user }) => {
  const history = useNavigate();

  const [toggleAdd, setToggleAdd] = useState(false);

  const logout = () => {
    localStorage.removeItem("TOKEN");
    history("/");
  };

  const toggleAddClick = () => {
    setToggleAdd(!toggleAdd);
  };

  return (
    <div className="header">
      <div className="headerContent">

        <div className="headerContentStart">
          <a href="/"><img className="logo" src="./assets/kolab-logo.svg" alt="Kolab" /></a>
          <span className="headerContentStartTitle">Dashboard</span>
        </div>

        <div className="headerContentEnd">
          <Add className="add" onClick={() => toggleAddClick()} />
          {toggleAdd ? <div className="toggleAdd">
            { user.data.role === "teacher" ? <button className="toggleAddButton">Create a project</button> : null }
            <button className="toggleAddButton">Join the project</button>
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
  );
};

export default HeaderGroups;
