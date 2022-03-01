import React, { useState, useContext } from "react";
import "./GroupCard.css";
import { MoreVert } from "@mui/icons-material";
import Api from "../../api/Api";
import { GroupsContext } from "../../context/GroupsContext"
// import { getConfig } from "../../constants";

const GroupCard = ({ group }) => {
  const { removeGroup, createGroup, user } = useContext(GroupsContext);
  const [toggleMoreVert, setToggleMoreVert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description);

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
      const response = await Api.delete(`/Group/${group.id}`, getConfig);
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
  };

  return (
    <div className="group-card">
      <div className="group-cardavatar">
        <div className="group-cardavatarCircle">
          <img className="group-cardavatarCircleIcon" src="./assets/avatar.svg" alt="avatar" />
        </div>
      </div>
      <div
        className="group-cardHeader"
        style={{
          backgroundImage: "url('./assets/backgroundImage.svg')"
        }}
      >
        <MoreVert className="moreVert" onClick={() => setToggleMoreVert(!toggleMoreVert)} />
        {toggleMoreVert ? <div className="toggleMoreVert">
          <button className="toggleMoreVertButton" onClick={() => { 
            setIsEditing(!isEditing);
            setToggleMoreVert(!toggleMoreVert);
          }}>Edit</button>
          <button className="toggleMoreVertButton" onClick={() => handleLeave()}>Leave</button>
          <button className="toggleMoreVertButton" onClick={() => handleDelete()}>Delete</button>
          <button className="toggleMoreVertButton" onClick={() => handleCopyId()}>Copy id</button>
        </div> : null }
      </div>
      <div className="group-cardContent">
        
        <div className="group-cardContentName">
          {group.isCreating || isEditing ? 
            <input onChange={e => setName(e.target.value)} value={name} className="group-cardContentNameInput" /> : 
            <a href={`/posts/${group.id}`}><span>{name}</span></a> }
        </div>
        
        <div className="group-cardContentCreator">
          <span>{group.creator.firstName + ' ' + group.creator.lastName}</span>
        </div>

        <div className="group-cardContentDescription">
          {group.isCreating || isEditing ? 
            <input onChange={e => setDescription(e.target.value)} value={description} className="group-cardContentDescriptionInput" /> : 
            <span>{description}</span> }
        </div>

        {isEditing ? <button className="group-cardContentEdit" onClick={() => handleEdit()}>Save</button> : null}
        {group.isCreating ? <button className="group-cardContentEdit" onClick={() => handleCreate()}>Save</button> : null}
        
      </div>
    </div>
  );
};

export default GroupCard;
