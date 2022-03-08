import React, { useState, useContext, useEffect, useRef } from "react";
import "./GroupCard.css";
import GeoPattern from "geopattern";
import { MoreVert } from "@mui/icons-material";
import Api from "../../api/Api";
import { GroupsContext } from "../../context/GroupsContext";
import { SERVER_HOST } from "../../constants/index";
// import { getConfig } from "../../constants";

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

const GroupCard = ({ group }) => {
  const { removeGroup, createGroup, user } = useContext(GroupsContext);
  const [toggleMoreVert, setToggleMoreVert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description);

  const toggleMoreVertRef = useRef(null);
  useOutsideAlerter(toggleMoreVertRef, () => setToggleMoreVert(false));

  const handleEdit = async () => {
    try {
      const payload = {
        ...group,
        name,
        description,
      };
      const getConfig = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
          "Accept": "application/json"
        }
      };
      const response = await Api.put("/Group", payload, getConfig);
      setIsEditing(false);
    } catch(err) {
      console.error(err.message);
    }
  };

  const handleCreate = async () => {
    try {
      const payload = {
        name,
        description,
      };
      const getConfig = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
          "Accept": "application/json"
        }
      };
      const response = await Api.post("/Group", payload, getConfig);
      const newGroup = {
        ...response.data,
        creator: {
          firstName: user.data.firstName,
          lastName: user.data.lastName
        }
      };
      createGroup(newGroup, group);
    } catch(err) {
      console.error(err.message);
    }
  };

  const handleLeave = async () => {
    try {
      const getConfig = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
          "Accept": "application/json"
        }
      };
      const response = await Api.post(`/User/leave-group?groupId=${group.id}`, {}, getConfig);
      removeGroup(group);
    } catch(err) {
      console.error(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const getConfig = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
          "Accept": "application/json"
        }
      };
      if (group.id !== Infinity) {
        const response = await Api.delete(`/Group/${group.id}`, getConfig);
      }
      removeGroup(group);
    } catch(err) {
      console.error(err.message);
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(group.identificator).then(
      () => console.log('Successful copy'),
      () => console.log('Cannot copy!')
    );
    setToggleMoreVert(false);
  };

  return (
    <div className="group-card">
      <div className="group-card-avatar">
        <div className="group-card-avatarCircle" style={{ backgroundImage: user.data && user.data.img ? `url('${SERVER_HOST}/${user.data.img}')` : null }}>
          { user.data && !user.data.img ? <img className="group-card-avatarCircleIcon" src="./assets/avatar.svg" alt="avatar" /> : null }
        </div>
      </div>
      <div
        className="group-card-Header"
        style={{
          backgroundImage: GeoPattern.generate(name).toDataUrl()
        }}
      >
        { !toggleMoreVert ? <MoreVert className="moreVert" onClick={() => setToggleMoreVert(!toggleMoreVert)} /> : null }
        { toggleMoreVert ? <MoreVert className="moreVert" /> : null }
        {toggleMoreVert ? <div ref={toggleMoreVertRef} className="toggleMoreVert">
          {user.data.role === "teacher" && group.userId === user.data.id ? 
            <button className="toggleMoreVertButton" onClick={() => { 
              setIsEditing(!isEditing);
              setToggleMoreVert(!toggleMoreVert);
            }}>
              Edit
            </button> : null}
          { group.userId !== user.data.id ? <button className="toggleMoreVertButton" onClick={() => handleLeave()}>Leave</button> : null }
          {user.data.role === "teacher" && group.userId === user.data.id ? <button className="toggleMoreVertButton" onClick={() => handleDelete()}>Delete</button> : null}
          <button className="toggleMoreVertButton" onClick={() => handleCopyId()}>Copy id</button>
        </div> : null }
      </div>
      <div className="group-card-Content">
        
        <div className="group-card-ContentName">
          {group.isCreating || isEditing ? 
            <input onChange={e => setName(e.target.value)} value={name} className="group-card-ContentNameInput" /> : 
            <a href={`/posts/${group.id}`}><span>{name}</span></a> }
        </div>
        
        <div className="group-card-ContentCreator">
          <span>{group.creator.firstName + ' ' + group.creator.lastName}</span>
        </div>

        <div className="group-card-ContentDescription">
          {group.isCreating || isEditing ? 
            <input onChange={e => setDescription(e.target.value)} value={description} className="group-cardContentDescriptionInput" /> : 
            <span>{description}</span> }
        </div>

        {isEditing ? <button className="group-card-ContentEdit" onClick={() => handleEdit()}>Save</button> : null}
        {group.isCreating ? <button className="group-card-ContentEdit" onClick={() => handleCreate()}>Save</button> : null}
        
      </div>
    </div>
  );
};

export default GroupCard;
