import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./GroupCard.css";
import GeoPattern from "geopattern";
import { MoreVert } from "@mui/icons-material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Api from "../../api/Api";
import { GroupsContext } from "../../context/GroupsContext";
import { SERVER_HOST } from "../../constants/index";
import { imageExists } from "../../utils/index";
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
  const history = useNavigate();
  const { removeGroup, createGroup, user } = useContext(GroupsContext);
  const [toggleMoreVert, setToggleMoreVert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description);

  const [imageCoverExistsValue, setImageCoverExistsValue] = useState(false);
  const [imageExistsValue, setImageExistsValue] = useState(false);

  const [imageCover, setImageCover] = useState(null);

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
    const binaryData = []
    binaryData.push(e.target.files[0]);
    const fileURL = new Blob(binaryData, {type: "image/*"});
    setFile(fileURL);
  };

  useEffect(() => {
    if (file) {
      setImageCover(window.URL.createObjectURL(file));
    }
  }, [file]);

  useEffect(() => {
    const checkIfImageExists = async () => {
      if (group.img) {
        const result = await imageExists(group.img);
        setImageCoverExistsValue(result);
      } else {
        setImageCoverExistsValue(false);
      }
    };

    checkIfImageExists();
  }, [group]);

  useEffect(() => {
    const checkIfImageExists = async () => {
      if (group.creator.img) {
        const result = await imageExists(group.creator.img);
        setImageExistsValue(result);
      } else {
        setImageExistsValue(false);
      }
    };

    checkIfImageExists();
  }, [group]);

  return (
    <>
      { group.isCreating || isEditing ? 
        <div className="group-card-view">
          <div className="group-card-avatar">
            <div className="group-card-avatarCircle" style={{ backgroundImage: group.creator.img ? `url('${SERVER_HOST}/${group.creator.img}')` : null }}>
              { !group.creator.img || (group.creator.img && !imageExistsValue) ? <img className="group-card-avatarCircleIcon" src="./assets/avatar.svg" alt="avatar" /> : null }
            </div>
          </div>
          <div
            className="group-card-Header"
            style={{
              backgroundImage: file ? `url(${imageCover})` : group.img && imageCoverExistsValue ? `url('${SERVER_HOST}/${group.img}')` : GeoPattern.generate(name).toDataUrl()
            }}
          >
            <input
              id="cover-file-input"
              type="file"
              accept="image/*"
              onChange={(event) => {
                handleUploadClick(event);
              }}
              hidden
            />
            <label
              className="cover-file-input-label"
              htmlFor="cover-file-input"
            >
              <AddAPhotoIcon
                className="cover-add-photo-icon"
              />
            </label>
            { !toggleMoreVert ? 
                <MoreVert
                  className="moreVert"
                  onClick={(event) => {
                    setToggleMoreVert(!toggleMoreVert)
                  }}
                /> : null }
            { toggleMoreVert ? <MoreVert className="moreVert" /> : null }
            {toggleMoreVert ?
              <div ref={toggleMoreVertRef} className="toggleMoreVert">
                {user.data.role === "teacher" && group.userId === user.data.id ? 
                  <button
                    className="toggleMoreVertButton"
                    onClick={(event) => {
                      setIsEditing(group.isCreating ? false : !isEditing);
                      setToggleMoreVert(!toggleMoreVert);
                    }}
                  >
                    Edit
                  </button> : null}
                { group.userId !== user.data.id ?
                  <button
                    className="toggleMoreVertButton"
                    onClick={(event) => {
                      handleLeave();
                    }}
                  >
                    Leave
                  </button> : null }
                { user.data.role === "teacher" && group.userId === user.data.id ?
                  <button
                    className="toggleMoreVertButton"
                    onClick={(event) => {
                      handleDelete();
                    }}
                  >
                    Delete
                  </button> : null}
                <button
                  className="toggleMoreVertButton"
                  onClick={(event) => {
                    handleCopyId();
                  }}
                >
                  Copy id
                </button>
              </div> : null }
          </div>
          <div className="group-card-Content">
            
            <div className="group-card-ContentName">
              <input onChange={e => setName(e.target.value)} value={name} className="group-card-ContentNameInput" />
            </div>
            
            <div className="group-card-ContentCreator">
              <span>{group.creator.firstName + ' ' + group.creator.lastName}</span>
            </div>

            <div className="group-card-ContentDescription">
              <input
                onChange={event => {
                  setDescription(event.target.value);
                }}
                value={description}
                className="group-card-ContentDescriptionInput"
              />
            </div>

            {isEditing ?
              <button
                className="group-card-ContentEdit"
                onClick={(event) => {
                  handleEdit();
                }}
              >
                Save
              </button> : null}
            {group.isCreating ? 
              <button
                className="group-card-ContentEdit"
                onClick={(event) => {
                  handleCreate();
                }}
              >
                Save
              </button> : null}
            
          </div>
        </div> : null }
      { !group.isCreating && !isEditing ? 
        <button className="group-card-link" onClick={() => history(`/posts/${group.id}`) } >
          <div className="group-card">
            <div className="group-card-avatar">
              <div className="group-card-avatarCircle" style={{ backgroundImage: group.creator.img ? `url('${SERVER_HOST}/${group.creator.img}')` : null }}>
                { !group.creator.img || (group.creator.img && !imageExistsValue) ? <img className="group-card-avatarCircleIcon" src="./assets/avatar.svg" alt="avatar" /> : null }
              </div>
            </div>
            <div
              className="group-card-Header"
              style={{
                backgroundImage: file ? `url(${imageCover})` : group.img && imageCoverExistsValue ? `url('${SERVER_HOST}/${group.img}')` : GeoPattern.generate(name).toDataUrl()
              }}
            >
              { !toggleMoreVert ? 
                  <MoreVert
                    className="moreVert"
                    onClick={(event) => {
                      event.stopPropagation();
                      setToggleMoreVert(!toggleMoreVert)
                    }}
                  /> : null }
              { toggleMoreVert ? <MoreVert className="moreVert" /> : null }
              {toggleMoreVert ?
                <div ref={toggleMoreVertRef} className="toggleMoreVert">
                  {user.data.role === "teacher" && group.userId === user.data.id ? 
                    <button
                      className="toggleMoreVertButton"
                      onClick={(event) => {
                        event.stopPropagation();
                        setIsEditing(group.isCreating ? false : !isEditing);
                        setToggleMoreVert(!toggleMoreVert);
                      }}
                    >
                      Edit
                    </button> : null}
                  { group.userId !== user.data.id ?
                    <button
                      className="toggleMoreVertButton"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleLeave();
                      }}
                    >
                      Leave
                    </button> : null }
                  { user.data.role === "teacher" && group.userId === user.data.id ?
                    <button
                      className="toggleMoreVertButton"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete();
                      }}
                    >
                      Delete
                    </button> : null}
                  <button
                    className="toggleMoreVertButton"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleCopyId();
                    }}
                  >
                    Copy id
                  </button>
                </div> : null }
            </div>
            <div className="group-card-Content">
              
              <div className="group-card-ContentName">
                <span>{name}</span>
              </div>
              
              <div className="group-card-ContentCreator">
                <span>{group.creator.firstName + ' ' + group.creator.lastName}</span>
              </div>

              <div className="group-card-ContentDescription">
                <span>{description}</span>
              </div>
              
            </div>
          </div>
        </button> : null }
    </>
  );
};

export default GroupCard;
