import React, { useState, useEffect } from "react";
import HeaderGroups from "../../components/header-groups/HeaderGroups";
import GroupsGrid from "../../components/groups-grid/GroupsGrid";
import Api from "../../api/Api";

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState({});

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
        setUser(user);
        const response = await Api.get(`/Group/?userId=${user.data.id}`, getConfig);
        setGroups(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <HeaderGroups user={user} />
      <GroupsGrid groups={groups} />
    </div>
  );
};

export default GroupsPage;
