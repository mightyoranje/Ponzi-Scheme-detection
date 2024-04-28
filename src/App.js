import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import Login from './Login';
import Success from './Success';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/success" element={<Success />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
