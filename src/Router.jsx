import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import LandingPage from "./containers/landing-page/LandingPage";
import SignInPage from "./containers/sign-in-page/SignInPage";
import SignUpPage from "./containers/sign-up-page/SignUpPage";
import GroupsPage from "./containers/groups-page/GroupsPage";
import PostsPage from "./containers/posts-page/PostsPage";
import ProfilePage from "./containers/profile-page/ProfilePage";
import { UserContext } from "./context/UserContext";
import Api from "./api/Api";

const Router = () => {
  const { token } = useContext(UserContext);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getConfig = {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        };
        await Api.get("/User/user-info", getConfig);
        setIsTokenValid(true);
        setIsFetching(false);
      } catch(err) {
        setIsTokenValid(false);
        setIsFetching(false);
        console.error(err);
      }
    }

    fetchData();
  }, [token]);

  return (
    <BrowserRouter>
      { !isFetching ?
        <Routes>
          <Route exact path="/" element={isTokenValid ? <Navigate to="/groups" /> : <LandingPage />} />
          <Route exact path="/sign-in" element={isTokenValid ? <Navigate to="/groups" /> : <SignInPage />} />
          <Route exact path="/sign-up" element={isTokenValid ? <Navigate to="/groups" /> : <SignUpPage />} />
          <Route exact path="/groups" element={!isTokenValid ? <Navigate to="/" /> : <GroupsPage />} />
          <Route exact path="/posts/:groupId" element={!isTokenValid ? <Navigate to="/" /> : <PostsPage />} />
          <Route exact path="/profile" element={!isTokenValid ? <Navigate to="/" /> : <ProfilePage />} />
          <Route path="*" element={<Navigate to ="/" />} />
        </Routes> : null }
    </BrowserRouter>
  );
};

export default Router;
