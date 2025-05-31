import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import Reports from './pages/Reports';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTeam from './pages/AddTeam'
import './App.css'
const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/add-team" element={<AddTeam />} />

    </Routes>
  </Router>
);

export default App;
