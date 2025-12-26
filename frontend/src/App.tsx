import { useState } from 'react';
import AuctionPage from './pages/AuctionPage';
import RedeemPage from './pages/RedeemPage';
import BountiesPage from './pages/BountiesPage';
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('auction');

  const renderPage = () => {
    switch (currentPage) {
      case 'auction':
        return <AuctionPage currentPage={currentPage} onPageChange={setCurrentPage} />;
      case 'bounties':
        return <BountiesPage currentPage={currentPage} onPageChange={setCurrentPage} />;
      case 'redeem':
        return <RedeemPage currentPage={currentPage} onPageChange={setCurrentPage} />;
      default:
        return <AuctionPage currentPage={currentPage} onPageChange={setCurrentPage} />;
    }
  };

  return renderPage();
}

export default App
