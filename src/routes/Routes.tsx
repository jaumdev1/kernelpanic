
import React from "react";
import {HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";

import Article from "../pages/Home/Article";




const RoutesFC: React.FC = () => {
  return (
    <Router>   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
   
      
  </Router>
  );
};

export default RoutesFC;