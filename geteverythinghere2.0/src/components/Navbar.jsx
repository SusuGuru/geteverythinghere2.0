import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../stylesheet/navbar.css";

export default function Navbar() {
  const location = useLocation();

  const handleScroll = (id) => (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href =
        "https://wa.me/233547149360?text=Hello!%20I%20would%20like%20to%20inquire.";
    } else {
      window.location.href = "mailto:sbrayka19@gmail.com";
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="nav-logo">
          <Link to="/">GetEverythingHere</Link>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#services" onClick={handleScroll("services")}>Services</a>
          <a href="#about" onClick={handleScroll("about")}>About</a>
          <a href="#contact" onClick={handleContactClick}>Contact</a>
        </nav>
      </div>
    </header>
  );
}
