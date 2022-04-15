import React from "react";
import { UserContextProvider } from "./context/UserContext";
import { GroupsContextProvider } from "./context/GroupsContext";
import { PostsContextProvider } from "./context/PostsContext";
import Router from "./Router";

const App = () => {
  return (
    <UserContextProvider>
      <GroupsContextProvider>
        <PostsContextProvider>
          <Router />
        </PostsContextProvider>
      </GroupsContextProvider>
    </UserContextProvider>
  );
};

export default App;
