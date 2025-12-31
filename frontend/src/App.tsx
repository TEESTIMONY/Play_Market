import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuctionPage from './pages/AuctionPage';
import RedeemPage from './pages/RedeemPage';
import BountiesPage from './pages/BountiesPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuctionPage />} />
        <Route path="/bounties" element={<BountiesPage />} />
        <Route path="/redeem" element={<RedeemPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin/super-secret-key" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App
