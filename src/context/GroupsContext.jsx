import React, { useState, createContext } from "react";

export const GroupsContext = createContext();

export const GroupsContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [groups, setGroups] = useState([]);

  const addGroup = (group) => {
    setGroups([...groups, group]);
  };

  const removeGroup = (group) => {
    setGroups([...groups.filter(item => item.id !== group.id)]);
  };

  const createGroup = (newGroup, oldGroup) => {
    groups.push(newGroup);
    setGroups([...groups.filter(item => item.id !== oldGroup.id)]);
  };

  return (
    <GroupsContext.Provider value={{ groups, setGroups, addGroup, removeGroup, createGroup, user, setUser }}>
      { props.children }
    </GroupsContext.Provider>
  );
};
