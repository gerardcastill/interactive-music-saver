import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage.js";
import AboutMePage from "./pages/AboutMePage";
import SearchBoardPage from "./pages/SearchBoardPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/about' element={<AboutMePage/>} />
        <Route path='/searchboard' element={<SearchBoardPage/>} />
        <Route path='/favorites' element={<FavoritesPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
