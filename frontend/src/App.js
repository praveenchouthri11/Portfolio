import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DesignTemplate from "./components/DesignTemplate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DesignTemplate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;