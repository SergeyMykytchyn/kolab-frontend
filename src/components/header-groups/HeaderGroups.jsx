import React from "react";
import "./HeaderGroups.css";
import { Logout, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const HeaderGroups = () => {
  const history = useNavigate();

  const logout = () => {
    localStorage.removeItem("TOKEN");
    history("/");
  };

  return (
    <div className="header">
      <div className="headerContent">

        <div className="headerContentStart">
          <a href="/"><img className="logo" src="./assets/kolab-logo.svg" alt="Kolab" /></a>
          <span className="headerContentStartTitle">Dashboard</span>
        </div>

        <div className="headerContentEnd">
          <Add className="add" />
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
