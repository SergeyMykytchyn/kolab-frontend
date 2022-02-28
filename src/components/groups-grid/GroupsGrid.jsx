import React, { useState, useEffect } from "react";
import "./GroupsGrid.css";
import Api from "../../api/Api";
import GroupCard from "../group-card/GroupCard";

const GroupsGrid = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getConfig = {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
            "Accept": "application/json"
          }
        };
        const user = await Api.get("/User/user-info", getConfig);
        const response = await Api.get(`/Group/?userId=${user.data.id}`, getConfig);
        console.log(response.data);
        setGroups(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="groups-grid-container">
      {/* go containers to second line if they do not fit */}
      {groups.map(group => <GroupCard key={group.id} group={group} />)}
    </div>
  );
};

export default GroupsGrid;
