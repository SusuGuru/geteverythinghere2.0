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

  // Hide navbar ONLY on landing page
  const shouldHideNavbar = location.pathname === "/";

  return (
    <div className="App">
      {/* Show Navbar everywhere except Landing Page */}
      {!shouldHideNavbar && <Navbar />}

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
