import React from "react";
import "./index.css"
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Check from "./components/Check";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </Router>
  );
};

export default App;
