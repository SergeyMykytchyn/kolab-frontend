import React, { useState, useContext, useRef, useEffect } from "react";
import "./HeaderGroups.css";
import { Logout, Add } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { GroupsContext } from "../../context/GroupsContext"
import Dialog from "../dialog/Dialog";
import Api from "../../api/Api";
import { HOST } from "../../constants/index";
import { SERVER_HOST } from "../../constants/index";

const useOutsideAlerter = (ref, handleClose) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        // event.stopPropagation();
        handleClose();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const HeaderGroups = ({ title, displayAdd, profile }) => {
  const { addGroup, user } = useContext(GroupsContext);
  const history = useNavigate();

  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleJoin, setToggleJoin] = useState(false);
  const [joinId, setJoinId] = useState("");

  const toggleAddRef = useRef(null);
  useOutsideAlerter(toggleAddRef, () => setToggleAdd(false));

  const logout = () => {
    localStorage.removeItem("TOKEN");
    history("/");
  };

  const handleCreate = () => {
    const newGroup = {
      id: Infinity,
      name: "Name",
      description: "Description",
      creator: {
        ...user.data
      },
      isCreating: true,
      userId: user.data.id
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
      const newGroup = await Api.post("/Group/add-with-identificator", { identificator: joinId }, getConfig);
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
            <a href="/groups"><img className="logo" src={`${HOST}/assets/kolab-logo.svg`} alt="Kolab" /></a>
            <span className="headerContentStartTitle">{title}</span>
          </div>

          <div className="headerContentEnd">
            { displayAdd && !toggleAdd ? <Add className="add" onClick={() => setToggleAdd(!toggleAdd)} /> : null }
            { displayAdd && toggleAdd ? <Add className="add" /> : null }
            { toggleAdd ? 
              <div ref={toggleAddRef} className="toggleAdd">
                { user.data.role === "teacher" ? <button className="toggleAddButton" onClick={handleCreate}>Create a project</button> : null }
                <button className="toggleAddButton" onClick={handleJoin}>Join the project</button>
              </div> : null }
            { !profile ? 
              <div className="avatar">
                <a href="/profile">
                  <div className="avatarCircle" style={{ backgroundImage: user.data && user.data.img ? `url('${SERVER_HOST}/${user.data.img}')` : null }}>
                    { user.data && !user.data.img ? <img className="avatarIcon" src={`${HOST}/assets/avatar.svg`} alt="avatar" /> : null }
                  </div>
                </a>
              </div> : null}
            <Logout className="logout" onClick={() => logout()} />
          </div>

        </div>
      </div>
    </>
  );
};

export default HeaderGroups;
