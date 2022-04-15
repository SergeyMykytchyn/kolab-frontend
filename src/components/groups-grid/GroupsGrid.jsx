import React, { useContext } from "react";
import "./GroupsGrid.css";
import GroupCard from "../group-card/GroupCard";
import { GroupsContext } from "../../context/GroupsContext"

const GroupsGrid = () => {
  const { groups } = useContext(GroupsContext);

  return (
    <div className="groups-grid-container">
      {groups.map((group) => {
            return <GroupCard key={group.id} group={group} />
      })}
    </div>
  );
};

export default GroupsGrid;
