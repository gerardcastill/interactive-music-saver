import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage.js";
import AboutPage from "./pages/AboutPage";
import SearchBoardPage from "./pages/SearchBoardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/searchboard' element={<SearchBoardPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
