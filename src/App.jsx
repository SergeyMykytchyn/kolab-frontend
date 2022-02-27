import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import SignInPage from "./routes/SignInPage";
import SignUpPage from "./routes/SignUpPage";

const App = () => {
  return (
    <div className="container">
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
