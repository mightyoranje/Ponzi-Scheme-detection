
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Success from './Success';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/success" element={<Success />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
