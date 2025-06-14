// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UploadResume } from "./Components/UploadResume";
import { ResumeSummary } from "./Components/ResumeSummary";
import { SearchByTags } from "./Components/SearchByTags";
import { ResumeDashboard } from "./Components/Dashboard";
import { Navbar } from "./Components/Navbar"; // Import the new navbar

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "24px" }}>
        <Routes>
          <Route path="/" element={<UploadResume />} />
          <Route path="/summary" element={<ResumeSummary />} />
          <Route path="/dashboard" element={<ResumeDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
