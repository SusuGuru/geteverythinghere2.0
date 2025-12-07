import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import StorePage from "./pages/StorePage";
import ProductDetail from "./pages/ProductDetail";

import './stylesheet/navbar.css';
import './stylesheet/landing.css';
import './stylesheet/store.css';
import './stylesheet/details.css';

function AppContent() {
  const location = useLocation();

  // Show Navbar ONLY on the Store page
  const shouldShowNavbar = location.pathname === "/store";

  return (
    <div className="App">
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/products/:id" element={<ProductDetail />} /> {/* matches StorePage links */}
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
