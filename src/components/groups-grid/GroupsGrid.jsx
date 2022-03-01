import React from "react";
import "./GroupsGrid.css";
import GroupCard from "../group-card/GroupCard";

const GroupsGrid = ({ groups }) => {
  return (
    <div className="groups-grid-container">
      {/* go containers to second line if they do not fit */}
      {groups.map(group => <GroupCard key={group.id} group={group} />)}
    </div>
  );
};

export default GroupsGrid;
