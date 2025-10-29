import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import StorePage from "./pages/StorePage";
import ProductDetailsPage from "./pages/ProductDetail";
import "./styles.css";

// Wrapper to conditionally render Navbar
function AppContent() {
  const location = useLocation();
  const hideNavbarOn = ["/product"]; // All routes starting with /product

  // Check if current path starts with any of the listed routes
  const shouldHideNavbar = hideNavbarOn.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="App">
      {/* Show Navbar only if not on Product Details Page */}
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
