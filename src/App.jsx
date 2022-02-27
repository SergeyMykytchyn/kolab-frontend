import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./routes/landing-page/LandingPage";
import SignInPage from "./routes/sign-in-page/SignInPage";
import SignUpPage from "./routes/sign-up-page/SignUpPage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/sign-in" element={<SignInPage />} />
          <Route exact path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
