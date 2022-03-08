import React, { useEffect, useContext } from "react";
import HeaderGroups from "../../components/header-groups/HeaderGroups";
import GroupsGrid from "../../components/groups-grid/GroupsGrid";
import Api from "../../api/Api";
import { GroupsContext } from "../../context/GroupsContext";
// import { getConfig } from "../../constants";

const GroupsPage = () => {
  const { setGroups, setUser } = useContext(GroupsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getConfig = {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
            "Accept": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
          }
        };
        const user = await Api.get("/User/user-info", getConfig);
        setUser(user);
        const response = await Api.get(`/Group/?userId=${user.data.id}`, getConfig);
        setGroups(response.data);
      } catch(err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <HeaderGroups displayAdd={true} profile={false} title="Dashboard" />
      <GroupsGrid />
    </>
  );
};

export default GroupsPage;
