import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { allProducts } from "../data/products";
import "../stylesheet/store.css";

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "iPhones", "Laptops", "Accessories", "Consoles", "TVs"];

  // Simulate API call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(allProducts);
      setLoading(false);
    }, 1500);
  }, []);

  // Filtered products based on category
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Handle category switching + body class
  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      document.body.classList.add("all-active");
    } else {
      document.body.classList.remove("all-active");
    }
  };

  // Generate placeholder cards
  const placeholders = Array.from({ length: 8 }).map((_, i) => (
    <div key={i} className="product-card placeholder">
      <div className="image-container placeholder-box">Loading...</div>
      <div className="product-info">
        <h3 className="product-name">Loading...</h3>
        <div className="status">
          <span className="dot grey"></span>
          <span className="status-text grey-text">Loading...</span>
        </div>
        <p className="price price-grey">Loading...</p>
      </div>
    </div>
  ));

  return (
    <div className="store-page">
      {/* Category Tabs */}
      <div className="tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="product-grid">
        {loading
          ? placeholders
          : filteredProducts.map((p, i) => (
              <Link
                to={`/product/${p.name.replace(/\s+/g, "-").toLowerCase()}`}
                key={i}
                className="product-card"
              >
                <div className="image-container">
                  {p.img ? (
                    <img src={p.img} alt={p.name} />
                  ) : (
                    <div className="placeholder-box">Image Coming Soon</div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{p.name}</h3>
                  <div className="status">
                    <span
                      className={`dot ${p.available ? "green" : "red"}`}
                    ></span>
                    <span
                      className={`status-text ${
                        p.available ? "green-text" : "grey-text"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p
                    className={`price ${
                      p.available ? "price-green" : "price-grey"
                    }`}
                  >
                    {p.price}
                  </p>
                </div>
              </Link>
            ))}
      </div>

      {/* Footer */}
      <footer className="store-footer">
        <p>© 2025 GetEverythingHere. All rights reserved.</p>
        <div className="footer-right">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
