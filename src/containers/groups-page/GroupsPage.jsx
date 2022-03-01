import React, { useState, useEffect, useContext } from "react";
import HeaderGroups from "../../components/header-groups/HeaderGroups";
import GroupsGrid from "../../components/groups-grid/GroupsGrid";
import Api from "../../api/Api";
import { getConfig } from "../../constants";
import { GroupsContext } from "../../context/GroupsContext"

const GroupsPage = () => {
  const { setGroups, setUser } = useContext(GroupsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    <>
      <HeaderGroups />
      <GroupsGrid />
    </>
  );
};

export default GroupsPage;
