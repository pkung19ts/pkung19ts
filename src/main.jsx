import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import BusinessDetails from './BusinessDetails';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/business/:id" element={<BusinessDetails />} /> {}
    </Routes>
  </Router>,
  document.getElementById('root')
);
