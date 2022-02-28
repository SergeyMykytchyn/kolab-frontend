import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./routes/landing-page/LandingPage";
import SignInPage from "./routes/sign-in-page/SignInPage";
import SignUpPage from "./routes/sign-up-page/SignUpPage";
import GroupsPage from "./routes/groups-page/GroupsPage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/sign-in" element={<SignInPage />} />
          <Route exact path="/sign-up" element={<SignUpPage />} />
          <Route exact path="/groups" element={<GroupsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
