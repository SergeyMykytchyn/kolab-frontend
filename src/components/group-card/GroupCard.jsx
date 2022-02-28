import React, { useState } from "react";
import "./GroupCard.css";

const GroupCard = ({ group }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description);

  let descriptionInfo;
  if (description.split(">").length === 9) {
    descriptionInfo = description.split(">")[7].split("<")[0];
  } else {
    descriptionInfo = description;
  }
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
      </div>
      <div className="group-cardContent">
        
        <div className="group-cardContentName">
          {isEditing ? 
            <input onChange={e => setName(e.target.value)} value={name} className="group-cardContentNameInput" /> : 
            <a href={`/posts/${group.id}`}><span>{name}</span></a> }
        </div>
        
        <div className="group-cardContentCreator">
          <span>{group.creator.firstName + ' ' + group.creator.lastName}</span>
        </div>

        <div className="group-cardContentDescription">
          {isEditing ? 
            <input onChange={e => setDescription(e.target.value)} value={description} className="group-cardContentNameInput" /> : 
            <span>{descriptionInfo}</span> }
        </div>
        
      </div>
    </div>
  );
};

export default GroupCard;
