import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Functions from './pages/Functions';
import Keys from './pages/Keys';
import Graph from './pages/Graph';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>            
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/functions" element={<Functions />} />
          <Route path="/keys" element={<Keys />} />
          <Route path="/graph" element={<Graph />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;