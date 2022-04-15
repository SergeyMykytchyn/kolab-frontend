import React, { useState, createContext } from "react";

export const GroupsContext = createContext();

export const GroupsContextProvider = (props) => {
  const [groups, setGroups] = useState([]);
  const [groupIsCreating, setGroupIsCreating] = useState(false);

  const addGroup = (group) => {
    setGroups([...groups, group].sort((a, b) => a.id - b.id));
  };

  const removeGroup = (group) => {
    setGroups([...groups.filter(item => item.id !== group.id)]);
  };

  const createGroup = (newGroup, oldGroup) => {
    groups.push(newGroup);
    setGroups([...groups.filter(item => item.id !== oldGroup.id)]);
  };

  return (
    <GroupsContext.Provider
      value={{
        groups,
        setGroups,
        addGroup,
        removeGroup,
        createGroup,
        groupIsCreating,
        setGroupIsCreating
      }}>
      { props.children }
    </GroupsContext.Provider>
  );
};
