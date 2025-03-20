import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShortenURL from "./components/ShortenURL";
import AccessShortURL from "./components/AccessShortURL";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<ShortenURL />} />
          <Route path="/access/:shortCode" element={<AccessShortURL />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
