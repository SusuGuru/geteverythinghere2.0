import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import StorePage from "./pages/StorePage";
import ProductDetailsPage from "./pages/ProductDetail";

import './stylesheet/navbar.css';
import './stylesheet/landing.css';
import './stylesheet/store.css';
import './stylesheet/details.css';

// Wrapper to conditionally render Navbar
function AppContent() {
  const location = useLocation();

  // Show Navbar ONLY on the Store page
  const shouldShowNavbar = location.pathname === "/store";

  return (
    <div className="App">
      {shouldShowNavbar && <Navbar />} {/* Navbar only on Store page */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/product/:productName" element={<ProductDetailsPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
