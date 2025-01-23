import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubjectRatings from "./crudApp";
import AdminPage from "./AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubjectRatings />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
