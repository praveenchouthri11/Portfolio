import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnhancedPortfolio from "./components/EnhancedPortfolio";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnhancedPortfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;