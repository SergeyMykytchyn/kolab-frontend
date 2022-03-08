import React, { useState, useContext, useEffect, useRef } from "react";
import "./GroupCard.css";
import GeoPattern from "geopattern";
import { MoreVert } from "@mui/icons-material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
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

  const [file, setFile] = useState(null);

  const toggleMoreVertRef = useRef(null);
  useOutsideAlerter(toggleMoreVertRef, () => setToggleMoreVert(false));

  const handleEdit = async () => {
    try {
      const getConfig = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
          "Accept": "application/json"
        }
      };
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("id", group.id);
      formData.append("img", file);
      const response = await Api.put("/Group", formData, getConfig);
      setIsEditing(false);
    } catch(err) {
      console.error(err.message);
    }
  };

  const handleCreate = async () => {
    try {
      // const payload = {
      //   name,
      //   description,
      // };
      const getConfig = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
          "Accept": "application/json"
        }
      };
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("img", file);
      const response = await Api.post("/Group", formData, getConfig);
      const newGroup = {
        ...response.data,
        creator: {
          ...user.data
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

  const handleUploadClick = (e) => {
    setFile(e.target.files[0]);
  };

  const binaryData = []
  binaryData.push(file);
  const fileURL = new Blob(binaryData, {type: "image/*"});

  return (
    <div className="group-card">
      <div className="group-card-avatar">
        <div className="group-card-avatarCircle" style={{ backgroundImage: group.creator.img ? `url('${SERVER_HOST}/${group.creator.img}')` : null }}>
          { !group.creator.img ? <img className="group-card-avatarCircleIcon" src="./assets/avatar.svg" alt="avatar" /> : null }
        </div>
      </div>
      <div
        className="group-card-Header"
        style={{
          backgroundImage: file ? `url(${window.URL.createObjectURL(fileURL)})` : group.img ? `url('${SERVER_HOST}/${group.img}')` : GeoPattern.generate(name).toDataUrl()
        }}
      >
        { group.isCreating || isEditing ?
          <>
            <input id="cover-file-input" type="file" accept="image/*" onChange={handleUploadClick} hidden/>
            <label className="cover-file-input-label" htmlFor="cover-file-input" >
              <AddAPhotoIcon
                className="cover-add-photo-icon"
              />
            </label>
          </>
          : null}
        { !toggleMoreVert ? <MoreVert className="moreVert" onClick={() => setToggleMoreVert(!toggleMoreVert)} /> : null }
        { toggleMoreVert ? <MoreVert className="moreVert" /> : null }
        {toggleMoreVert ? <div ref={toggleMoreVertRef} className="toggleMoreVert">
          {user.data.role === "teacher" && group.userId === user.data.id ? 
            <button className="toggleMoreVertButton" onClick={() => { 
              setIsEditing(group.isCreating ? false : !isEditing);
              setToggleMoreVert(!toggleMoreVert);
            }}>
              Edit
            </button> : null}
          { group.userId !== user.data.id ? <button className="toggleMoreVertButton" onClick={() => handleLeave()}>Leave</button> : null }
          { user.data.role === "teacher" && group.userId === user.data.id ? <button className="toggleMoreVertButton" onClick={() => handleDelete()}>Delete</button> : null}
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
