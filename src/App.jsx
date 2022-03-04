import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./containers/landing-page/LandingPage";
import SignInPage from "./containers/sign-in-page/SignInPage";
import SignUpPage from "./containers/sign-up-page/SignUpPage";
import GroupsPage from "./containers/groups-page/GroupsPage";
import PostsPage from "./containers/posts-page/PostsPage";
import { GroupsContextProvider } from "./context/GroupsContext";
import { PostsContextProvider } from "./context/PostsContext";

const App = () => {
  return (
    <GroupsContextProvider>
      <PostsContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/sign-in" element={<SignInPage />} />
            <Route exact path="/sign-up" element={<SignUpPage />} />
            <Route exact path="/groups" element={<GroupsPage />} />
            <Route exact path="/posts/:groupId" element={<PostsPage />} />
          </Routes>
        </Router>
      </PostsContextProvider>
    </GroupsContextProvider>
  );
};

export default App;
